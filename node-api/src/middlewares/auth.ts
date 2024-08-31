import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

import { env } from '../config/env'
import { JwtPayload } from '../types'

export async function auth(req: FastifyRequest, reply: FastifyReply) {
  if (req.url === '/login') {
    return
  }

  const token = req.cookies.token

  if (!token) {
    reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    jwt.verify(token, env.jwtSecret, (err, decoded) => {
      if (err) {
        return reply.status(401).send({ message: 'Invalid token' })
      }

      req.user = decoded as JwtPayload
    })
  } catch (err) {
    return reply.status(401).send({ message: 'Invalid token' })
  }
}
