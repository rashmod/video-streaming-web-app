import { useQuery } from "@tanstack/react-query";

import { userApi } from "@/api";
import useAuthContext from "@/context/auth/useAuthContext";

export default function Profile() {
  const {
    token: { isLoggedIn },
  } = useAuthContext();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userApi.getProfile("0f66eb7c-f688-4e13-8f14-36d5c92dcaba"),
    refetchOnMount: true, // for development
  });

  console.log({ data, error, isLoading, isError });
  return (
    <div>
      <p>Profile</p>
      <p>isLoggedIn: {String(isLoggedIn)}</p>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
