import Link from "next/link";
import PocketBase from "pocketbase";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getStudents() {
  const db = new PocketBase("http://127.0.0.1:8090");
  const students = await db
    .collection("students")
    .getFullList({ sort: "lastName" });
  return students;
}

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-4xl font-bold">Students</h1>
      <div className="flex flex-col gap-5">
        {students.map((student: any) => (
          <StudentListItem key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

function StudentListItem({ student }: any) {
  const { firstName, lastName, id } = student;

  return (
    <Link href={`/students/${id}`}>
      <div className="flex items-center justify-between w-96 p-5 border rounded-md shadow-md hover:shadow-lg text-lg">
        {firstName} {lastName}
      </div>
    </Link>
  );
}
