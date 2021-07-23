import { Field, ID, ObjectType } from 'type-graphql'
import { Comment } from './Comment'
import { Follower } from './Follower'
import { Post } from './Post'

@ObjectType()
export class User {
  @Field((_type) => ID)
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  email: string

  password: string

  @Field((_type) => [Post])
  posts: Post[]

  @Field((_type) => [Comment])
  comments: Comment[]

  @Field({ nullable: true })
  bio?: string

  @Field((_type) => [Follower])
  followers: Follower[]

  @Field((_type) => [Follower])
  following: Follower[]

  @Field()
  createdAt: Date

  @Field()
  updatedAt: Date
}
