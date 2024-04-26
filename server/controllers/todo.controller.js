import Todo from '../models/Todo.model.js';

// Get all todos
const findAllTodos = async (req, res) => {
  try {
    // Retrieve all todos
    const allTodos = await Todo.find();
    // Send the list of all todos as a response
    res.status(200).json(allTodos);
  } catch (error) {
    // Handle errors
    console.error('Error retrieving todos:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const createNewTodo = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    // Check if the title is empty
    if (!title) {
      return res.status(400).json({ message: 'Title cannot be empty' });
    }

    // If title is not empty, proceed to create new todo
    const newTodo = await Todo.create({ title, description, status });
    res.status(201).json({ newTodo });
  } catch (error) {
    // In this case, we send error handling to the error handling middleware.
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    const updatedTodo = { _id: id, title, description, status };
    await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
    res.status(200).json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo was deleted successfully' });
  } catch (error) {
    console.log('Error while deleting a todo');
    next(error);
  }
};

export const todoController = {
  createNewTodo,
  findAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
