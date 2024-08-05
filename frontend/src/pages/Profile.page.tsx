import { useQuery } from "@tanstack/react-query";
import { CircleUser } from "lucide-react";

import { userApi, videoApi } from "@/api";
import { USER_ID } from "@/constants/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VideoList from "@/components/custom/VideoList";
import LazyImage from "@/components/custom/LazyImage";

export default function Profile() {
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => userApi.getProfile(USER_ID),
  });

  const {
    data: videos,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
  } = useQuery({
    queryKey: ["videos", "user", USER_ID],
    queryFn: () => videoApi.getProfileVideos(),
  });

  const uploadedVideos = videos?.data.filter(
    (video) => video.status === "COMPLETED",
  );
  const uploadingVideos = videos?.data.filter(
    (video) => video.status === "UPLOADING" || video.status === "TRANSCODING",
  );

  return (
    <div>
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
      {videos && uploadingVideos && uploadedVideos && (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="uploaded">Uploaded</TabsTrigger>
            <TabsTrigger value="uploading">Uploading</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <VideoList videos={videos.data} />
          </TabsContent>
          <TabsContent value="uploaded">
            <VideoList videos={uploadedVideos} />
          </TabsContent>
          <TabsContent value="uploading">
            <VideoList videos={uploadingVideos} />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
