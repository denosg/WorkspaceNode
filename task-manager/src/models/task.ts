import mongoose from 'mongoose';

interface TaskInterface extends Document {
  description: string;
  isDone: boolean;
}

const taskSchema = new mongoose.Schema<TaskInterface>({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

const Task = mongoose.model<TaskInterface>('Task', taskSchema);

export default Task;
