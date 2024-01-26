import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from '../src/modules/auth/auth.module';
import * as request from 'supertest';
import { getMockUser } from './user.e2e-spec';
import { JwtModule } from '@nestjs/jwt';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  const mockUser = getMockUser();

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        JwtModule.register({
          global: true,
          secret: 'secret_test',
          signOptions: { expiresIn: '1h' },
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/api/auth/login (POST)', () => {
    it('successfully login', async () => {
      await request(app.getHttpServer())
        .post('/users')
        .send({ email: mockUser.email, name: mockUser.name });

      const { body } = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: mockUser.email, password: mockUser.email });

      expect(body).toEqual({
        accessToken: expect.any(String),
      });

      token = body.accessToken;
    });
  });

  describe('/api/auth/me (GET)', () => {
    it('successfully get current user data', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`);

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
