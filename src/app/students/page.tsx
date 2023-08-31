import Link from "next/link";
import PocketBase from "pocketbase";
import PageHeader from "../(components)/PageHeader";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

async function getAllStudents() {
  const db = new PocketBase("http://127.0.0.1:8090");
  const students = await db
    .collection("students")
    .getFullList({ sort: "lastName" });
  return students;
}

async function studentHasSessions(student: any) {
  const db = new PocketBase("http://127.0.0.1:8090");

  try {
    const session = await db
      .collection("sessions")
      .getFirstListItem(`studentId="${student.id}"`, {
        $autoCancel: false,
      });
    return true;
  } catch (err) {
    return false;
  }
}

async function getActiveStudents() {
  const allStudents = await getAllStudents();
  const promises = allStudents.map(studentHasSessions);
  const results = await Promise.all(promises);
  return allStudents.filter((student, index) => results[index]);
}

export default async function StudentsPage() {
  const students = await getActiveStudents();
  return (
    <>
      <PageHeader title="Students" />
      <div className="flex flex-col items-center gap-5">
        {students.map((student: any) => (
          <StudentListItem key={student.id} student={student} />
        ))}
      </div>
    </>
  );
}

function StudentListItem({ student }: any) {
  const { firstName, lastName, id } = student;

  return (
    <Link href={`/students/${id}`}>
      <div className="flex items-center justify-between w-96 p-3 border rounded-md shadow-md hover:shadow-lg text-lg">
        {firstName} {lastName}
      </div>
    </Link>
  );
}
