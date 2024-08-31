import fastify from 'fastify'
import jwt from 'jsonwebtoken'
import fastifyCookie from 'fastify-cookie'

import { Database } from './db'
import { env } from './config/env'
import { auth } from './middlewares/auth'

const app = fastify()

app.register(fastifyCookie)

async function startServer() {
  try {
    const db = Database.getInstance()
    await db.getRepo()

    app.register(fastifyCookie)

    app.post<{ Body: { username: string; password: string } }>(
      '/login',
      (req, reply) => {
        const { username, password } = req.body

        if (username === env.username && password === env.password) {
          const token = jwt.sign({ username }, env.jwtSecret, {
            expiresIn: '30m'
          })

          return reply
            .setCookie('token', token, {
              path: '/',
              httpOnly: true,
              secure: env.NODE_ENV === 'production',
              maxAge: 30 * 60, // 30min
              sameSite: 'strict'
            })
            .send({ message: 'Login successful' })
        } else {
          return reply
            .status(401)
            .send({ message: 'Wrong username or password' })
        }
      }
    )

    app.addHook('preHandler', auth)

    app.get('/data', async (_, reply) => {
      try {
        const db = Database.getInstance()
        const repo = db.getRepo()

        const docs = await repo.find()
        return reply.send(docs)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        return reply.status(500).send({ error: 'Failed to fetch data' })
      }
    })

    await app.listen({ port: env.PORT })
    console.log(`Server listening on port ${env.PORT}`)
  } catch (err) {
    console.error('Server startup error:', err)
    process.exit(1)
  }
}

startServer()
