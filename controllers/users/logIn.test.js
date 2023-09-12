const request = require('supertest');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const app = require('../../app');
const { User } = require('../../models/user');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { DB_HOST } = process.env;

const api = '/api/auth/login';

const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'testpassword',
  avatarURL: 'testAva',
};

let authToken;
let id;

beforeAll(async () => {
  await mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const hashedPassword = await bcrypt.hash(testUser.password, 10);
  testUser.password = hashedPassword;

  const user = await User.create(testUser);
  id = user._id;
  const payload = { id };
  authToken = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });

  await User.findByIdAndUpdate(id, { token: authToken });
});

afterAll(async () => {
  await User.findByIdAndRemove(id);
  await mongoose.connection.close();
});

describe('Login Controller', () => {
  it('should log in a user with valid credentials', async () => {
    const response = await request(app).post(api).send({
      email: testUser.email,
      password: 'testpassword',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should not log in a user with invalid credentials', async () => {
    const response = await request(app).post(api).send({
      email: 'invalid@example.com',
      password: 'invalidpassword',
    });
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty(
      'message',
      'Email or password invalid'
    );
  });

  it('should require authentication for other routes', async () => {
    const response = await request(app).get('/api/contacts');

    expect(response.status).toBe(401);
  });
});
