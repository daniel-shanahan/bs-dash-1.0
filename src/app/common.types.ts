export type Student = {
  userId: string;
  firstName: string;
  lastName: string;
};

export type Session = {
  userId: string;
  date: string;
  totalTime: string;
  completedTime: string;
  rounds: number;
  activePercentage: number;
};
