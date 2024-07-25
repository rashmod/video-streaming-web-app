import AuthContext from "./AuthContext";
import useRegister from "@/hooks/useRegister";
import useLogin from "@/hooks/useLogin";
import useLogout from "@/hooks/useLogout";

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    action: register,
    data: registerData,
    isLoading: isRegisterLoading,
    isError: isRegisterError,
  } = useRegister();
  const {
    action: login,
    data: loginData,
    isLoading: isLoginLoading,
    isError: isLoginError,
  } = useLogin();
  const {
    action: logout,
    isLoading: isLogoutLoading,
    isError: isLogoutError,
  } = useLogout();

  return (
    <AuthContext.Provider
      value={{
        register: {
          action: register,
          data: registerData,
          isLoading: isRegisterLoading,
          isError: isRegisterError,
        },
        login: {
          action: login,
          data: loginData,
          isLoading: isLoginLoading,
          isError: isLoginError,
        },
        logout: {
          action: logout,
          isLoading: isLogoutLoading,
          isError: isLogoutError,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
