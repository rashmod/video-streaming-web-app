import { useMutation, useQueryClient } from "react-query";

async function login() {
  return { data: "login" };
}

export default function useLogin() {
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, isError } = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth"], user);
    },
  });

  return { action: mutate, data, isLoading, isError };
}
