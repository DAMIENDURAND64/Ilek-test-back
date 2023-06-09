import { Body, Controller, Get, Post } from '@nestjs/common';
import { EnvironmentQuestionsService } from './environmentQuestionsService';
import { MitigationQuestionsService } from './mitigationQuestionsService';
import { Response } from 'type';

@Controller()
export class AppController {
  constructor(
    private readonly environmentQuestionsService: EnvironmentQuestionsService,
    private readonly mitigationQuestionsService: MitigationQuestionsService,
  ) {}

  @Get('environment_questions')
  getEnvironmentQuestions() {
    return this.environmentQuestionsService.getQuestions();
  }
  @Get('mitigation_questions')
  getMitigationQuestions() {
    return this.mitigationQuestionsService.getQuestions();
  }
  @Post('check_answers_environment')
  checkAnswersEnvironment(@Body() answers: Response) {
    return this.environmentQuestionsService.postAnswers(answers);
  }

  @Post('check_answers_mitigation')
  checkAnswersMitigation(@Body() answers: Response) {
    return this.mitigationQuestionsService.postAnswers(answers);
  }
}
