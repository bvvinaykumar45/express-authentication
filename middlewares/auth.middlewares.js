import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

import db from "../db/index.js";
import { users } from "../db/schema.js";

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const validateToken = async (req, res, next) => {
  const authString = req.headers["authorization"];
  const token = authString?.split(' ')[1];

  if (!token) {
    return next();
  }

  const user = await jwt.verify(token, JWT_SECRET);

  if (!user) {
    return next();
  }

  req.user = user;
  next();
};