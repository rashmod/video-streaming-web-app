import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api";
import React from "react";

export default function useLogin(
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
  const {
    mutate,
    data,
    error,
    isPending: isLoading,
    isError,
  } = useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ data }) => {
      setAccessToken(data.accessToken);
    },
  });

  return { action: mutate, data, error, isLoading, isError };
}
