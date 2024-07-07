import Preview from "@/components/custom/Preview";

function Home() {
  function generateViews() {
    const coinToss = Math.floor(Math.random() * 3);

    if (coinToss === 0) {
      return Math.floor(Math.random() * 10_000_000);
    } else if (coinToss === 1) {
      return Math.floor(Math.random() * 1_000_000);
    } else {
      return Math.floor(Math.random() * 100_000);
    }
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {new Array(20).fill(0).map((_, i) => (
          <Preview
            key={i}
            videoId="123"
            imageUrl="https://picsum.photos/640/360"
            duration={Math.floor(Math.random() * 10000)}
            channelAvatarUrl="https://picsum.photos/64/64"
            title="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum, culpa corrupti distinctio enim aspernatur magnam."
            channelId="123"
            channelName="Channel Name"
            views={generateViews()}
            uploadedAt={new Date()}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
