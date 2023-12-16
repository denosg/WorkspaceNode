import request from 'supertest';
import Task from "../dist/src/models/task"
import {userOneId, userOne, setUpDatabase, userTwo, taskOne} from "./fixtures/db"
import app from "../dist/src/app"

beforeEach(async () => await setUpDatabase())

test("Should create task for user", async () => {
    const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'descriere'
        })
        .expect(201)
})

test("Should get all tasks for user", async () => {
    const res = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
    expect(res.body.length).toEqual(1)
})

test("Should fail deleting not yours task", async () => {
    const res = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)
})

test("Should succed deleting your task", async () => {
    const res = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})