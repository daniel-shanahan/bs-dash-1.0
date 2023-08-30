import PageHeader from "@/app/(components)/PageHeader";
import TotalSessions from "@/app/(components)/TotalSessions";
import { getActivePercentage, getBgColor, secondsToTime } from "@/app/utils";
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
  console.log(sessions);
  const studentName = `${student.firstName} ${student.lastName}`;
  const noSessions = sessions.items.length === 0;

  return (
    <>
      <PageHeader title={studentName} />
      {noSessions ? (
        <div className="flex flex-col items-center justify-center h-96">
          <p className="text-2xl font-bold">No sessions yet</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold pb-4 text-center">Totals</h2>
            <TotalSessions sessions={sessions.items} />
          </div>
          <div>
            <h2 className="text-2xl font-bold pb-4 text-center">Sessions</h2>
            <div className="flex flex-col gap-5">
              {sessions.items.map((session: any) => (
                <SessionListItem key={session.id} session={session} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SessionListItem({ session }: any) {
  const { date, totalSeconds, completedSeconds, rounds } = session;
  const sessionDate = new Date(date);
  const totalTime = secondsToTime(totalSeconds);
  const completedTime = secondsToTime(completedSeconds);
  const activePercentage = getActivePercentage(totalSeconds, completedSeconds);
  const bgColor = getBgColor(activePercentage);

  return (
    <div
      className={`flex flex-row items-center justify-between gap-8 p-5 border rounded-md shadow-md hover:shadow-lg text-md text-center ${bgColor}`}
    >
      <div className="flex flex-col">
        <p>{sessionDate.toDateString()}</p>
        <p className="text-sm">{sessionDate.toLocaleTimeString()}</p>
      </div>
      <div className="flex flex-col">
        <p>Total Time</p>
        <p>{totalTime}</p>
      </div>
      <div className="flex flex-col">
        <p>Completed</p>
        <p>{completedTime}</p>
      </div>
      <div className="flex flex-col">
        <p>Rounds</p>
        <p>{rounds}</p>
      </div>
      <div className="flex flex-col font-semibold">
        <p>Active</p>
        <p className="text-lg">{activePercentage}%</p>
      </div>
    </div>
  );
}
