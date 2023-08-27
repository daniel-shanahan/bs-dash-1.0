export type Student = {
  brainskillsId: string;
  firstName: string;
  lastName: string;
};

export type Session = {
  studentId: string;
  date: Date;
  totalSeconds: number;
  completedSeconds: number;
  rounds: number;
};
