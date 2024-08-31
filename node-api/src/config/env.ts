export const env = {
  DB_URL: process.env.DB_URL || 'mongodb://root:example@mongo:27017/',
  PORT: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET || 's3cr3t@3MDA',
  username: process.env.USERNAME || 'admin',
  password: process.env.PASSWORD || 'admin',
  NODE_ENV: process.env.NODE_ENV || 'development'
}
