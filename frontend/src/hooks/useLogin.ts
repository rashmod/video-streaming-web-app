import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api";

export default function useLogin() {
  const queryClient = useQueryClient();

  const {
    mutate,
    data,
    error,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["auth"], data.accessToken);
    },
  });

  return { action: mutate, data, error, isLoading, isError };
}
