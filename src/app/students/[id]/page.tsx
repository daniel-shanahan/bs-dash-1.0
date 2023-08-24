import PocketBase from "pocketbase";

async function getStudent(id: string) {
  const db = new PocketBase("http://127.0.0.1:8090");
  const student = await db.collection("students").getOne(id);
  return student;
}

export default async function StudentPage({ params }: any) {
  const student = await getStudent(params.id);
  return (
    <div className="flex flex-col items-center justify-between">
      <h1 className="text-4xl font-bold">
        {student.firstName} {student.lastName}
      </h1>
    </div>
  );
}
