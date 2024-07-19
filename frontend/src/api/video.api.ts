import axios from "axios";

import envConfig from "../config/env.config";
import { VideoWithUser } from "@/types/types";

import { generateVideos } from "@/data/videos";

const VIDEO_SERVICE_API_URL = envConfig.VITE_VIDEO_SERVICE_API_URL;

async function getHomeVideos(): Promise<VideoWithUser[]> {
  // const response = await axios.get(`${VIDEO_SERVICE_API_URL}/videos`);
  // console.log(response);
  // return response.data;
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 1000)),
  );

  return generateVideos(20);
}

async function watchVideo(
  videoId: string,
): Promise<{ url: string; token: string; videoName: string }> {
  const response = await axios.get(`${VIDEO_SERVICE_API_URL}/video/${videoId}`);
  console.log(response);
  return response.data;
}

export default { watchVideo, getHomeVideos };
