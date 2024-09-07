import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'
import { JwtPayload } from '../types'
import { routes } from '../app'

export async function auth(req: FastifyRequest, reply: FastifyReply) {
  if (req.url === routes.login || req.url === routes.health) {
    return
  }

  const authorization =
    req.headers['authorization']?.split(' ')[1] || req.cookies.token

  if (!authorization) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(authorization, env.jwtSecret) as JwtPayload
    req.user = decoded
  } catch (err) {
    return reply.status(401).send({ message: 'Invalid token' })
  }
}
