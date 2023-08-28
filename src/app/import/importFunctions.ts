"use server";

import { Session, Student } from "../common.types";
import PocketBase from "pocketbase";
import { timeToSeconds } from "../utils";

const getStudentId = async (brainskillsId: string): Promise<string> => {
  const db = new PocketBase("http://127.0.0.1:8090");

  try {
    const existingStudent = await db
      .collection("students")
      .getFirstListItem(`brainskillsId="${brainskillsId}"`, {
        $autoCancel: false,
      });
    return existingStudent.id;
  } catch (err) {
    console.error(err);
    return "";
  }
};

const createStudentRecord = async (student: Student) => {
  const db = new PocketBase("http://127.0.0.1:8090");

  try {
    // Check if student already exists
    const existingStudent = await db
      .collection("students")
      .getFirstListItem(`brainskillsId="${student.brainskillsId}"`, {
        $autoCancel: false,
      });
    if (existingStudent) {
      return;
    }
  } catch (err) {
    try {
      // Create student record
      await db.collection("students").create(student, { $autoCancel: false });
    } catch (err) {
      console.error(err);
    }
  }
};

export const parseStudentLoginList = async (csvData: any) => {
  csvData.map((row: any) => {
    const student: Student = {
      brainskillsId: row["User ID"],
      firstName: row["First Name"],
      lastName: row["Last Name"],
    };

    createStudentRecord(student);
  });
};

const createSessionRecord = async (session: Session) => {
  const db = new PocketBase("http://127.0.0.1:8090");

  try {
    // Check if session already exists
    const existingSession = await db
      .collection("sessions")
      .getFirstListItem(
        `studentId="${session.studentId}" && date="${session.date}"`,
        { $autoCancel: false }
      );
    if (existingSession) {
      return;
    }
  } catch (err) {
    try {
      // Create session record
      await db.collection("sessions").create(session, { $autoCancel: false });
    } catch (err) {
      console.error(err);
    }
  }
};

export const parseExerciseReport = async (csvData: any) => {
  csvData.map(async (row: any) => {
    if (row["% Active Time"]) {
      const session: Session = {
        studentId: await getStudentId(row["User ID"]),
        date: new Date(row["Date"]),
        totalSeconds: timeToSeconds(row["Total Time"]),
        completedSeconds: timeToSeconds(row["Completed Time"]),
        rounds: +row["Rounds"],
      };

      createSessionRecord(session);
    }
  });
};
