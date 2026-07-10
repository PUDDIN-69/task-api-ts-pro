import request from 'supertest';
import app from '../src/app';

describe('POST /items',()=>{
 it('creates item',async()=>{
  const res=await request(app).post('/items').send({title:'Test',priority:'high'});
  expect(res.statusCode).toBe(201);
 });
});