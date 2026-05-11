import { randomBytes, createHmac } from "node:crypto";
import { eq } from "drizzle-orm";

import db from "../db/index.js";
import { users } from "../db/schema.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || name === "") {
    return res.status(400).json({ error: "name is required" });
  }

  const [existingUser] = await db
    .select({
      email: users.email,
    })
    .from(users)
    .where((table) => eq(table.email, email));

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `user with email ${email} already exists!` });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({ id: users.id });

  return res.status(201).json({ status: "success", data: { userId: user.id } });
};
