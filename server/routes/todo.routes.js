import express from 'express';
import { todoController } from '../controllers/todo.controller.js';

const todoRoutes = express.Router();

//  POST /api/todos  -  Creates new todo
todoRoutes.post('/todos', todoController.createNewTodo);

// GET /api/todos  -  Get all todos
todoRoutes.get('/todos', todoController.findAllTodos);

// GET /api/todos/:id  -  Get one todo by id
todoRoutes.get('/todos/:id', todoController.getTodoById);

// PUT /api/todos/:id  -  Edit todo details
todoRoutes.put('/todos/:id', todoController.updateTodo);

// DELETE /api/todos/:id  -  Delete todo
todoRoutes.delete('/todos/:id', todoController.deleteTodo);

export default todoRoutes;
