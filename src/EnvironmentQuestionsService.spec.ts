import { Test, TestingModule } from '@nestjs/testing';
import { EnvironmentQuestionsService } from './environmentQuestionsService';

jest.mock('../utils/randomFiveQuestions.ts', () => ({
  RandomFiveQuestions: jest.fn().mockImplementation((questions) => questions),
}));

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
    const answers =
      //1 true and 1 false
      { 101: '1', 107: '2' };

    const result = service.postAnswers(answers);
    expect(result.correctAnswersCount).toBe(1);
  });
});
