import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentQuestionsService } from './environmentQuestionsService';

describe('EnvironmentQuestionsService', () => {
  let service: EnvironmentQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvironmentQuestionsService],
    }).compile();

    service = module.get<EnvironmentQuestionsService>(
      EnvironmentQuestionsService,
    );
  });

  it('should get questions without correct answers', () => {
    const questions = service.getQuestions();
    questions.forEach((question) => {
      question.answers.forEach((answer) => {
        expect(answer.isCorrect).toBeUndefined();
      });
    });
  });

  it('should count correct answers', () => {
    const answers = [
      //true
      { questionId: 101, answerId: 1 },
      //false
      { questionId: 107, answerId: 2 },
    ];

    const result = service.postAnswers(answers);
    expect(result.correctAnswersCount).toBe(1);
  });
});
