import PocketBase from "pocketbase";
import { Student } from "./common.types";
import Link from "next/link";

async function getStudents() {
  const db = new PocketBase("http://127.0.0.1:8090");
  const students = await db
    .collection("students")
    .getFullList({ sort: "lastName" });
  return students;
}

export default async function HomePage() {
  const students = await getStudents();

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-4xl font-bold">Brainskills Dashboard</h1>
      <div className="flex flex-col gap-5">
        {students.map((record: any) => {
          return <StudentEntry key={record.id} student={record} />;
        })}
      </div>
    </div>
  );
}

function StudentEntry({ student }: any) {
  const { firstName, lastName, id } = student;

  return (
    <Link href={`/student/${id}`}>
      <div className="flex items-center justify-between w-96 p-5 border rounded-md shadow-md hover:shadow-lg text-lg">
        {firstName} {lastName}
      </div>
    </Link>
  );
}
