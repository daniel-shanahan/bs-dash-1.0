export type Student = {
  userId: string;
  firstName: string;
  lastName: string;
};

export type Session = {
  userId: string;
  date: Date;
  totalTime: string;
  completedTime: string;
  rounds: number;
  activePercentage: number;
};
