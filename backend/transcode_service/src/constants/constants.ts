export const VARIANTS = [
	{
		width: 1920,
		height: 1080,
		videoBitrate: '5000k',
		audioBitrate: '192k',
		name: '1080p',
	},
	{
		width: 1280,
		height: 720,
		videoBitrate: '2500k',
		audioBitrate: '128k',
		name: '720p',
	},
	{
		width: 854,
		height: 480,
		videoBitrate: '1200k',
		audioBitrate: '96k',
		name: '480p',
	},
	{
		width: 640,
		height: 360,
		videoBitrate: '800k',
		audioBitrate: '96k',
		name: '360p',
	},
	{
		width: 426,
		height: 240,
		videoBitrate: '400k',
		audioBitrate: '64k',
		name: '240p',
	},
];

export const KB = 1024;
export const MB = 1024 * KB;
export const CHUNK_SIZE = 5 * MB;
