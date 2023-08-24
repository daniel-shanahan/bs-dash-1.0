"use client";

import Papa from "papaparse";
import { Session } from "../common.types";

const acceptableCSVFileTypes =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

export default function ImportSessions() {
  return (
    <div>
      <label>
        Exercise report (CSV):
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
                results.data.map((entry: any) => {
                  if (entry["% Active Time"]) {
                    const session: Session = {
                      userId: entry["User ID"],
                      date: entry["Date"],
                      totalTime: entry["Total Time"],
                      completedTime: entry["Completed Time"],
                      activePercentage: +entry["% Active Time"].replace(
                        "%",
                        ""
                      ),
                      rounds: +entry["Rounds"],
                    };

                    console.log(session);
                  }
                });
              },
            });
          }}
        />
      </label>
    </div>
  );
}
