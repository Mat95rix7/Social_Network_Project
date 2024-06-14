const request = require('supertest');
const app = require('../app');
const connect_MongoDB = require('../config/db')
const { closeDatabase, clearDatabase } = require('./mongoMemoryServer');
const Post = require('../models/Post');
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

describe('Create Post', () => {
  it('should create a new post', async () => {
    await User.create({ username: 'testuser3', email: 'testuser3@test.fr', password: 'password123' })
    console.log('connected')
    await request(app).post('/api/user/login')
      .send({email: 'testuser3@test.fr', password: 'password123'})
      .set({accept : "application/json"})
      // expect(r.status).toEqual(200)

    const res = await request(app).post('/api/post')
      .send({
          posterId: 'testuser3',
          message: 'This is a test post content'
        })
        // .set({accept:"application/json"})
        .set({accept : 'multipart/form-data'})
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('post');
  });

//   it('should fetch all posts', async () => {
//     await Post.create({ posterId: 'userTest1', message: 'Content 1' });
//     await Post.create({ posterId: 'userTest2', message: 'Content 2' });

//     const res = await request(app).get('/post');
//     expect(res.statusCode).toEqual(200);
//     expect(res.body).toHaveLength(2);
//   });
});
