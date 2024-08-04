import React, { createContext } from "react";
import { UseMutateFunction } from "@tanstack/react-query";

import { LoginResponse, SuccessResponse } from "@/types/types";
import { LoginRequest, RegisterRequest } from "@/api/auth.api";

type MutationContext<T, U> = {
  action: UseMutateFunction<T, Error, U, unknown>;
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};

type AuthContext = {
  register: MutationContext<SuccessResponse<LoginResponse>, RegisterRequest>;
  login: MutationContext<SuccessResponse<LoginResponse>, LoginRequest>;
  logout: MutationContext<SuccessResponse<null>, void>;
  token: {
    isLoggedIn: boolean;
    isLoading: boolean;
    setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>;
  };
};

const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;
