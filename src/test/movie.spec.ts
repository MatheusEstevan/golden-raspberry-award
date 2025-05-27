import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../movies/services/movie.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from '../movies/entities/movie.entity';
import { Repository } from 'typeorm';

describe('MovieService', () => {
  let service: MovieService;
  let moviesRepo: Repository<Movie>;
  const mockMovies = [
    { id: 1, year: 2020, title: 'Movie 1', studios: 'Studio 1', producers: 'Producer 1', winner: true },
    { id: 2, year: 2021, title: 'Movie 2', studios: 'Studio 2', producers: 'Producer 2', winner: false },
  ];

  const mockMoviesRepo = {
    find: jest.fn().mockResolvedValue(mockMovies),
    save: jest.fn().mockResolvedValue(mockMovies),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMoviesRepo,
        },
      ],
    }).compile();

    service = module.get<MovieService>(MovieService);
    moviesRepo = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getWinners', () => {
    it('should return movies with winner set to true', async () => {
      jest.spyOn(moviesRepo, 'find').mockResolvedValue(mockMovies.filter((movie) => movie.winner));
      const winners = await service.getWinners();
      expect(winners).toEqual([mockMovies[0]]);
      expect(moviesRepo.find).toHaveBeenCalledWith({ where: { winner: true } });
    });
  });

  describe('getAllMovies', () => {
    it('should return all movies', async () => {
      const movies = await service.getAllMovies();
      expect(movies).toEqual(mockMovies);
      expect(moviesRepo.find).toHaveBeenCalled();
    });
  });

  describe('onModuleInit', () => {
    it('should save movies to the repository', async () => {
      const mockData = [
        { year: '2020', title: 'Movie 1', studios: 'Studio 1', producers: 'Producer 1', winner: 'Yes' },
        { year: '2021', title: 'Movie 2', studios: 'Studio 2', producers: 'Producer 2', winner: 'No' },
      ];
      jest.spyOn(require('../../helpers/csv.helper'), 'loadMoviesCSV').mockResolvedValue(mockData);
      await service.onModuleInit();
      expect(moviesRepo.save).toHaveBeenCalledWith([
        { year: 2020, title: 'Movie 1', studios: 'Studio 1', producers: 'Producer 1', winner: true },
        { year: 2021, title: 'Movie 2', studios: 'Studio 2', producers: 'Producer 2', winner: false },
      ]);
    });
  });
});