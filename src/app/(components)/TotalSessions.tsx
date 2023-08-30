import { getActivePercentage, getBgColor, secondsToTime } from "../utils";

function getTotalSums(sessions: any[]) {
  let totalSeconds = 0;
  let completedSeconds = 0;
  let rounds = 0;

  sessions.forEach((session) => {
    totalSeconds += session.totalSeconds;
    completedSeconds += session.completedSeconds;
    rounds += session.rounds;
  });

  return { totalSeconds, completedSeconds, rounds };
}

function getTotals(sessions: any[]) {
  const { totalSeconds, completedSeconds, rounds } = getTotalSums(sessions);
  const activePercentage = getActivePercentage(totalSeconds, completedSeconds);
  const totalTime = secondsToTime(totalSeconds);
  const completedTime = secondsToTime(completedSeconds);

  return { totalTime, completedTime, rounds, activePercentage };
}

export default function TotalSessions({ sessions }: { sessions: any[] }) {
  const { totalTime, completedTime, rounds, activePercentage } =
    getTotals(sessions);
  const bgColor = getBgColor(activePercentage);

  return (
    <div>
      <div
        className={`flex flex-row items-center justify-between gap-10 p-5 border rounded-md shadow-md hover:shadow-lg text-lg text-center ${bgColor}`}
      >
        <div className="flex flex-col">
          <p>Total Time</p>
          <p>{totalTime}</p>
        </div>
        <div className="flex flex-col">
          <p>Completed Time</p>
          <p>{completedTime}</p>
        </div>
        <div className="flex flex-col">
          <p>Rounds</p>
          <p>{rounds}</p>
        </div>
        <div className="flex flex-col font-semibold">
          <p>Active</p>
          <p className="text-xl">{activePercentage}%</p>
        </div>
      </div>
    </div>
  );
}
