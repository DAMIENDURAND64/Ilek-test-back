import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import { MitigationQuestionsService } from './mitigationQuestionsService';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [EnvironmentQuestionsService, MitigationQuestionsService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return some questions', () => {
      expect(appController.getEnvironmentQuestions().length).toBeGreaterThan(0);
    });
  });
});
