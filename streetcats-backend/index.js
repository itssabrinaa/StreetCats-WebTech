import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import 'dotenv/config.js';

import { csrfMiddleware } from "./middleware/csrfMW.js";
import { authenticationRouter } from "./routes/authenticationRouter.js";
import { catRouter } from "./routes/catRouter.js";
import { commentRouter } from "./routes/commentRouter.js";

const app = express();
const PORT = process.env.SC_PORT || 3000;

//Middleware per log
app.use(morgan('dev'));

//Route per servire immagini statiche
app.use('/cat-images', express.static(process.env.SC_IMAGES_PATH));

//Specifica che il contenuto può essere acceduto da qualunque origine con protocollo->http e host->localhost
const corsOptions = { origin: 'http://localhost' };
app.use(cors(corsOptions));

//Middleware richiesto da tiny-csrf
app.use(cookieParser(process.env.SC_CSRF_TOKEN_SECRET));

//Middleware per il parsing di json
app.use(express.json());

//Integrazione Swagger per generare e visualizzare la documentazione dell'api
const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'StreetCats API',
      version: '0.0.1',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      
    }
  },
  apis: ['./routes/*Router.js'],
});


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//Routes e middlewares
app.use(authenticationRouter);
app.use(catRouter);
app.use(commentRouter);


//Middleware e route per CSRF 
app.use(csrfMiddleware);
app.get("/csrf-token", (req, res) => {
  const token = req.csrfToken();
  res.cookie('_csrf', token, { signed: true, httpOnly: false, secure: false });
  res.json({ csrfToken: token });
});

//Error handler generico
app.use( (err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500)
  res.json({error: `${err.message}`});
});

app.listen(PORT, () => {
  console.log(`Benvenuti su StreetCats: http://localhost:${PORT}`);
});