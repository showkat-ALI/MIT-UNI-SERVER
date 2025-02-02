export type TQuiz = {
  attempts: string;
  isRequired: boolean;
  isSort: boolean;
  questionPerPage: string;
  scorePerQuestion: string;
  startDate: string;
  startTime: string;
  timeAllowed: string;
  title: string;
  type: string;
  createdBy: string;
};
export type TQuestion = {
  quiz: string;
  question: string;
  answers: { checked: boolean; value: string }[];
};
