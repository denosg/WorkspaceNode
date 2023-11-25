const mongoose = require('mongoose').default;

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api")

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