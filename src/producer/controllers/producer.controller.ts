import { Controller, Get } from '@nestjs/common';
import { ProducerService } from '../services/producer.service';

@Controller('producers')
export class ProducerController {
  constructor(private readonly service: ProducerService) {}

  @Get('interval-awards')
  async getIntervalAwards() {
    return this.service.getIntervalAwards();
  }
}
