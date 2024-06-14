const request = require('supertest');
const app = require('../app'); 
const connect_MongoDB = require('../config/db')
const { closeDatabase, clearDatabase } = require('./mongoMemoryServer');
const User = require('../models/User'); 

beforeAll( () => {
    process.env.NODE_ENV = 'test';
    connect_MongoDB();
});

afterEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});

describe('SignUp', () => {
    it('bad user', async () => {
        const res = await request(app)
          .post('/api/user/signup')
          .send({})
          .set({accept : "application/json"})
        expect(res.status).toEqual(400);
      });
    
    it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/user/signup')
      .send({
        username: 'testuser', 
        email: 'testuser@test.fr',
        password: 'password123'
      })
      .set({accept : "application/json"})
    expect(res.status).toEqual(201);
  });

  it('should fetch all users', async () => {
    await User.create({ username: 'testuser1', email: 'testuser1@test.fr', password: 'password123' });
    await User.create({ username: 'testuser2', email: 'testuser2@test.fr', password: 'password123' });

    const res = await request(app).get('/api/user');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(2);
  });

  it('should create a new user with a same username', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({
        username: 'testuser', 
        email: 'testuser@test.fr',
        password: 'password123'
      })

    const res = await request(app)
      .post('/api/user/signup')
      .send({
        username: 'testuser', 
        email: 'testuser3@test.fr',
        password: 'password123'
      })
      .set({accept : "application/json"})
    expect(res.status).toEqual(400);
  });

  it('should create a new user with a same mail', async () => {
    await request(app)
      .post('/api/user/signup')
      .send({
        username: 'testuser', 
        email: 'testuser@test.fr',
        password: 'password123'
      })

    const res = await request(app)
      .post('/api/user/signup')
      .send({
        username: 'testuser3', 
        email: 'testuser@test.fr',
        password: 'password123'
      })
      .set({accept : "application/json"})
    expect(res.status).toEqual(400);
  });
});

describe('login', () => {
      it('should login with bad password', async () => {
        await request(app)
            .post('/api/user/signup')
            .send({
                username: 'testuser', 
                email: 'testuser@test.fr',
                password: 'password123'
            })

        const a = await request(app)
        .post('/api/user/login')
        .send({ 
          email: 'testuser@test.fr',
          password: 'password'
        })
        .set({accept : "application/json"})
      expect(a.status).toEqual(400);
      })

      it('should login with bad mail', async () => {
        await request(app)
            .post('/api/user/signup')
            .send({
                username: 'testuser', 
                email: 'testuser@test.fr',
                password: 'password123'
            })

        const a = await request(app)
        .post('/api/user/login')
        .send({ 
          email: 'test@test.fr',
          password: 'password123'
        })
        .set({accept : "application/json"})
      expect(a.status).toEqual(400);
      })

    
      it('should login and logout a user', async () => {
    await request(app)
        .post('/api/user/signup')
        .send({
            username: 'testuser', 
            email: 'testuser@test.fr',
            password: 'password123'
        })
    const c = await request(app)
      .post('/api/user/login')
      .send({ 
        email: 'testuser@test.fr',
        password: 'password123'
      })
      .set({accept : "application/json"})
    expect(c.status).toEqual(200);
    
    const response = await request(app)
      .get('/api/user/logout')
      .set({accept : "application/json"})
    expect(response.status).toEqual(200);
  });
});

describe('delete', () => {
  it('should delete user', async () => {
    await request(app)
        .post('/api/user/signup')
        .send({
            username: 'testuser', 
            email: 'testuser@test.fr',
            password: 'password123'
        })

    await request(app)
    .post('/api/user/login')
    .send({ 
      email: 'testuser@test.fr',
      password: 'password123'
    })

    const res = await request(app)
      .post('/api/user/login')
      .send({ 
        email: 'testuser@test.fr',
        password: 'password123'
      })
      .set({accept : "application/json"})
    expect(res.status).toEqual(200);

  })
});
