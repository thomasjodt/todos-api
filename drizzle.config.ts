import { defineConfig } from 'drizzle-kit'
import { env } from '@/config'

export default defineConfig({
  dialect: 'postgresql',
  schema: ['./src/modules/**/*.schema.ts'],
  out: './drizzle/migrations',
  dbCredentials: {
    url: env.DATABASE_URL
  }
})
