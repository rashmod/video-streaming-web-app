export default function formatDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = Math.floor(duration % 60);

  const hoursString = hours > 0 ? `${hours}:` : "";
  const minutesString =
    hours > 0 ? `${minutes.toString().padStart(2, "0")}:` : `${minutes}:`;
  const secondsString = `${seconds.toString().padStart(2, "0")}`;

  return `${hoursString}${minutesString}${secondsString}`;
}
