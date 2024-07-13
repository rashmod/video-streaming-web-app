import asyncFs from 'fs/promises';
import path from 'path';

import {
	DOWNLOAD_DIRECTORY,
	TRANSCODE_DIRECTORY,
} from '../constants/constants';

export default class FileService {
	static async getFilesPath(directoryPath: string) {
		const files = await this.getFilesInDirectory(directoryPath);
		return files.map((file) => ({
			path: file,
			fileKey: path.relative(directoryPath, file),
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
		const cleanVideoName = this.getCleanVideoName(videoName);
		const fileName = `${cleanVideoName}_${variant}.m3u8`;

		const fileDir = path.join(TRANSCODE_DIRECTORY, cleanVideoName, variant);
		await this.ensureDirectoryExists(fileDir);

		return { path: path.join(fileDir, fileName), fileName };
	}

	static getCleanVideoName(videoName: string) {
		return videoName.replaceAll('.', '_');
	}

	static async generateMasterPlaylist(
		videoName: string,
		variants: {
			width: number;
			height: number;
			videoBitrate: string;
			audioBitrate: string;
			name: string;
		}[]
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
		const cleanVideoName = FileService.getCleanVideoName(videoName);
		return path.join(TRANSCODE_DIRECTORY, cleanVideoName);
	}

	static async deleteFile(filePath: string) {
		await asyncFs.unlink(filePath);
	}

	static async deleteDirectory(directoryPath: string) {
		await asyncFs.rm(directoryPath, { recursive: true, force: true });
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
		await asyncFs.mkdir(directoryPath, { recursive: true });
	}
}
