import { createWriteStream } from 'fs';

import S3Service from './s3.service';
import { CHUNK_SIZE } from '../constants/constants';

export default class DownloadService {
	static async downloadFile({
		destinationPath,
		videoName,
	}: {
		destinationPath: string;
		videoName: string;
	}) {
		const writeStream = createWriteStream(destinationPath);

		const rangeAndLength = { start: -1, end: -1, length: -1 };

		while (
			!this.isDownloadComplete(rangeAndLength.end, rangeAndLength.length)
		) {
			const { start, end, length } = await this.downloadChunk({
				writeStream,
				end: rangeAndLength.end,
				videoName,
			});

			rangeAndLength.start = start;
			rangeAndLength.end = end;
			rangeAndLength.length = length;
		}
	}

	static async downloadChunk({
		end,
		videoName,
		writeStream,
	}: {
		end: number;
		videoName: string;
		writeStream: ReturnType<typeof createWriteStream>;
	}) {
		const range = { start: end + 1, end: end + CHUNK_SIZE };

		const { ContentRange, fileContent } = await S3Service.getObjectInRange({
			fileKey: videoName,
			start: range.start,
			end: range.end,
		});

		writeStream.write(fileContent);

		return S3Service.parseRangeAndLength(ContentRange as string);
	}

	static isDownloadComplete(end: number, length: number) {
		return end === length - 1;
	}
}
