import Preview from "@/components/custom/Preview";
import { cn } from "@/lib/utils";
import { Video, VideoWithUser } from "@/types/types";
import generateViews from "@/utilities/generateViews";

export default function VideoList({
  videos,
  compact = false,
}: {
  videos: (Video | VideoWithUser)[];
  compact?: boolean;
}) {
  const isHomeVideo = (video: Video | VideoWithUser): video is VideoWithUser =>
    "user" in video;

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
            imageUrl={video.thumbnailName}
            duration={video.duration}
            channelAvatarUrl={showUser ? video.user.avatarUrl : null}
            title={video.title}
            channelId={showUser ? video.user.id : undefined}
            channelName={showUser ? video.user.username : undefined}
            views={generateViews()}
            uploadedAt={video.createdAt}
            compact={compact}
          />
        );
      })}
    </div>
  );
}
