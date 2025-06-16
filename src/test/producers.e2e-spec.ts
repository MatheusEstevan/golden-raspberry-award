import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('ProducersController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/producers/interval-awards (GET)', () => {
    return request(app.getHttpServer())
      .get('/producers/interval-awards')
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('min');
        expect(res.body).toHaveProperty('max');
        expect(Array.isArray(res.body.min)).toBe(true);
        expect(Array.isArray(res.body.max)).toBe(true);
      });
  });

  it('/producers/interval-awards (GET)', async () => {
    const expectedResponse = {
      min: [
        {
          producer: 'Joel Silver',
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: 'Matthew Vaughn',
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    };

    const response = await request(app.getHttpServer()).get('/producers/interval-awards');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  afterAll(async () => {
    await app.close();
  });
});
