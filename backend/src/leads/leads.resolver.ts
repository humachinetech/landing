import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { LeadsService } from './leads.service';
import { Lead } from './entities/lead.entity';
import { CreateLeadInput } from './dto/create-lead.input';
import { UpdateLeadInput } from './dto/update-lead.input';

@Resolver(() => Lead)
export class LeadsResolver {
  constructor(private readonly leadsService: LeadsService) {}

  @Mutation(() => Lead)
  createLead(@Args('createLeadInput') createLeadInput: CreateLeadInput) {
    return this.leadsService.create(createLeadInput);
  }

  @Query(() => [Lead], { name: 'leads' })
  findAll() {
    return this.leadsService.findAll();
  }

  @Query(() => Lead, { name: 'lead' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.leadsService.findOne(id);
  }

  @Mutation(() => Lead)
  updateLead(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateLeadInput') updateLeadInput: UpdateLeadInput,
  ) {
    return this.leadsService.update(id, updateLeadInput);
  }

  @Mutation(() => Lead)
  removeLead(@Args('id', { type: () => ID }) id: string) {
    return this.leadsService.remove(id);
  }
}
