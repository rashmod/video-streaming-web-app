import Preview from "@/components/custom/Preview";
import { User, Video } from "@/types/types";
import generateViews from "@/utilities/generateViews";

export default function VideoList({
  videos,
  showUser = true,
}: {
  videos: (User & Video)[];
  showUser?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video) => (
        <Preview
          key={video.id}
          videoId={video.id}
          imageUrl={video.thumbnailName}
          duration={video.duration}
          channelAvatarUrl={video.avatarUrl}
          title={video.title}
          channelId={video.userId}
          channelName={video.username}
          views={generateViews()}
          uploadedAt={video.createdAt}
          showUser={showUser}
        />
      ))}
    </div>
  );
}
