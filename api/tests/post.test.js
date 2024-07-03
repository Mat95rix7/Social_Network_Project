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
    
    const r = await request(app).post('/api/user/login')
    .send({email: 'testuser3@test.fr', password: 'password123'})
    .set({accept : "application/json"})
    const token = r.body.token
    
    const res = await request(app)
    .post('/api/post')
    .send({
          posterId: 'testuser3',
          message: 'This is a test post content'
        })
    .set('Cookie', `MyCookie=${token}`)
    .set({accept : "application/json"})
    expect(res.status).toEqual(201);
  });

  it('should fetch all Posts', async () => {
      await User.create({ username: 'testuser3', email: 'testuser3@test.fr', password: 'password123' })
    
      const r = await request(app).post('/api/user/login')
      .send({email: 'testuser3@test.fr', password: 'password123'})
      .set({accept : "application/json"})
      const token = r.body.token

      const res = await request(app).get('/api/post')
      .set('Cookie', `MyCookie=${token}`)
      .set({accept : "application/json"})
      expect(res.status).toEqual(200)
    });

    it('should fetch one post', async () => {
      await User.create({ username: 'testuser3', email: 'testuser3@test.fr', password: 'password123' })
      
      const r = await request(app).post('/api/user/login')
      .send({email: 'testuser3@test.fr', password: 'password123'})
      .set({accept : "application/json"})
      const token = r.body.token
      
      const res = await request(app)
      .post('/api/post')
      .send({
            posterId: 'testuser3',
            message: 'This is a test post content'
          })
      .set('Cookie', `MyCookie=${token}`)
      .set({accept : "application/json"})
      const postId = res.body._id
      const response = await request(app).get(`/api/post/${postId}`)
      .set('Cookie', `MyCookie=${token}`)
      .set({accept : "application/json"})
      expect(response.status).toEqual(200)
    });

    it('should delete one post', async () => {
      await User.create({ username: 'testuser3', email: 'testuser3@test.fr', password: 'password123' })
      
      const r = await request(app).post('/api/user/login')
      .send({email: 'testuser3@test.fr', password: 'password123'})
      .set({accept : "application/json"})
      const token = r.body.token
      
      const res = await request(app)
      .post('/api/post')
      .send({
            posterId: 'testuser3',
            message: 'This is a test post content'
          })
      .set('Cookie', `MyCookie=${token}`)
      .set({accept : "application/json"})
     
      const postId = res.body._id
      const response = await request(app).delete(`/api/post/${postId}`)
      .set('Cookie', `MyCookie=${token}`)
      .set({accept : "application/json"})
      expect(response.status).toEqual(200)
    });

    it('should update a Post by id', async () => {
      await User.create({ username: 'testuser3', email: 'testuser3@test.fr', password: 'password123' })
      
      const a = await request(app).post('/api/user/login')
      .send({email: 'testuser3@test.fr', password: 'password123'})
      .set({accept : "application/json"})
      const token = a.body.token
      
      const b = await request(app)
      .post('/api/post')
      .send({
            posterId: 'testuser3',
            message: 'This is a test post content'
          })
      .set('Cookie', `MyCookie=${token}`)
      .set({accept : "application/json"})
      // expect(b.status).toEqual(201);
      const postId = b.body._id
      const post = {
        posterId : `${postId}`,
        message : 'This is the new content'
      }
      const postS = JSON.stringify(post)
      let file = {
                    name: '11718274530020.jpg',
                    type: "image/jpeg"
                }

      const response = await request(app).put(`/api/post/${postId}`)
      .send({
              'file' : `${file}`,
              'post' : `${postS}`
              }
      )
      .set('Cookie', `MyCookie=${token}`)
      .set({accept : 'multipart/form-data'})
      expect(response.status).toEqual(200)
      });
  });
