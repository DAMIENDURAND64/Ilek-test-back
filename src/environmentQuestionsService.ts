import { Injectable } from '@nestjs/common';
import * as environmentQuestions from './data/questions_environment.json';
import { Answer, QuestionsProps, Response } from '../type';
import { RandomFiveQuestions } from '../utils/randomFiveQuestions';

@Injectable()
export class EnvironmentQuestionsService {
  questions: QuestionsProps[] = environmentQuestions;

  #getQuestions(): QuestionsProps[] {
    const allQuestions = this.questions.map((question) => {
      const randomQuestion = JSON.parse(JSON.stringify(question));

      randomQuestion.answers.forEach((answer: Answer) => {
        delete answer.isCorrect;
      });

      return randomQuestion;
    });
    return RandomFiveQuestions(allQuestions);
  }

  getQuestions() {
    return this.#getQuestions();
  }

  postAnswers(answers: Response): {
    correctAnswersCount: number;
  } {
    // Get all questions that the user answered
    const answeredQuestions = this.questions.filter(
      (question) => answers[question.id] !== undefined,
    );

    const correctAnswersCount = answeredQuestions.reduce((count, question) => {
      // Get id of the answer that the user selected
      const userAnswerId = parseInt(answers[question.id]);
      // Get id of the correct answer from database
      const correctAnswer = question.answers.find((answer) => answer.isCorrect);

      return correctAnswer && correctAnswer.id === userAnswerId
        ? count + 1
        : count;
    }, 0);

    return { correctAnswersCount };
  }
}
