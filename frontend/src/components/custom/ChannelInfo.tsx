import { CircleUser } from "lucide-react";
import { Link } from "react-router-dom";

export default function ChannelInfo({
  channelId,
  channelName,
  channelAvatarUrl,
  createdAt,
}: {
  channelId: string;
  channelName: string;
  channelAvatarUrl: string | null;
  createdAt: string;
}) {
  return (
    <Link to={`/channel/${channelId}`} className="mt-4 flex items-center gap-4">
      {channelAvatarUrl ? (
        <img
          src={channelAvatarUrl}
          alt=""
          className="aspect-square w-16 rounded-full object-cover object-center"
        />
      ) : (
        <CircleUser className="h-16 w-16" />
      )}
      <div>
        <p className="text-lg font-medium">{channelName}</p>
        <p className="text-sm">Since {new Date(createdAt).getFullYear()}</p>
      </div>
    </Link>
  );
}
