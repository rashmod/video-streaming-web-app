import { Link } from "react-router-dom";

export default function ChannelInfo({
  channelId,
  channelName,
  channelAvatarUrl,
  createdAt,
}: {
  channelId: string;
  channelName: string;
  channelAvatarUrl: string;
  createdAt: Date;
}) {
  return (
    <Link to={`/channel/${channelId}`} className="mt-4 flex items-center gap-4">
      <img src={channelAvatarUrl} alt="" className="rounded-full" />
      <div>
        <p className="text-lg font-medium">{channelName}</p>
        <p className="text-sm">Since {createdAt.getFullYear()}</p>
      </div>
    </Link>
  );
}
