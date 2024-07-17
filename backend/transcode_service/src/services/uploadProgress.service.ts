import UploadProgressRepository from '../repositories/uploadProgress.repository';

export default class UploadProgressService {
	static async findById(id: string) {
		const uploadProgress = await UploadProgressRepository.findById(id);
		if (!uploadProgress) {
			throw new Error('Upload progress not found');
		}

		return uploadProgress;
	}
}
