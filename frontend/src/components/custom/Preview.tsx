import { CircleUser, Play } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import formatDuration from "@/utilities/formatDuration";
import formatViews from "@/utilities/formatViews";

import LazyImage from "@/components/custom/LazyImage";

type CommonProps = {
  videoId: string;
  imageUrl: string;
  title: string;
  duration: number;
  views: number;
  uploadedAt: Date;
  compact?: boolean;
};

type HomePreviewProps = {
  channelAvatarUrl: string | null;
  channelName: string;
  channelId: string;
};

type PreviewProps = CommonProps | (CommonProps & HomePreviewProps);

export default function Preview({
  videoId,
  imageUrl,
  title,
  duration,
  views,
  uploadedAt,
  compact = false,
  ...rest
}: PreviewProps) {
  const navigate = useNavigate();

  const isHomePreview = "channelId" in rest && rest.channelId;

  return (
    <div
      onClick={() => navigate(`/watch?videoId=${videoId}`)}
      className={cn({ "grid grid-cols-5 gap-x-2": compact })}
    >
      <div className="group relative col-span-2 flex aspect-video w-full overflow-hidden rounded-lg">
        <div className="absolute inset-0 grid place-items-center bg-black/50 text-white opacity-0 group-hover:opacity-100">
          <Play className={cn("h-12 w-12", { "h-6 w-6": compact })} />
        </div>
        <LazyImage src={imageUrl} alt={title} />
        <span className="absolute bottom-3 right-3 rounded-md bg-gray-900/70 px-2 py-1 text-sm font-medium text-white">
          {formatDuration(duration)}
        </span>
      </div>
      <div className="col-span-3 mt-2 flex gap-2">
        {!compact && isHomePreview && (
          <Link
            onClick={(e) => e.stopPropagation()}
            to={`/user/${rest.channelId}`}
          >
            {rest.channelAvatarUrl ? (
              <LazyImage
                src={rest.channelAvatarUrl}
                alt=""
                className="aspect-square w-16 rounded-full object-cover object-center"
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
          {isHomePreview && (
            <Link
              onClick={(e) => e.stopPropagation()}
              to={`/user/${rest.channelId}`}
              className="text-sm font-medium text-indigo-500"
            >
              {rest.channelName}
            </Link>
          )}
          <div className="flex gap-2 text-sm text-gray-500">
            <span>{formatViews(views)} views</span>
            <span>•</span>
            <span>{uploadedAt.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
