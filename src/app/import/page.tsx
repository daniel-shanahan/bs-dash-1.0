import PageHeader from "../(components)/PageHeader";
import ImportCsv from "./ImportCsv";
import { parseStudentLoginList, parseExerciseReport } from "./importFunctions";

export default function ImportPage() {
  return (
    <>
      <PageHeader title="Import" />
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
    </>
  );
}
