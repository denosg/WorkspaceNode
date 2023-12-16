import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import User from "../../dist/src/models/user"
import Task from "../../dist/src/models/task"

const userOneId = new mongoose.Types.ObjectId()
const userTwoId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: 'ceva',
    email: 'ceva@ceva.com',
    password: 'ceva1234',
    tokens: [{
        token: jwt.sign({ _id: userOneId._id }, process.env.JWT_SECRET)
    }]
}

const userTwo = {
    _id: userTwoId,
    name: '2ceva2',
    email: '2ceva2@ceva.com',
    password: 'ceva1234',
    tokens: [{
        token: jwt.sign({ _id: userTwoId._id }, process.env.JWT_SECRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "taskOne description",
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "taskTwo description",
    owner: userTwoId,
    isDone: true
}

const setUpDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
}

module.exports = {
    userOneId,
    userOne,
    setUpDatabase,
}