const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
  db.shutdown();
});

test('GET Invalid URL', async () => {
  await request.get('/v0/so-not-a-real-end-point-ba-bip-de-doo-da/')
    .expect(404);
});

const ill = {
  'email': 'asdf@c.com',
  'pass': 'asdf',
};

test('Incorrect Login', async () => {
  await request.post('/v0/login/')
    .send(ill)
    .expect(401);
});

const login = {
  'email': 'molly@books.com',
  'pass': 'mollymember',
};
let token = '';

test('Correct Login', async () => {
  await request.post('/v0/login/')
    .send(login)
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.name).toEqual('Molly Member');
      token = res.body.accessToken;
    });
});

test('GET With Authorization', async () => {
  await request.get('/v0/mail?mailbox=inbox')
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('GET NonExistent With Authorization', async () => {
  await request.get('/v0/mail?mailbox=new')
    .set('Authorization', 'Bearer ' + token)
    .expect(404)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
    });
});

test('GET With Wrong Authorization', async () => {
  token = token + '3';
  await request.get('/v0/mail?mailbox=inbox')
    .set('Authorization', 'Bearer ' + token)
    .expect(403);
});
