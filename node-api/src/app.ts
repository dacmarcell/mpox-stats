import fastify from 'fastify'
import jwt from 'jsonwebtoken'
import fastifyCookie from 'fastify-cookie'
import fastifyCors from '@fastify/cors'

import { env } from './config/env'
import { auth } from './middlewares/auth'
import { MongoClient } from 'mongodb'

async function startServer() {
  try {
    const app = fastify()
    app.register(fastifyCookie)
    app.register(fastifyCors, {
      credentials: true,
      origin: 'chrome-extension://lnllofjphpapnbfiflakamhkmajllpif'
    })

    const client = new MongoClient(env.DB_URL)
    await client.connect()
    const db = client.db(env.DB_NAME)

    app.addHook('preHandler', auth)

    app.post<{ Body: { username: string; password: string } }>(
      '/login',
      (req, reply) => {
        const { username, password } = req.body

        if (username === 'admin' && password === 'admin') {
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
            .send({ message: 'Login successful', token })
        } else {
          return reply.status(401).send({
            message: 'Wrong username or password'
          })
        }
      }
    )

    app.get('/data', async (_, reply) => {
      try {
        const collection = db.collection(env.collectionName)
        const res = await collection.find().limit(1).toArray()
        return reply.send(res[0])
      } catch (err) {
        console.error('Failed to fetch data:', err)
        return reply.status(500).send({ error: 'Failed to fetch data' })
      }
    })

    app.listen({ port: env.PORT }, () => {
      console.log(`Server listening on port ${env.PORT}`)
    })
  } catch (err) {
    console.error('Server startup error:', err)
    process.exit(1)
  }
}

startServer()
