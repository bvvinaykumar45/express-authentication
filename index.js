import 'dotenv/config';
import express from 'express';

import userRouter from './routes/user.routes.js';
import { validateToken } from './middlewares/auth.middlewares.js';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.use(validateToken);

app.get('/', (req, res) => {
  return res.status(200).json({ status: 'Server is up and running' });
});

app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});