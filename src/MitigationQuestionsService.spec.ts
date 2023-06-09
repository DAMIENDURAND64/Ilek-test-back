import { Test, TestingModule } from '@nestjs/testing';
import { MitigationQuestionsService } from './mitigationQuestionsService';

jest.mock('../utils/randomFiveQuestions.ts', () => ({
  RandomFiveQuestions: jest.fn().mockImplementation((questions) => questions),
}));

describe('MitigationQuestionsService', () => {
  let service: MitigationQuestionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MitigationQuestionsService],
    }).compile();

    service = module.get<MitigationQuestionsService>(
      MitigationQuestionsService,
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
      //2 true and 1 false
      { 1: '1', 2: '1', 3: '2' };

    const result = service.postAnswers(answers);
    expect(result.correctAnswersCount).toBe(2);
  });
});
