import express from "express";
import morgan from "morgan";
import cors from "cors";
import 'dotenv/config.js';

const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));

const corsOptions = { origin: 'http://localhost'};

app.use(cors(corsOptions));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Welcome to StreetCats, running on http://localhost:${PORT}`);
});