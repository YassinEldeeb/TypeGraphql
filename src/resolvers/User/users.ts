import { Prisma } from '@prisma/client'
import { Arg, Ctx, Query, Resolver } from 'type-graphql'
import { User } from '../../models/User'
import { MyContext } from '../../types/MyContext'
import { Select } from '../shared/selectParamDecorator'

@Resolver()
class UsersResolver {
  @Query((_returns) => [User])
  async users(
    @Arg('query', { nullable: true }) searchQuery: string,
    @Ctx() { prisma, req }: MyContext,
    @Select() select: any
  ): Promise<User[]> {
    let where: Prisma.UserWhereInput = {}
    const query = searchQuery?.toLowerCase()

    if (query) {
      where = {
        OR: [
          {
            name: {
              contains: query,
            },
          },
          {
            email: {
              contains: query,
            },
          },
        ],
      }
    }

    return prisma.user.findMany({
      where,
      select,
    }) as any
  }
}

export { UsersResolver }
