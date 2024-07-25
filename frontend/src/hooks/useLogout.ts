import { useMutation, useQueryClient } from "react-query";

async function logout() {
  return { data: "logout" };
}

export default function useLogout() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null);
    },
  });

  return { action: mutate, isLoading, isError };
}
