import axios from "@/utilities/axios";
import envConfig from "../config/env.config";
import {
  HomeVideo,
  SuccessResponse,
  Video,
  VideoStatus,
  WatchVideo,
} from "@/types/types";

import { generateVideos } from "@/data/videos";

const VIDEO_SERVICE_API_URL = envConfig.VITE_VIDEO_SERVICE_API_URL;

async function getHomeVideos(): Promise<SuccessResponse<HomeVideo[]>> {
  const response = await axios.get(`${VIDEO_SERVICE_API_URL}/videos`);
  console.log(response);
  return response.data;
}

async function getUserVideos(
  userId: string,
): Promise<(Video & { status: VideoStatus })[]> {
  // const response = await axios.get(`${VIDEO_SERVICE_API_URL}/videos`);
  // console.log(response);
  // return response.data;
  console.log(userId);
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 1000)),
  );

  return generateVideos(20, false);
}

async function watchVideo(
  videoId: string,
): Promise<SuccessResponse<WatchVideo>> {
  const response = await axios.get(`${VIDEO_SERVICE_API_URL}/${videoId}`);
  console.log(response);
  return response.data;
}

export default { watchVideo, getHomeVideos, getUserVideos };
