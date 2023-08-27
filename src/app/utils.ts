export const timeToSeconds = (time: string): number => {
  const [hours, minutes, seconds] = time.split(":");
  return +hours * 3600 + +minutes * 60 + +seconds;
};

export const secondsToTime = (seconds: number): string => {
  const hoursStr = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutesStr = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secsStr = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");

  return `${hoursStr}:${minutesStr}:${secsStr}`;
};

export const getActivePercentage = (
  totalTime: string,
  completedTime: string
): number => {
  const totalSeconds = timeToSeconds(totalTime);
  const completedSeconds = timeToSeconds(completedTime);

  return Math.round((completedSeconds / totalSeconds) * 100);
};
