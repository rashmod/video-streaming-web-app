import { useQuery } from "react-query";

import Preview from "@/components/custom/Preview";
import Video from "@/components/custom/Video";
import ChannelInfo from "@/components/custom/ChannelInfo";
import { Skeleton } from "@/components/ui/skeleton";

import { videoApi } from "@/api";

export default function Watch() {
  const videoId = "123";

  const { data, isError, isLoading } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => videoApi.watchVideo(videoId),
  });

  return (
    <>
      <div className="grid w-full gap-8 lg:grid-cols-5">
        <div className="col-span-3">
          {isLoading && (
            <div className="space-y-4">
              <Skeleton className="aspect-video w-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-11/12" />
                <Skeleton className="h-3 w-3/12" />
              </div>
            </div>
          )}

          {isError && (
            <div className="grid aspect-video place-items-center bg-black text-4xl text-red-500">
              Something went wrong
            </div>
          )}

          {!isLoading && !isError && data && (
            <>
              <Video
                title="Quae qui modi libero deserunt est natus reiciendis explicabo quidem."
                uploadedAt={new Date()}
                url={data.url}
                token={data.token}
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
          <div className="grid gap-4">
            {new Array(5).fill(0).map((_, i) => (
              <Preview
                key={i}
                videoId="123"
                imageUrl="https://picsum.photos/640/360"
                duration={Math.floor(Math.random() * 10000)}
                channelAvatarUrl="https://picsum.photos/64/64"
                channelId="123"
                title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, culpa corrupti distinctio enim aspernatur magnam."
                channelName="Channel Name"
                views={Math.floor(Math.random() * 1_000_000)}
                uploadedAt={new Date()}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
