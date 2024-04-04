// test/auth.test.js

const request = require('supertest');
const app = require('../server'); // Importez le fichier server.js

describe('Authentication API', () => {
  it('should return 401 for unauthenticated user', async () => {
    const response = await request(app).get('/routes/api/patient');
    expect(response.statusCode).toBe(401);
  });

  it('should return 200 for authenticated user', async () => {
    const response = await request(app).get('/routes/api/patient').set('x-auth-token', 'YOUR_VALID_TOKEN');
    expect(response.statusCode).toBe(200);
  });
});
