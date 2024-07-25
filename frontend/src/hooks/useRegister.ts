import { useMutation, useQueryClient } from "react-query";

async function register() {
  return { data: "register" };
}

export default function useRegister() {
  const queryClient = useQueryClient();

  const { mutate, data, isLoading, isError } = useMutation({
    mutationFn: register,
    onSuccess: (user) => {
      queryClient.setQueryData(["auth"], user);
    },
  });

  return { action: mutate, data, isLoading, isError };
}
