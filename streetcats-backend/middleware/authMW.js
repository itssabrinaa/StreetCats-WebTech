import { AuthController } from "../controllers/AuthController.js";
import { createHttpError } from "../utils/errorFormatter.js";



export function enforceAuthentication(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader?.split(' ')[1];
  if(!token){
    return next(createHttpError(401, "Utente non autorizzato, è necessario fornire il token."));
  }

  AuthController.isTokenValid(token, (err, decodedToken) => {
    if(err){
      return next(createHttpError(401, "Utente non autorizzato, il token fornito non è valido."));
    } else {
      req.userEmail = decodedToken.email;
      next();
    }
  });
}