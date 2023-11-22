const mongoose = require('mongoose').default;
var validator = require('validator').default;

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api")

const userSChema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error(`Password cannot contain "password"`)
            }
        }
    },
    age: {
        default: 0,
        type: Number,
        validate(value) {
            if (value < 0) {
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
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    }
})

const User = mongoose.model("User", userSChema)

const me = new User({
    name: "   Casian ",
    age: 17,
    email: "casian@casian.com ",
    password: "Vaca123 "
})

// me.save().then((me) => {
//     console.log(me);
// }).catch((err) => {
//     console.error(`Err: ${err}`);
// })

const taskSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
            trim: true,
        },
        isDone: {
            type: Boolean,
            default: false,
        }
    }
)

const Task = mongoose.model("Task", taskSchema)

const testTask = new Task({
    description: 'sex',
    isDone: false,
})

testTask.save().then((testTask) => {
    console.log(testTask);
}).catch((err) => {
    console.error(`Err: ${err}`);
})