export function formatTime(timeInSeconds) {
  if (!timeInSeconds || isNaN(timeInSeconds)) return "00:00";
  const mins = Math.floor(timeInSeconds / 60);
  const secs = Math.floor(timeInSeconds % 60);
  return `0${mins}:${secs < 10 ? "0" : ""}${secs}`;
}
