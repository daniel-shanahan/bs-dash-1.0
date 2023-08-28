import { getActivePercentage, secondsToTime } from "@/app/utils";
import PocketBase from "pocketbase";

async function getStudent(id: string) {
  const db = new PocketBase("http://127.0.0.1:8090");
  const student = await db.collection("students").getOne(id);
  return student;
}

async function getStudentSessions(id: string) {
  const db = new PocketBase("http://127.0.0.1:8090");
  const sessions = await db.collection("sessions").getList(1, 100, {
    filter: `studentId="${id}"`,
    sort: "-date",
  });

  return sessions;
}

export default async function StudentPage({ params }: any) {
  const student = await getStudent(params.id);
  const sessions = await getStudentSessions(params.id);

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-4xl font-bold pb-10">
        {student.firstName} {student.lastName}
      </h1>
      <h2 className="text-2xl font-bold pb-4">Sessions</h2>
      <div className="flex flex-col gap-5">
        {sessions.items.map((session: any) => (
          <SessionListItem key={session.id} session={session} />
        ))}
      </div>
    </div>
  );
}

function SessionListItem({ session }: any) {
  const { date, totalSeconds, completedSeconds, rounds } = session;
  const sessionDate = new Date(date);
  const totalTime = secondsToTime(totalSeconds);
  const completedTime = secondsToTime(completedSeconds);
  const activePercentage = getActivePercentage(totalSeconds, completedSeconds);

  return (
    <div className="flex flex-row items-center justify-between gap-4 p-5 border rounded-md shadow-md hover:shadow-lg text-md">
      <div className="flex flex-col">
        <p>{sessionDate.toDateString()}</p>
        <p className="text-sm">{sessionDate.toLocaleTimeString()}</p>
      </div>
      <p className="text-lg font-semibold">{activePercentage}% Active</p>
      <p>{rounds} Rounds</p>
      <div className="flex flex-col">
        <p>Total Time</p>
        <p>{totalTime}</p>
      </div>
      <div className="flex flex-col">
        <p>Completed Time</p>
        <p>{completedTime}</p>
      </div>
    </div>
  );
}
