export default function formatViews(views: number) {
	if (views >= 1_000_000) {
		const millions = views / 1_000_000;
		return millions > 10
			? `${millions.toFixed(0)}M`
			: `${millions.toFixed(1)}M`;
	} else if (views >= 1_000) {
		const thousands = views / 1_000;
		return thousands > 100
			? `${thousands.toFixed(0)}K`
			: `${thousands.toFixed(1)}K`;
	} else {
		return views.toString();
	}
}
