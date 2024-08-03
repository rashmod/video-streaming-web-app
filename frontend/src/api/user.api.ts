import axios from "axios";

import envConfig from "@/config/env.config";
import { User } from "@/types/types";

const USER_SERVICE_API_URL = envConfig.VITE_USER_SERVICE_API_URL;

async function getProfile(userId: string): Promise<User> {
  console.log(axios.defaults.headers.common.Authorization);
  const response = await axios.get(`${USER_SERVICE_API_URL}/${userId}`);
  console.log(response);
  return response.data.data;
}

export default { getProfile };
