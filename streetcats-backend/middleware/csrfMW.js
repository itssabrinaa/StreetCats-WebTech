import csrf from "tiny-csrf";

// Ensure the CSRF_SECRET environment variable is set and secure
if (!process.env.SC_CSRF_TOKEN_SECRET || process.env.SC_CSRF_TOKEN_SECRET.length < 32) {
  throw new Error("CSRF_SECRET environment variable must be at least 32 characters long");
}

// Initialize CSRF middleware with enhanced configuration
export const csrfMiddleware = csrf(process.env.SC_CSRF_TOKEN_SECRET, ["POST", "PUT", "DELETE", "PATCH"]);


