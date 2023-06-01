import { Test, TestingModule } from '@nestjs/testing';
import { MitigationQuestionsService } from './mitigationQuestionsService';

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
    const answers = [
      //true
      { questionId: 1, answerId: 1 },
      //true
      { questionId: 2, answerId: 1 },
      //false
      { questionId: 3, answerId: 2 },
    ];

    const result = service.postAnswers(answers);
    expect(result.correctAnswersCount).toBe(2);
  });
});
