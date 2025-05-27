import { Controller, Get } from '@nestjs/common';
import { MovieService } from '../services/movie.service';

@Controller('movies')
export class MovieController {
    constructor(private readonly movieService: MovieService) {}

    @Get()
    async getAllMovies() {
        return await this.movieService.getAllMovies();
    }

    @Get('winners')
    async getWinners() {
        return await this.movieService.getWinners();
    }
}