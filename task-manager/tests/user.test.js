import request from 'supertest';
import app from "../dist/src/app"
import User from "../dist/src/models/user"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'ceva',
    email: 'ceva@ceva.com',
    password: 'ceva1234',
    tokens: [{
        token: jwt.sign({ _id: userOneId._id }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany()
    await new User(userOne).save()
})

test("should sign up new user", async () => {
    await request(app).post('/users').send({
        name: "costelas",
        email: "costelasdenis@gmail.com",
        password: "vaca1234"
    }).expect(201)
})

test("should get new token from login user", async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password,
    }).expect(200)
    const user = await User.findById(userOne._id)

    expect(response.body.token).toBe(user.tokens[1].token)

    expect(response.body).toMatchObject({
        token: user.tokens[1].token
    })
})

test("should not login nonexistent user", async () => {
    await request(app).post('/users/login').send({
        name: userOne.name,
        email: userOne.email,
        password: "nuebunvere"
    }).expect(400)
})

test('should get user profile', async () => {
    await request(app).get('/users/me')
        .send()
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
})

test('should not get user profile unauthenticated user', async () => {
    await request(app).get('/users/me')
        .send()
        .expect(401)
})