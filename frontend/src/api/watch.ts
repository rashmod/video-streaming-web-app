import axios from "axios";

import envConfig from "../config/env.config";

const WATCH_SERVICE_API_URL = envConfig.VITE_WATCH_SERVICE_API_URL;

async function watchVideo(
  videoId: string,
): Promise<{ url: string; token: string; videoName: string }> {
  const response = await axios.get(`${WATCH_SERVICE_API_URL}/video/${videoId}`);
  console.log(response);
  return response.data;
}

export default { watchVideo };
