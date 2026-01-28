import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateLeadInput } from './create-lead.input';

@InputType()
export class UpdateLeadInput extends PartialType(CreateLeadInput) {}
