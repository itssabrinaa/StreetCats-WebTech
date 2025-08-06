import csrf from "tiny-csrf";

if (!process.env.SC_CSRF_TOKEN_SECRET || process.env.SC_CSRF_TOKEN_SECRET.length < 32) {
  throw new Error("CSRF_SECRET environment variable must be at least 32 characters long");
}

// Middleware originale
const tinyCsrfMiddleware = csrf(process.env.SC_CSRF_TOKEN_SECRET, ["POST", "PUT", "DELETE", "PATCH"]);

// Middleware con logging
export const csrfMiddleware = (req, res, next) => {
  // Logga i dati rilevanti
  console.log("---- CSRF DEBUG ----");
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Header csrf-token:", req.headers['csrf-token']);
  console.log("Body _csrf:", req.body?._csrf);
  console.log('Signed Cookie _csrf:', req.signedCookies?._csrf);
  console.log("Cookie _csrf:", req.cookies?._csrf);
  console.log("---------------------");

  // Passa al middleware vero
  tinyCsrfMiddleware(req, res, next);
};
