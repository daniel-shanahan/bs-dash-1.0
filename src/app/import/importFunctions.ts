"use server";

import { Session, Student } from "../common.types";
import PocketBase from "pocketbase";

export const parseStudentLoginList = async (csvData: any) => {
  csvData.map((row: any) => {
    const student: Student = {
      userId: row["User ID"],
      firstName: row["First Name"],
      lastName: row["Last Name"],
    };

    createStudentRecord(student);
  });
};

const createStudentRecord = async (student: Student) => {
  const db = new PocketBase("http://127.0.0.1:8090");

  try {
    // Check if student already exists
    const existingStudent = await db
      .collection("students")
      .getFirstListItem(`userId="${student.userId}"`, { $autoCancel: false });
    console.log("existingStudent id: ", existingStudent.id);
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

export const parseExerciseReport = async (csvData: any) => {
  csvData.map((row: any) => {
    if (row["% Active Time"]) {
      const session: Session = {
        userId: row["User ID"],
        date: new Date(row["Date"]),
        totalTime: row["Total Time"],
        completedTime: row["Completed Time"],
        activePercentage: +row["% Active Time"].replace("%", ""),
        rounds: +row["Rounds"],
      };

      console.log(session);
    }
  });
};
