import fs from 'fs';

import isDownloadComplete from '../utilities/isDownloadComplete';
import getObjectInRange from '../utilities/getObjectInRange';
import getRangeAndLength from '../utilities/getRangeAndLength';

export default async function downloadInChunks(
	bucket: string,
	videoName: string,
	filePath: string
) {
	const writeStream = fs.createWriteStream(filePath);

	const MB = 1024 * 1024;
	const chunk = 5 * MB;

	const rangeAndLength = { start: -1, end: -1, length: -1 };

	while (!isDownloadComplete(rangeAndLength.end, rangeAndLength.length)) {
		console.log('writing...');

		const { end } = rangeAndLength;
		const nextRange = { start: end + 1, end: end + chunk };

		console.log(`Downloading bytes ${nextRange.start} to ${nextRange.end}`);

		const { ContentRange, Body } = await getObjectInRange({
			bucket,
			key: videoName,
			start: nextRange.start,
			end: nextRange.end,
		});

		writeStream.write(await Body?.transformToByteArray());

		const {
			start: newStart,
			end: newEnd,
			length: newLength,
		} = getRangeAndLength(ContentRange as string);

		rangeAndLength.start = newStart;
		rangeAndLength.end = newEnd;
		rangeAndLength.length = newLength;
	}
}
