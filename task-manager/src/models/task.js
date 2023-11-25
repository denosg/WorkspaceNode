const mongoose = require('mongoose').default;

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

module.exports = Task;