import { defineConfig } from 'drizzle-kit';

const config = defineConfig({
  out: './drizzle',
  schema: './db/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  casing: 'snake_case'
});

export default config;