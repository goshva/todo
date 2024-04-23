import { config } from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import { middlewareConfig } from './config/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import indexRoutes from './routes/index.routes.js';

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
config();

// ℹ️ --- DB ---
// Connects to the database
// package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose

// Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = 'mongodb://127.0.0.1:27017/ToDoApp';
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err);
  });

// ℹ️ Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// (logger, body-parser etc)
middlewareConfig(app);

// ℹ️ --- ROUTES ---
app.use('/api', indexRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
errorHandler(app);

// Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
export default app;
