import axios from "@/utilities/axios";
import envConfig from "../config/env.config";
import {
  HomeVideo,
  SuccessResponse,
  UserVideo,
  Video,
  WatchVideo,
} from "@/types/types";

const VIDEO_SERVICE_API_URL = envConfig.VITE_VIDEO_SERVICE_API_URL;

async function getHomeVideos(): Promise<SuccessResponse<HomeVideo[]>> {
  const response = await axios.get(`${VIDEO_SERVICE_API_URL}`);
  console.log(response);
  return response.data;
}

async function getUserVideos(
  userId: string,
): Promise<SuccessResponse<UserVideo[]>> {
  const response = await axios.get(`${VIDEO_SERVICE_API_URL}/user/${userId}`);
  console.log(response);
  return response.data;
}

async function getProfileVideos(): Promise<SuccessResponse<Video[]>> {
  const response = await axios.get(`${VIDEO_SERVICE_API_URL}/profile`);
  console.log(response);
  return response.data;
}

async function watchVideo(
  videoId: string,
): Promise<SuccessResponse<WatchVideo>> {
  const response = await axios.get(`${VIDEO_SERVICE_API_URL}/${videoId}`);
  console.log(response);
  return response.data;
}

export default { watchVideo, getHomeVideos, getUserVideos, getProfileVideos };
