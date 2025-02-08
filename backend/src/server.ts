import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import errorHandler from './error/error-handler';

const app = express();

app.use(express.json());
app.use(cors());

// app.use(router);

app.use(errorHandler);

app.listen(3333, () => console.log('listening...'));
