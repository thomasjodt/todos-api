import { defineConfig } from 'drizzle-kit'
import { env } from './src/config'

export default defineConfig({
  schema: './src/modules/**/*.schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  }
})
