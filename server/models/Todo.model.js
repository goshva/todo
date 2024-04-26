import { Schema, model } from 'mongoose';

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
const Todo = model('Todo', todoSchema);

export default Todo;
