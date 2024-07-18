export default function createFormData(
  data: InitializeFormData | UploadFormData,
) {
  const formData = new FormData();

  if (data.type === "initialize") {
    const { title, duration, userId, totalParts, extension, thumbnail } = data;
    formData.append("title", title);
    formData.append("duration", duration.toString());
    formData.append("userId", userId);
    formData.append("totalParts", totalParts.toString());
    formData.append("extension", extension);
    formData.append("thumbnail", thumbnail);
  } else if (data.type === "upload") {
    const { videoId, uploadId, partNumber, file } = data;
    formData.append("videoId", videoId);
    formData.append("uploadId", uploadId);
    formData.append("partNumber", partNumber.toString());
    formData.append("video", file);
  }

  return formData;
}

type InitializeFormData = {
  type: "initialize";
  title: string;
  duration: number;
  userId: string;
  totalParts: number;
  extension: string;
  thumbnail: File;
};

type UploadFormData = {
  type: "upload";
  videoId: string;
  uploadId: string;
  partNumber: number;
  file: Blob;
};
