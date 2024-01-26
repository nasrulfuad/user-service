import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../src/modules/user/user.module';

export const getMockUser = () => ({
  name: `test_${Date.now()}`,
  email: `test_${Date.now()}@email.com`,
});

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/api/users (GET)', () => {
    it('should retrieve all users', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/users')
        .expect(HttpStatus.OK);

      expect(body).toEqual({
        page: expect.any(Number),
        limit: expect.any(Number),
        total: expect.any(Number),
        data: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            email: expect.any(String),
          }),
        ]),
      });
    });
  });

  describe('/api/users (POST)', () => {
    it('should successfully created a new user', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/users')
        .send(getMockUser())
        .expect(HttpStatus.CREATED);

      expect(body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
        }),
      );
    });
  });
});
