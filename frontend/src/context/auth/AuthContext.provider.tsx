import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import AuthContext from "./AuthContext";

import useRegister from "@/hooks/useRegister";
import useLogin from "@/hooks/useLogin";
import useLogout from "@/hooks/useLogout";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect } from "react";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    action: register,
    data: registerData,
    error: registerError,
    isLoading: isRegisterLoading,
    isError: isRegisterError,
  } = useRegister();
  const {
    action: login,
    data: loginData,
    error: loginError,
    isLoading: isLoginLoading,
    isError: isLoginError,
  } = useLogin();
  const {
    action: logout,
    data: logoutData,
    error: logoutError,
    isLoading: isLogoutLoading,
    isError: isLogoutError,
  } = useLogout();
  const { action: refreshToken } = useRefreshToken();

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  const queryClient = useQueryClient();
  const authStatus = queryClient.getQueryData<string>(["auth"]);

  console.log({ authStatus });

  axios.defaults.headers.common.Authorization = `Bearer ${authStatus}`;

  return (
    <AuthContext.Provider
      value={{
        register: {
          action: register,
          data: registerData,
          error: registerError,
          isLoading: isRegisterLoading,
          isError: isRegisterError,
        },
        login: {
          action: login,
          data: loginData,
          error: loginError,
          isLoading: isLoginLoading,
          isError: isLoginError,
        },
        logout: {
          action: logout,
          data: logoutData,
          error: logoutError,
          isLoading: isLogoutLoading,
          isError: isLogoutError,
        },
        isLoggedIn: !!authStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
