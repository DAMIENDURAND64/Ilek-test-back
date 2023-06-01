import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';
import { Answer, QuestionsProps, Response } from '../type';

@Injectable()
export class EnvironmentQuestionsService {
  questions: QuestionsProps[] = environmentQuestions;

  #getQuestions(): QuestionsProps[] {
    return this.questions.map((question) => {
      const randomQuestion = JSON.parse(JSON.stringify(question));

      randomQuestion.answers.forEach((answer: Answer) => {
        delete answer.isCorrect;
      });

      return randomQuestion;
    });
  }

  getQuestions() {
    return this.#getQuestions();
  }

  postAnswers(answers: Response[]): { correctAnswersCount: number } {
    const correctAnswersCount = answers.reduce((acc, answer) => {
      const question = this.questions.find((q) => q.id === answer.questionId);
      if (
        question.answers.some((a) => a.id === answer.answerId && a.isCorrect)
      ) {
        acc++;
      }
      return acc;
    }, 0);

    return {
      correctAnswersCount,
    };
  }
}
