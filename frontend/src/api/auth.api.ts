import axios from "@/utilities/axios";
import envConfig from "@/config/env.config";
import { LoginResponse, SuccessResponse } from "@/types/types";

const USER_SERVICE_API_URL = envConfig.VITE_USER_SERVICE_API_URL;

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
};

async function register(
  data: RegisterRequest,
): Promise<SuccessResponse<LoginResponse>> {
  const response = await axios.post(`${USER_SERVICE_API_URL}/register`, data);
  console.log(response);
  return response.data;
}

export type LoginRequest = {
  email: string;
  password: string;
};

async function login(
  data: LoginRequest,
): Promise<SuccessResponse<LoginResponse>> {
  const response = await axios.post(`${USER_SERVICE_API_URL}/login`, data, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
}

async function logout(): Promise<SuccessResponse<null>> {
  const response = await axios.get(`${USER_SERVICE_API_URL}/logout`);
  console.log(response);
  return response.data;
}

async function refreshToken(): Promise<SuccessResponse<string>> {
  const response = await axios.post(
    `${USER_SERVICE_API_URL}/refresh_token`,
    {},
    { withCredentials: true },
  );

  return response.data;
}

export default { register, login, logout, refreshToken };
