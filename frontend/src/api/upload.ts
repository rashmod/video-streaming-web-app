import axios from "axios";

import envConfig from "@/config/env.config";
import { InitializeUploadResponse } from "@/types/types";

const UPLOAD_SERVICE_API_URL = envConfig.VITE_UPLOAD_SERVICE_API_URL;

async function initializeUpload(
  initializeData: FormData,
): Promise<InitializeUploadResponse> {
  const response = await axios.post(
    `${UPLOAD_SERVICE_API_URL}/initialize`,
    initializeData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  console.log(response);
  return response.data.data;
}

async function uploadVideo(uploadData: FormData): Promise<string> {
  const response = await axios.post(
    `${UPLOAD_SERVICE_API_URL}/upload`,
    uploadData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  console.log(response);
  return response.data.data;
}

async function completeUpload(data: {
  resolution: { height: number; width: number };
  uploadId: string;
  videoId: string;
  parts: { ETag: string | undefined; PartNumber: number }[];
}): Promise<{ message: string }> {
  const response = await axios.post(`${UPLOAD_SERVICE_API_URL}/complete`, data);
  console.log(response);
  return response.data.data;
}

export default { initializeUpload, uploadVideo, completeUpload };
