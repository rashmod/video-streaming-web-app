export default function generateViews() {
  const coinToss = Math.floor(Math.random() * 3);

  if (coinToss === 0) {
    return Math.floor(Math.random() * 10_000_000);
  } else if (coinToss === 1) {
    return Math.floor(Math.random() * 1_000_000);
  } else {
    return Math.floor(Math.random() * 100_000);
  }
}
