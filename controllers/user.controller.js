import { randomBytes, createHmac } from "node:crypto";
import { eq } from "drizzle-orm";

import db from "../db/index.js";
import { users, userSessions } from "../db/schema.js";

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

export const login = async (req, res) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: users.id,
      email: users.email,
      password: users.password,
      salt: users.salt,
    })
    .from(users)
    .where((table) => eq(table.email, email));

  if (!existingUser) {
    return res
      .status(404)
      .json({ error: `User with email ${email} does not exists!` });
  }

  const salt = existingUser.salt;
  const existingHash = existingUser.password;

  const newHash = createHmac("sha256", salt).update(password).digest("hex");

  if (newHash !== existingHash) {
    return res.status(400).json({ error: "Incorrect passoword!" });
  }

  // Generate a session for user
  const [session] = await db
    .insert(userSessions)
    .values({
      userId: existingUser.id,
    })
    .returning({ id: userSessions.id });

  return res.status(200).json({ status: `success`, sessionId: session.id });
};
