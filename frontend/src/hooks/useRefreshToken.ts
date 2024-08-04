import { authApi } from "@/api";
import { useMutation } from "@tanstack/react-query";
import React from "react";

export default function useRefreshToken(
  setAccessToken: React.Dispatch<React.SetStateAction<string | undefined>>,
) {
  const {
    mutate,
    data,
    isPending: isLoading,
    isError,
    status,
  } = useMutation({
    mutationFn: authApi.refreshToken,
    onSuccess: ({ data }) => {
      setAccessToken(data);
    },
    onError: () => {
      console.log("refresh token error");
      setAccessToken(undefined);
    },
  });

  console.log({ status });
  return { action: mutate, data, isLoading, isError };
}
