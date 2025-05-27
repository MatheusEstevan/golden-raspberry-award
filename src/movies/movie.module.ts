import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Movie])],
    providers: [MovieService],
    exports: [MovieService],
    controllers: [MovieController],
})
export class MovieModule { }
