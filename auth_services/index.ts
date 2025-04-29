import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import routes from './routes/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT_URL_AUTH || 3001;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

// Routes

app.use(routes);
app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});