import asyncFs from 'fs/promises';
import crypto from 'crypto';
import path from 'path';

import {
	AWS_S3_ORIGINAL_VIDEO_PREFIX,
	AWS_S3_THUMBNAIL_PREFIX,
	AWS_S3_TRANSCODED_VIDEO_PREFIX,
} from '../constants/constants';

export default class FileService {
	static async ensureDirectoryExists(directoryPath: string) {
		await asyncFs.mkdir(directoryPath, { recursive: true });
	}

	static randomName(bytes = 32) {
		return (
			Date.now().toString() + crypto.randomBytes(bytes).toString('hex')
		);
	}

	static getFileName(data: BaseName | OriginalName | TranscodedName) {
		const fileName = this.toLinuxPath(data.fileName);

		switch (data.type) {
			case 'base':
				return path.basename(fileName);

			case 'original': {
				const basename = this.getFileName({
					fileName,
					type: 'base',
				});

				let joined: string;
				if (data.media === 'video') {
					joined = path.join(
						AWS_S3_ORIGINAL_VIDEO_PREFIX,
						this.getOriginalVideoName(basename)
					);
				} else {
					joined = path.join(AWS_S3_THUMBNAIL_PREFIX, basename);
				}

				return this.toLinuxPath(joined);
			}

			case 'transcoded': {
				const basename = this.getFileName({
					fileName,
					type: 'base',
				});
				const joined = path.join(
					AWS_S3_TRANSCODED_VIDEO_PREFIX,
					this.getTranscodedVideoName(basename)
				);

				return this.toLinuxPath(joined);
			}

			default:
				return undefined as never;
		}
	}

	private static toLinuxPath(filePath: string) {
		return filePath.split(path.sep).join('/');
	}

	private static getTranscodedVideoName(videoName: string) {
		return videoName.replaceAll('.', '_');
	}

	private static getOriginalVideoName(videoName: string) {
		return videoName.replaceAll('_', '.');
	}
}

type BaseName = { fileName: string; type: 'base' };
type OriginalName = {
	fileName: string;
	type: 'original';
	media: 'video' | 'image';
};
type TranscodedName = {
	fileName: string;
	type: 'transcoded';
	media: 'video';
};
