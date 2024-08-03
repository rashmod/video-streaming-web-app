import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@/api";

export default function useLogout() {
  const queryClient = useQueryClient();

  const {
    mutate,
    data,
    error,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });

  return { action: mutate, data,error, isLoading, isError };
}
