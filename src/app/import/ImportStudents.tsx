"use client";

import Papa from "papaparse";
import { Student } from "../common.types";
import PocketBase from "pocketbase";

const acceptableCSVFileTypes =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

export default function ImportStudents() {
  const createStudentRecord = async (student: Student) => {
    const db = new PocketBase("http://127.0.0.1:8090");

    try {
      // Check if student already exists
      const existingStudent = await db
        .collection("students")
        .getFirstListItem(`userId="${student.userId}"`, { $autoCancel: false });
      console.log("existingStudent: ", existingStudent);
    } catch (err) {
      try {
        // Create student record
        const createdStudent = await db
          .collection("students")
          .create(student, { $autoCancel: false });
        console.log("createdStudent: ", createdStudent);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div>
      <label>
        Choose File (*csv, xls, etc.)
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
                  const student: Student = {
                    userId: entry["User ID"],
                    firstName: entry["First Name"],
                    lastName: entry["Last Name"],
                  };

                  createStudentRecord(student);
                });
              },
            });
          }}
        />
      </label>
    </div>
  );
}
