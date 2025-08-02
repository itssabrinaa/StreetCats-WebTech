import { validationResult } from 'express-validator';
import { createHttpError } from '../utils/errorFormatter.js';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createHttpError(400, "Richiesta non valida. Riprovare.");
  }
  next();
};
