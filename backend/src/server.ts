import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import path from 'path';
import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';

const app = express();

//Cors
app.use(cors());

// Json
app.use(express.json());

// Routes
app.use(routes);

// Uploads
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Error Hanlder
app.use(errorHandler);

// Run
app.listen(3333, () => {
    console.log("Server running at port 3333");
});