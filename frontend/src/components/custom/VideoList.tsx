import Preview from "@/components/custom/Preview";
import { Video, VideoWithUser } from "@/types/types";
import generateViews from "@/utilities/generateViews";

export default function VideoList({
  videos,
}: {
  videos: (Video | VideoWithUser)[];
}) {
  const isHomeVideo = (video: Video | VideoWithUser): video is VideoWithUser =>
    "user" in video;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
          />
        );
      })}
    </div>
  );
}
