import { pgTable, uuid, varchar, text, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['ADMIN', 'USER']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', {length: 64}).notNull(),
  email: varchar('email', {length: 128}).notNull().unique(),
  password: text('password').notNull(),
  salt: text('salt').notNull(),
  role: userRoleEnum().notNull().default("USER")
});

export const userSessions = pgTable('user_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});
