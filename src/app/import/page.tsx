import ImportSessions from "./ImportSessions";
import ImportStudents from "./ImportStudents";

export default function ImportPage() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center font-semibold text-2xl">Import Page</h1>
      <div className="flex flex-row items-center justify-between">
        <ImportStudents />
        <ImportSessions />
      </div>
    </div>
  );
}
