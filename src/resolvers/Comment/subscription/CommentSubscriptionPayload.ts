import { Field, ObjectType } from 'type-graphql'
import { MutationType } from '../../../enums/mutationType'
import { Comment } from '../../../models/Comment'

@ObjectType()
export class CommentSubscriptionPayload {
  @Field((_type) => MutationType)
  mutation: MutationType

  @Field({ nullable: true })
  data: Comment
}
