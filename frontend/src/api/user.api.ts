import axios from "axios";

import envConfig from "@/config/env.config";
import { generateVideos } from "@/data/videos";
import { User } from "@/types/types";

const USER_SERVICE_API_URL = envConfig.VITE_UPLOAD_SERVICE_API_URL;

async function register(data: {
  username: string;
  email: string;
  password: string;
}): Promise<{ message: string }> {
  const response = await axios.post(`${USER_SERVICE_API_URL}/register`, data);
  console.log(response);
  return response.data.data;
}

async function login(data: {
  email: string;
  password: string;
}): Promise<{ message: string }> {
  const response = await axios.post(`${USER_SERVICE_API_URL}/login`, data);
  console.log(response);
  return response.data.data;
}

async function logout(): Promise<{ message: string }> {
  const response = await axios.get(`${USER_SERVICE_API_URL}/logout`);
  console.log(response);
  return response.data.data;
}

async function getProfile(userId: string): Promise<User> {
  // const response = await axios.get(`${USER_SERVICE_API_URL}/profile`);
  // console.log(response);
  // return response.data.data;
  console.log(userId);

  await new Promise((resolve) =>
    setTimeout(resolve, Math.floor(Math.random() * 1000)),
  );

  return generateVideos(1)[0].user;
}

export default { register, login, logout, getProfile };
