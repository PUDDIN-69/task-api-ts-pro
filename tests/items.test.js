"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
describe('POST /items', () => {
    it('creates item', async () => {
        const res = await (0, supertest_1.default)(app_1.default).post('/items').send({ title: 'Test', priority: 'high' });
        expect(res.statusCode).toBe(201);
    });
});
