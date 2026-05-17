import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from './env'
import { users } from '../modules/user'

// 1. Crear el cliente de base de datos
const client = postgres(env.DATABASE_URL)

// 2. Unificar todos los esquemas en un solo objeto
const schema = {
  ...users
}

// 3. Inicializar Drizzle
export const db = drizzle(client, { schema })
