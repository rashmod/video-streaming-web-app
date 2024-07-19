import { useMutation } from "react-query";

import { uploadApi } from "@/api/";

import getFileExtension from "@/utilities/getFileExtension";
import chunkFile from "@/utilities/chunkFile";
import createFormData from "@/utilities/createFormData";

import { CHUNK_SIZE, USER_ID } from "@/constants/constants";
import UploadForm, { type Schema } from "@/components/custom/UploadForm";

export default function Upload() {
  const { mutateAsync: initializeUpload } = useMutation({
    mutationFn: uploadApi.initializeUpload,
  });

  const { mutateAsync: uploadVideo } = useMutation({
    mutationFn: uploadApi.uploadVideo,
  });

  const { mutateAsync: completeUpload } = useMutation({
    mutationFn: uploadApi.completeUpload,
  });

  async function handleUpload(formData: Schema) {
    const video = formData.video.file;
    const chunks = chunkFile(video, CHUNK_SIZE);

    const resolution = {
      height: formData.video.height,
      width: formData.video.width,
    };

    const initializeFormData = createFormData({
      type: "initialize",
      userId: USER_ID,
      duration: formData.video.duration,
      extension: getFileExtension(video.name),
      thumbnail: formData.thumbnail.file,
      title: formData.title,
      totalParts: chunks.length,
    });

    const initResponse = await initializeUpload(initializeFormData);

    const {
      video: { id: videoId },
      uploadProgress: { uploadId },
    } = initResponse;

    const uploadRequest = chunks.map((chunk, i) => {
      const uploadFormData = createFormData({
        type: "upload",
        file: chunk,
        partNumber: i + 1,
        uploadId,
        videoId,
      });

      return uploadVideo(uploadFormData);
    });

    const uploadResponse = await Promise.all(uploadRequest);

    console.log(uploadResponse);

    await completeUpload({
      resolution,
      uploadId,
      videoId,
      parts: uploadResponse.map((res, i) => ({
        ETag: res,
        PartNumber: i + 1,
      })),
    });
  }

  return (
    <>
      <UploadForm handleUpload={handleUpload} />
    </>
  );
}
