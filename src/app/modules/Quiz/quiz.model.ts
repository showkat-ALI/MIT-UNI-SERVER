import { Schema, model } from 'mongoose';
import { TQuestion, TQuiz } from './quiz.interface';

const quizSchema = new Schema<TQuiz>({
  attempts: {
    type: String,
    required: true,
  },
  isRequired: {
    type: Boolean,
    required: true,
  },
  isSort: {
    type: Boolean,
    required: true,
  },
  questionPerPage: {
    type: String,
    required: true,
  },
  scorePerQuestion: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  timeAllowed: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});
const questionSchema = new Schema<TQuestion>({
  quiz: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answers: [
    {
      checked: {
        type: Boolean,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Quiz = model<TQuiz>('Quiz', quizSchema);
export const Question = model<TQuestion>('Question', questionSchema);
