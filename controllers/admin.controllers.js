import db from "../db/index.js";
import { users } from "../db/schema.js";

export const getAllUsers = async (req, res) => {
  const fetchedUsers = await db.select().from(users);

  return res.status(200).json(fetchedUsers);
}