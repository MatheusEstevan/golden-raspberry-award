import { Injectable } from '@nestjs/common';
import { MovieService } from '../../movies/services/movie.service';
import { IntervalAward } from '../dto/interval-award.dto';

@Injectable()
export class ProducerService {
  constructor(private readonly moviesService: MovieService) {}

  async getIntervalAwards() {
    const winners = await this.moviesService.getWinners();

    const producerWins: Record<string, number[]> = {};

    winners.forEach((movie) => {
      const producers = movie.producers
        .split(/;| and /)
        .map((p) => p.trim());

      producers.forEach((producer) => {
        if (!producerWins[producer]) {
          producerWins[producer] = [];
        }
        producerWins[producer].push(movie.year);
      });
    });

    const intervals: IntervalAward[] = [];

    Object.entries(producerWins).forEach(([producer, years]) => {
      if (years.length < 2) return;

      const sorted = years.sort((a, b) => a - b);
      for (let i = 0; i < sorted.length - 1; i++) {
        intervals.push({
          producer,
          interval: sorted[i + 1] - sorted[i],
          previousWin: sorted[i],
          followingWin: sorted[i + 1],
        });
      }
    });

    const minInterval = Math.min(...intervals.map((i) => i.interval));
    const maxInterval = Math.max(...intervals.map((i) => i.interval));

    return {
      min: intervals.filter((i) => i.interval === minInterval),
      max: intervals.filter((i) => i.interval === maxInterval),
    };
  }
}
