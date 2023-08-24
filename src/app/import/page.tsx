import ImportCsv from "./ImportCsv";
import { parseStudentLoginList, parseExerciseReport } from "./importFunctions";

export default function ImportPage() {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center font-semibold text-2xl">Import Page</h1>
      <div className="flex flex-row items-center justify-between">
        <ImportCsv
          parseFunction={parseStudentLoginList}
          label="Student login list (CSV):"
        />
        <ImportCsv
          parseFunction={parseExerciseReport}
          label="Exercise report (CSV):"
        />
      </div>
    </div>
  );
}
