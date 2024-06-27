export default function getRangeAndLength(contentRange: string) {
	if (!contentRange) return { start: -1, end: -1, length: -1 };
	const [range, length] = contentRange.split(' ')[1].split('/');
	const [start, end] = range.split('-');
	return {
		start: parseInt(start),
		end: parseInt(end),
		length: parseInt(length),
	};
}
