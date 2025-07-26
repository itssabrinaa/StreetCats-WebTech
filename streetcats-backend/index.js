import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import 'dotenv/config.js';



const app = express();
const PORT = process.env.PORT;

app.use(morgan('dev'));

//Specifica che il contenuto può essere acceduto da qualunque origine con protocollo->http e host->localhost
const corsOptions = { origin: 'http://localhost'};

app.use(cors(corsOptions));

app.use(express.json());

//error handler generico, per gli errori non previsti
app.use( (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500).json({
    code: err.status || 500,
    description: err.message || "Errore. Riprovare più tardi."
  });
});

//integrazione Swagger per generare e visualizzare la documentazione dell'api
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'StreetCats API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*Router.js'],
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));


app.listen(PORT, () => {
  console.log(`Benvenuti su StreetCats: http://localhost:${PORT}`);
});