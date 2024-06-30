import fs from 'fs';
import path from 'path';

import VARIANTS from '../constants/constants';

export default function generateMasterPlaylist(videoName: string) {
	let masterPlaylistContent = '#EXTM3U\n#EXT-X-VERSION:3\n';

	VARIANTS.forEach((variant) => {
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
		'./output',
		videoName,
		`${videoName}.m3u8`
	);

	fs.writeFileSync(masterPlaylistPath, masterPlaylistContent);
}
