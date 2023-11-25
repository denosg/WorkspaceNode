import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    isDone: {
        type: Boolean,
        default: false,
    }
});
const Task = mongoose.model("Task", taskSchema);
export default Task;
//# sourceMappingURL=task.js.map