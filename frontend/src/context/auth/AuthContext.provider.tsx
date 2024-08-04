import AuthContext from "./AuthContext";

import useRegister from "@/hooks/useRegister";
import useLogin from "@/hooks/useLogin";
import useLogout from "@/hooks/useLogout";
import useRefreshToken from "@/hooks/useRefreshToken";
import { useEffect, useState } from "react";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshingToken, setRefreshingToken] = useState(true);

  const {
    action: register,
    data: registerData,
    error: registerError,
    isLoading: isRegisterLoading,
    isError: isRegisterError,
  } = useRegister(setAccessToken);
  const {
    action: login,
    data: loginData,
    error: loginError,
    isLoading: isLoginLoading,
    isError: isLoginError,
  } = useLogin(setAccessToken);
  const {
    action: logout,
    data: logoutData,
    error: logoutError,
    isLoading: isLogoutLoading,
    isError: isLogoutError,
  } = useLogout(setAccessToken);
  const {
    action: refreshToken,
    data: refreshTokenData,
    isLoading: isRefreshTokenLoading,
  } = useRefreshToken(setAccessToken);

  useEffect(() => {
    refreshToken();
    setRefreshingToken(false);
  }, [refreshToken]);

  useEffect(() => {
    if (refreshTokenData) {
      setAccessToken(refreshTokenData.data);
    }
  }, [refreshTokenData]);

  console.log({ accessToken });

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
        token: {
          isLoggedIn: Boolean(accessToken),
          setAccessToken,
          isLoading: isRefreshTokenLoading || refreshingToken,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
