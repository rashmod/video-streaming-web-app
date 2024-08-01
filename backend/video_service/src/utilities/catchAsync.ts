export default function catchAsync(fn: Function) {
	return (req: any, res: any, next: any) => {
		fn(req, res, next).catch((err: any) => next(err));
	};
}
