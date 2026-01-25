import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Lead {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  name?: string;

  @Field()
  subscribed: boolean;

  @Field({ nullable: true })
  source?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
