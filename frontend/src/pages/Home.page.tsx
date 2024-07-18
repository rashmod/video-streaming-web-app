import { useQuery } from "react-query";

import videoApi from "@/api/video";
import VideoList from "@/components/custom/VideoList";

function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["videos"],
    queryFn: videoApi.getAllVideos,
  });

  if (isError) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading</div>;
  }

  return <>{data && <VideoList videos={data} />}</>;
}

export default Home;
