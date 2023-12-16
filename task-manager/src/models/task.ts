import mongoose from 'mongoose';

interface TaskInterface extends Document {
  description: string;
  isDone: boolean;
  owner: mongoose.Schema.Types.ObjectId;
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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, { timestamps: true });

const Task = mongoose.model<TaskInterface>('Task', taskSchema);

export default Task;
