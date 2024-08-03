import { authApi } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRefreshToken() {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: authApi.refreshToken,
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["auth"], data);
    },
    onError: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });

  return { action: mutate, isLoading, isError };
}
