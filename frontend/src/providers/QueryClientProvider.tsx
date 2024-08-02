import { useState } from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import envConfig from "@/config/env.config";

const USER_SERVICE_API_URL = envConfig.VITE_UPLOAD_SERVICE_API_URL;

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [refreshingToken, setRefreshingToken] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const navigate = useNavigate();

  async function refreshAuthToken() {
    if (refreshingToken) return;

    try {
      setRefreshingToken(true);
      const response = await axios.get(
        `${USER_SERVICE_API_URL}/refresh_token`,
        { withCredentials: true },
      );
      console.log(response);
      setAccessToken(response.data.data.accessToken);
    } catch (error) {
      navigate("/login");
    } finally {
      setRefreshingToken(false);
    }
  }

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchInterval: false,
            refetchIntervalInBackground: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            retry: (failureCount, error: any) => {
              if (
                error?.response?.status === 400 ||
                error?.response?.status === 401
              ) {
                return false;
              }

              // react query default retry count is 3
              return failureCount < 3;
            },
          },
        },
        queryCache: new QueryCache({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onError: (error: any) => {
            if (
              error?.response?.status === 400 ||
              error?.response?.status === 401
            ) {
              refreshAuthToken();
            }
          },
        }),
      }),
  );

  queryClient.setQueryData(["auth"], accessToken);

  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryClientProvider>
  );
}
