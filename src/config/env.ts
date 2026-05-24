export class EnvironmentValidator {
  // List of environment variables.
  public PORT: number
  public NODE_ENV: string
  public DATABASE_URL: string
  public JWT_ACCESS_SECRET: string
  public JWT_REFRESH_SECRET: string

  constructor(env: typeof Bun.env) {
    // 1. Get the environment variables.
    const port: string | number = env.PORT ?? 3000
    const nodeEnv: string = env.NODE_ENV ?? 'development'

    const databaseURL: string | undefined = env.DATABASE_URL
    const jwtAccessSecret: string | undefined = env.JWT_ACCESS_SECRET
    const jwtRefreshSecret: string | undefined = env.JWT_REFRESH_SECRET

    // 2. Validate the required environment variables.
    const requiredEnvVars = { databaseURL, jwtAccessSecret, jwtRefreshSecret }
    const isMissingRequiredVar: boolean = Object.values(requiredEnvVars)
      .some((envVar) => envVar === undefined)

    if (isMissingRequiredVar) {
      const missingVars: string[] = Object.entries(requiredEnvVars)
        .filter((env) => env[1] === undefined)
        .map((env) => env[0])

      missingVars.forEach((missingVar) => {
        console.error(`ERROR: Missing required ${missingVar} environment variable`)
      })
      process.exit(1)
    }

    // 3. Validate correct values for variables.

    // 3.1. Validation for PORT
    if (isNaN(Number(port))) {
      console.error('ERROR: Invalid PORT environment variable')
      process.exit(1)
    }

    // 3.2. Validation for NODE_ENV
    const environments = ['development', 'production']
    if (!environments.includes(nodeEnv)) {
      console.error('ERROR: Invalid NODE_ENV environment variable')
      process.exit(1)
    }

    // 4. Assign the validated environment variables to the class properties.
    this.PORT = Number(port)
    this.NODE_ENV = nodeEnv

    this.DATABASE_URL = requiredEnvVars.databaseURL as string
    this.JWT_ACCESS_SECRET = requiredEnvVars.jwtAccessSecret as string
    this.JWT_REFRESH_SECRET = requiredEnvVars.jwtRefreshSecret as string
  }
}

export const env = new EnvironmentValidator(Bun.env)
