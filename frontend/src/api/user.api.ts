import envConfig from "@/config/env.config";
import { User } from "@/types/types";
import axios from "@/utilities/axios";

const USER_SERVICE_API_URL = envConfig.VITE_USER_SERVICE_API_URL;

async function getProfile(userId: string): Promise<User> {
  const response = await axios.get(`${USER_SERVICE_API_URL}/${userId}`);
  console.log(response);
  return response.data.data;
}

export default { getProfile };
