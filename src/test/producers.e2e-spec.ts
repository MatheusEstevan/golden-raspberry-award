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

  afterAll(async () => {
    await app.close();
  });
});
