import request from 'supertest';
import app from "../dist/src/app"

test("should sign up new user", async () => {
    await request(app).post('/users').send({
        name: "costelas",
        email: "costelasdenis@gmail.com",
        password: "vaca1234"
    }).expect(201)
})