import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';
import { loadMoviesCSV } from '../../helpers/csv.helper';

@Injectable()
export class MovieService implements OnModuleInit {
  constructor(
    @InjectRepository(Movie)
    private moviesRepo: Repository<Movie>,
  ) {}

  async onModuleInit() {
    const data = await loadMoviesCSV();
    const movies = data      
      .map((d) => ({
        year: Number(d.year),
        title: d.title,
        studios: d.studios,
        producers: d.producers,
        winner: d.winner?.trim().toLowerCase() === 'yes',
      }));
    if (movies.length > 0) {
      await this.moviesRepo.save(movies);
    }
  }
a
  async getWinners() {
    return this.moviesRepo.find({ where: { winner: true } });
  }

  async getAllMovies() {
    return this.moviesRepo.find();
  }
}
