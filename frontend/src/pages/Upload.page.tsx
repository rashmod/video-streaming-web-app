import { useMutation } from "react-query";

import upload from "../api/upload";

import getFileExtension from "../utilities/getFileExtension";
import chunkFile from "../utilities/chunkFile";
import createUploadFormData from "../utilities/createUploadFormData";

import { CHUNK_SIZE } from "@/constants/constants";
import UploadForm, { type Schema } from "@/components/custom/UploadForm";

export default function Upload() {
  const { mutateAsync: initializeUpload } = useMutation({
    mutationFn: upload.initializeUpload,
  });

  const { mutateAsync: uploadVideo } = useMutation({
    mutationFn: upload.uploadVideo,
  });

  const { mutateAsync: completeUpload } = useMutation({
    mutationFn: upload.completeUpload,
  });

  async function handleUpload(formData: Schema) {
    const video = formData.video.file;
    const thumbnail = formData.thumbnail.file;
    const title = formData.title;

    const extension = getFileExtension(video.name);
    const initResponse = await initializeUpload({
      title,
      thumbnail,
      extension,
    });
    const { uploadId, videoId } = initResponse;

    const chunks = chunkFile(video, CHUNK_SIZE);
    const uploadRequest = chunks.map((chunk, i) =>
      uploadVideo(
        createUploadFormData({
          file: chunk,
          partNumber: i + 1,
          uploadId,
          videoId,
        }),
      ),
    );

    const uploadResponse = await Promise.all(uploadRequest);

    await completeUpload({
      uploadId,
      videoId,
      parts: uploadResponse.map((res, i) => ({
        ETag: res.eTag,
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
