import { useQuery } from "@tanstack/react-query";
import { CircleUser } from "lucide-react";

import { USER_ID } from "@/constants/constants";
import VideoList from "@/components/custom/VideoList";
import LazyImage from "@/components/custom/LazyImage";
import { videoApi, userApi } from "@/api";

export default function User() {
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["user", USER_ID],
    queryFn: () => userApi.getProfile(USER_ID),
  });

  const {
    data: videos,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
  } = useQuery({
    queryKey: ["videos", "user", USER_ID],
    queryFn: () => videoApi.getUserVideos(USER_ID),
  });

  return (
    <div className="grid gap-4">
      {isLoadingUser && <div>user loading</div>}
      {isErrorUser && <div>user error</div>}
      {user && (
        <div className="flex items-center gap-4">
          {user.avatarUrl ? (
            <LazyImage
              src={user.avatarUrl}
              alt=""
              className="aspect-square w-32 rounded-full object-cover object-center"
            />
          ) : (
            <CircleUser className="h-32 w-32" />
          )}
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <p>since {new Date(user.createdAt).toDateString()}</p>
          </div>
        </div>
      )}
      {isLoadingVideos && <div>videos loading</div>}
      {isErrorVideos && <div>videos error</div>}
      {videos && <VideoList videos={videos.data} />}
    </div>
  );
}
