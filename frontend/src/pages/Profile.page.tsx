import { useQuery } from "@tanstack/react-query";
import { userApi } from "@/api";

export default function Profile() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userApi.getProfile("0f66eb7c-f688-4e13-8f14-36d5c92dcaba"),
    refetchOnMount: true, // for development
  });

  console.log({ data, error, isLoading, isError });
  return (
    <div>
      <p>Profile</p>
      <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>
    </div>
  );
}
