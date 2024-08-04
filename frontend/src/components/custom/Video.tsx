import VideoPlayer from "./VideoPlayer";

export default function Video({
  title,
  url,
  token,
  uploadedAt,
}: {
  title: string;
  url: string;
  token: string;
  uploadedAt: string;
}) {
  return (
    <div>
      <VideoPlayer url={url} token={token} />
      <p className="mt-2 text-xl font-medium">{title}</p>
      <p className="text-sm text-gray-500">
        Uploaded: {new Date(uploadedAt).toDateString()}
      </p>
    </div>
  );
}
