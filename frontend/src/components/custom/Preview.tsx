import { CircleUser, Play } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import formatDuration from "@/utilities/formatDuration";
import formatViews from "@/utilities/formatViews";

import LazyImage from "@/components/custom/LazyImage";

type PreviewProps = {
  videoId: string;
  imageUrl: string;
  title: string;
  duration: number;
  channelAvatarUrl: string | null;
  channelName: string;
  channelId: string;
  views: number;
  uploadedAt: Date;
  compact?: boolean;
  showUser?: boolean;
};

export default function Preview({
  videoId,
  imageUrl,
  title,
  duration,
  channelAvatarUrl,
  channelName,
  channelId,
  views,
  uploadedAt,
  compact = false,
  showUser = true,
}: PreviewProps) {
  console.log(videoId, showUser);
  // todo add image placeholder for lazy loading
  return (
    <Link
      to={`/watch?videoId=${videoId}`}
      className={cn({ "flex gap-x-2": compact })}
    >
      <div className="group relative flex aspect-video w-full overflow-hidden rounded-lg">
        <div className="absolute inset-0 grid place-items-center bg-black/50 text-white opacity-0 group-hover:opacity-100">
          <Play className={cn("h-12 w-12", { "h-6 w-6": compact })} />
        </div>
        <LazyImage src={imageUrl} alt={title} />
        <span className="absolute bottom-3 right-3 rounded-md bg-gray-900/70 px-2 py-1 text-sm font-medium text-white">
          {formatDuration(duration)}
        </span>
      </div>
      <div className="mt-2 flex gap-2">
        {!compact && showUser && (
          <Link to={`/user/${channelId}`} className="">
            {channelAvatarUrl ? (
              <img
                src={channelAvatarUrl}
                alt=""
                className="w-16 rounded-full object-cover object-center"
              />
            ) : (
              <CircleUser className="h-16 w-16" />
            )}
          </Link>
        )}
        <div className="flex flex-col">
          <div
            className={cn("line-clamp-1 text-lg font-medium", {
              "text-base": compact,
            })}
          >
            {title}
          </div>
          {showUser && (
            <Link
              to={`/user/${channelId}`}
              className="text-sm font-medium text-indigo-500"
            >
              {channelName}
            </Link>
          )}
          <div className="flex gap-2 text-sm text-gray-500">
            <span>{formatViews(views)} views</span>
            <span>•</span>
            <span>{uploadedAt.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
