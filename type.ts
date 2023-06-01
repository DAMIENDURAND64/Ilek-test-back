export type QuestionsProps = {
  id: number;
  question: string;
  answers: Answer[];
};

export type Answer = {
  id: number;
  answer: string;
  isCorrect: boolean;
};

export type Response = {
  questionId: number;
  answerId: number;
};
