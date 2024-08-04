import { useQuery } from "@tanstack/react-query";

import Video from "@/components/custom/Video";
import ChannelInfo from "@/components/custom/ChannelInfo";
import { Skeleton } from "@/components/ui/skeleton";
import VideoList from "@/components/custom/VideoList";

import { videoApi } from "@/api";

export default function Watch() {
  const videoId = "123";

  const {
    data: video,
    isLoading: isLoadingVideo,
    isError: isErrorVideo,
  } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => videoApi.watchVideo(videoId),
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
                title="Quae qui modi libero deserunt est natus reiciendis explicabo quidem."
                uploadedAt={new Date()}
                url={video.url}
                token={video.token}
              />
              <ChannelInfo
                channelId="123"
                channelName="Channel Name"
                createdAt={new Date()}
                channelAvatarUrl="https://picsum.photos/64/64"
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
