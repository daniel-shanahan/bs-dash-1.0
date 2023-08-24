"use client";

import Papa from "papaparse";

const acceptableCSVFileTypes =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

export default function ImportCsv({
  parseFunction,
  label,
}: {
  parseFunction: Function;
  label: string;
}) {
  return (
    <div>
      <label>
        {label}
        <input
          type="file"
          accept={acceptableCSVFileTypes}
          onChange={(e) => {
            if (!e.target.files) return;

            const csvFile = e.target.files[0];

            Papa.parse(csvFile, {
              skipEmptyLines: true,
              header: true,
              complete: (results) => {
                parseFunction(results.data);
              },
            });
          }}
        />
      </label>
    </div>
  );
}
