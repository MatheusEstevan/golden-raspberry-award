import { Module } from '@nestjs/common';
import { ProducerService } from './services/producer.service';
import { ProducerController } from './controllers/producer.controller';
import { MovieModule } from '../movies/movie.module';

@Module({
  imports: [MovieModule],
  controllers: [ProducerController],
  providers: [ProducerService],
})
export class ProducersModule {}
