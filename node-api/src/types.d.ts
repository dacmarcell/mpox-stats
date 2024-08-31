import 'fastify'

interface JwtPayload {
  username: string
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: JwtPayload
  }
}
