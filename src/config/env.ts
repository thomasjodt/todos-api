import { t } from 'elysia'
import { TypeCompiler } from '@sinclair/typebox/compiler'

// 1. Define the schema.
/**
 * Environment variables schema.
 * this is used to validate the environment variables and ensure they are of the correct type.
 * this also helps in type safety and autocompletion.
 */
const EnvSchema = t.Object({
  PORT: t.Numeric(),
  NODE_ENV: t.Union(
    [t.Literal('development'), t.Literal('production')]
  ),
  DATABASE_URL: t.String(),
  JWT_ACCESS_SECRET: t.String(),
  JWT_REFRESH_SECRET: t.String()
})

// 2. Compile the schema.
const compiler = TypeCompiler.Compile(EnvSchema)

// 3. Transform and validate the environment variables.
try {
  compiler.Decode(process.env)
}

// 4. If validation fails, extract the errors and throw an error.
catch (error) {
  console.error('ERROR: Invalid environment variables')
  const errors = [...compiler.Errors(error)]
  errors.forEach((error) => {
    const path = error.path.replace('/', '')
    console.error(`  - [${path}]: ${error.message} (Received value: "${error.value}")`)
  })

  process.exit(1)
}

// 5. Export the cleaned environment variables with static type safety ready to use.
const envCleaned = compiler.Decode(process.env)
export const env = envCleaned
