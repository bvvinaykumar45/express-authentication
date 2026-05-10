import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('App is running'); 
});

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});