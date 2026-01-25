import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, IsBoolean } from 'class-validator';

@InputType()
export class CreateLeadInput {
  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true, defaultValue: false })
  @IsOptional()
  @IsBoolean()
  subscribed?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  source?: string;
}
