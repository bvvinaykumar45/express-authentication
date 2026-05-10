import { pgTable, uuid, varchar, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({length: 64}).notNull(),
  email: varchar({length: 128}).notNull().unique(),
  password: text().notNull(),
  salt: text()
});
