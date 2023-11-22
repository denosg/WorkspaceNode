const mongoose = require('mongoose').default;
var validator = require('validator').default;

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api")

const User = mongoose.model("User", {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        default: 0,
        type: Number,
        validate(value) {
            if(value < 0){
                throw new Error("Age must be positive number")
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    }
})

const me = new User({
    name: "   Casian ",
    age: 17,
    email: "casian@casian.com "
})

me.save().then((me) => {
    console.log(me);
}).catch((err) => {
    console.error(`Err: ${err}`);
})

const Task = mongoose.model("Task", {
    description: {
        type: String,
        required: true,
    },
    isDone: {
        type: Boolean
    }
})

// const testTask = new Task({
//     description: 'sex',
//     isDone: false,
// })

// testTask.save().then((testTask) => {
//     console.log(testTask);
// }).catch((err) => {
//     console.error(`Err: ${err}`);
// })