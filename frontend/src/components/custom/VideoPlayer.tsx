import ReactPlayer from "react-player";

export default function VideoPlayer({
  url,
  token,
}: {
  url: string;
  token: string;
}) {
  return (
    <div className="relative !pt-[52.5%]">
      <ReactPlayer
        className="absolute left-0 top-0"
        width={"100%"}
        height={"100%"}
        url={url}
        config={{
          file: {
            hlsOptions: {
              xhrSetup: function xhrSetup(
                xhr: {
                  open: (method: string, baseUrl: string) => void;
                },
                baseUrl: string,
              ) {
                xhr.open("GET", baseUrl + token);
              },
            },
          },
        }}
        controls
      />
    </div>
  );
}
