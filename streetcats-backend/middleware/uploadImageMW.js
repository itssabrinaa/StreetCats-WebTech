import multer from "multer";
import { createHttpError } from "../utils/errorFormatter.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.SC_IMAGES_PATH);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

export const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(createHttpError(400, "Richiesta non valida, solo immagini permesse."));
    }
    cb(null, true);
  }
});