import axios from "axios";

import envConfig from "../config/env.config";
import { User, Video } from "@/types/types";

import videos from "@/data/videos";

const VIDEO_SERVICE_API_URL = envConfig.VITE_VIDEO_SERVICE_API_URL;

async function getAllVideos(): Promise<(User & Video)[]> {
  // const response = await axios.get(`${VIDEO_SERVICE_API_URL}/videos`);
  // console.log(response);
  // return response.data;
  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 1000)),
  );

  return videos;
}

async function watchVideo(
  videoId: string,
): Promise<{ url: string; token: string; videoName: string }> {
  const response = await axios.get(`${VIDEO_SERVICE_API_URL}/video/${videoId}`);
  console.log(response);
  return response.data;
}

export default { watchVideo, getAllVideos };
