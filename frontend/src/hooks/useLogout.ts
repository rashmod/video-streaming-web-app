import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api";

export default function useLogout(
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
  const {
    mutate,
    data,
    error,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setAccessToken(undefined);
    },
  });

  return { action: mutate, data, error, isLoading, isError };
}
