import jwt from 'jsonwebtoken'
import { createMethodDecorator } from 'type-graphql'
import { prisma } from '../prisma'
import { MyContext } from '../types/MyContext'

const authFailed = (throwError: boolean = true, context: MyContext) => {
  if (throwError) {
    throw new Error('Not authenticated!')
  } else {
    return
  }
}

export function Auth(options?: { throwError: boolean }) {
  const throwError = options?.throwError

  return createMethodDecorator<MyContext>(async ({ context, args }, next) => {
    const authorization = context.req.headers['authorization']

    if (!authorization) {
      authFailed(throwError, context)
    }

    try {
      const token = authorization!.split(' ')[1]
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any
      const user = await prisma.user.findUnique({
        where: { id: payload.id },
        select: { tokenVersion: true },
      })

      if (!user || payload.tokenVersion !== user.tokenVersion) {
        authFailed(throwError, context)
      }

      context.userId = payload.id
    } catch (error: any) {
      console.log(error.message)
      authFailed(throwError, context)
    }

    return next()
  })
}