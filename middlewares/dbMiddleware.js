import { getDB } from "../database/db.js";

const dbMiddleware = (req, res, next) => {
  const db = getDB();
  if (!db) {
    res.status(500).json({ message: "Database not connected" });
    return;
  }
  req.db = db; // Attach the db to the request object
  next(); // Continue to the next middleware/route handler
};

export default dbMiddleware;
