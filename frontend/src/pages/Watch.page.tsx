import { useQuery } from "@tanstack/react-query";

import Video from "@/components/custom/Video";
import ChannelInfo from "@/components/custom/ChannelInfo";
import { Skeleton } from "@/components/ui/skeleton";
import VideoList from "@/components/custom/VideoList";

import { videoApi } from "@/api";
import { useSearchParams } from "react-router-dom";

export default function Watch() {
  const [searchParams] = useSearchParams();

  const videoId = searchParams.get("videoId");

  const {
    data: video,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => videoApi.watchVideo(videoId!),
  });

  const {
    data: videos,
    isLoading: isLoadingVideos,
    isError: isErrorVideos,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: () => videoApi.getHomeVideos(),
  });

  return (
    <>
      <div className="grid w-full gap-8 lg:grid-cols-5">
        <div className="col-span-3">
          {isLoadingVideo && (
            <div className="space-y-4">
              <Skeleton className="aspect-video w-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-11/12" />
                <Skeleton className="h-3 w-3/12" />
              </div>
            </div>
          )}

          {isErrorVideo && (
            <div className="grid aspect-video place-items-center bg-black text-4xl text-red-500">
              Something went wrong
            </div>
          )}

          {!isLoadingVideo && !isErrorVideo && video && (
            <>
              <Video
                title={video.data.video.title}
                uploadedAt={video.data.video.createdAt}
                url={video.data.video.videoUrl.url}
                token={video.data.video.videoUrl.token}
              />
              <ChannelInfo
                channelId={video.data.user.id}
                channelName={video.data.user.name}
                createdAt={video.data.user.createdAt}
                channelAvatarUrl={video.data.user.avatarUrl}
              />
            </>
          )}
        </div>

        <div className="col-span-2">
          {isLoadingVideos && <div>Loading videos...</div>}
          {isErrorVideos && <div>Something went wrong</div>}
          {!isLoadingVideos && !isErrorVideos && videos && (
            <VideoList videos={videos.data} compact />
          )}
        </div>
      </div>
    </>
  );
}
