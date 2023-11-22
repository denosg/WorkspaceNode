const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api")

const User = mongoose.model("User", {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

// const me = new User({
//     name: "Denis",
//     age: 'cacat',
// })

// me.save().then((me) => {
//     console.log(me);
// }).catch((err) => {
//     console.error(`Err: ${err}`);
// })

const Task = mongoose.model("Task", {
    description: {
        type: String
    },
    isDone: {
        type: Boolean
    }
})

const testTask = new Task({
    description: 'sex',
    isDone: false,
})

testTask.save().then((testTask) => {
    console.log(testTask);
}).catch((err) => {
    console.error(`Err: ${err}`);
})