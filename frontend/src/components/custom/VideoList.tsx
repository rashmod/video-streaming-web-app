import Preview from "@/components/custom/Preview";
import { cn } from "@/lib/utils";
import { HomeVideo, UserVideo } from "@/types/types";
import generateViews from "@/utilities/generateViews";

export default function VideoList({
  videos,
  compact = false,
}: {
  videos: UserVideo[] | HomeVideo[];
  compact?: boolean;
}) {
  const isHomeVideo = (video: UserVideo | HomeVideo): video is HomeVideo =>
    "userId" in video;

  return (
    <div
      className={cn({
        "grid gap-4": compact,
        "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3": !compact,
      })}
    >
      {videos.map((video) => {
        const showUser = isHomeVideo(video);

        return (
          <Preview
            key={video.id}
            videoId={video.id}
            imageUrl={video.thumbnailUrl}
            duration={video.duration}
            channelAvatarUrl={showUser ? video.avatarUrl : null}
            title={video.title}
            channelId={showUser ? video.userId : undefined}
            channelName={showUser ? video.name : undefined}
            views={generateViews()}
            uploadedAt={video.createdAt}
            compact={compact}
          />
        );
      })}
    </div>
  );
}
