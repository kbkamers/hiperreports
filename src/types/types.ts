export type Status = 'Completed' | 'In Progress' | 'Not Started';

export interface Report {
  id: string;
  userId: string;
  teamId: string;
  date: string;
  currentWeekCommitments: { task: string; subtasks: string[]; status: Status }[];
  nextWeekCommitments: { task: string; subtasks: string[]; status: Status }[];
  highlights: string;
  lowlights: string;
  comments?: { userId: string; comment: string; timestamp: string }[];
}