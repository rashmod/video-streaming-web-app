import asyncFs from 'fs/promises';
import path from 'path';

import {
	AWS_S3_TRANSCODED_VIDEO_PREFIX,
	DOWNLOAD_DIRECTORY,
	TRANSCODE_DIRECTORY,
} from '../constants/constants';
import { Resolution } from '../types/types';

export default class FileService {
	static async getFilesPath(base: string, ...directoryPaths: string[]) {
		const directoryPath = path.join(base, ...directoryPaths);
		const files = await this.getFilesInDirectory(directoryPath);
		return files.map((file) => ({
			path: file,
			fileKey: this.getS3FileName({
				fileName: path.relative(base, file),
				type: 'transcoded',
				media: 'video',
			}),
		}));
	}

	static async generateDownloadFilePath(videoName: string) {
		const fileDir = DOWNLOAD_DIRECTORY;
		await this.ensureDirectoryExists(fileDir);

		return path.join(fileDir, videoName);
	}

	static async generateTranscodeFilePath({
		variant,
		videoName,
	}: {
		videoName: string;
		variant: string;
	}) {
		const fileName = `${videoName}_${variant}.m3u8`;

		const fileDir = path.join(TRANSCODE_DIRECTORY, videoName, variant);
		await this.ensureDirectoryExists(fileDir);

		return { path: path.join(fileDir, fileName), fileName };
	}

	static async generateMasterPlaylist(
		videoName: string,
		variants: Resolution[]
	) {
		let masterPlaylistContent = '#EXTM3U\n#EXT-X-VERSION:3\n';

		variants.forEach((variant) => {
			const bandwidth = variant.videoBitrate.replace('k', '000');
			const resolution = `${variant.width}x${variant.height}`;
			const playlistPath = path.join(
				variant.name,
				`${videoName}_${variant.name}.m3u8`
			);

			masterPlaylistContent += `#EXT-X-STREAM-INF:BANDWIDTH=${bandwidth},RESOLUTION=${resolution}\n`;
			masterPlaylistContent += `${playlistPath}\n`;
		});

		const masterPlaylistPath = path.join(
			TRANSCODE_DIRECTORY,
			videoName,
			`${videoName}.m3u8`
		);

		await asyncFs.writeFile(masterPlaylistPath, masterPlaylistContent);
	}

	static getTranscodedVideoDirectory(videoName: string) {
		return path.join(TRANSCODE_DIRECTORY, videoName);
	}

	static async deleteFile(filePath: string) {
		await asyncFs.unlink(filePath);
	}

	static async deleteDirectory(directoryPath: string) {
		await asyncFs.rm(directoryPath, { recursive: true, force: true });
	}

	static getS3FileName(data: BaseName | TranscodedName) {
		const fileName = this.toLinuxPath(data.fileName);

		switch (data.type) {
			case 'base':
				return path.basename(fileName);

			case 'transcoded': {
				const joined = path.join(
					AWS_S3_TRANSCODED_VIDEO_PREFIX,
					data.fileName
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

	private static async getFilesInDirectory(directoryPath: string) {
		const results: string[] = [];

		const files = await asyncFs.readdir(directoryPath);

		for (const file of files) {
			const filePath = path.join(directoryPath, file);
			const stat = await asyncFs.stat(filePath);

			if (stat.isDirectory()) {
				const nestedFiles = await this.getFilesInDirectory(filePath);
				results.push(...nestedFiles);
			} else {
				results.push(filePath);
			}
		}

		return results;
	}

	private static async ensureDirectoryExists(directoryPath: string) {
		console.log('ensuring directory exists', directoryPath);
		await asyncFs.mkdir(directoryPath, { recursive: true });
		console.log('directory exists');
	}
}

type BaseName = { fileName: string; type: 'base' };
type TranscodedName = {
	fileName: string;
	type: 'transcoded';
	media: 'video';
};
