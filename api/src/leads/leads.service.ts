import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadInput } from './dto/create-lead.input';
import { UpdateLeadInput } from './dto/update-lead.input';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private readonly leadRepo: Repository<Lead>,
  ) {}

  async create(createLeadInput: CreateLeadInput): Promise<Lead> {
    const lead = this.leadRepo.create(createLeadInput);
    return this.leadRepo.save(lead);
  }

  async findAll(): Promise<Lead[]> {
    return this.leadRepo.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Lead | null> {
    const n = parseInt(id, 10);
    if (Number.isNaN(n)) return null;
    return this.leadRepo.findOne({ where: { id: n } });
  }

  async findByEmail(email: string): Promise<Lead | null> {
    return this.leadRepo.findOne({ where: { email } });
  }

  async update(id: string, updateLeadInput: UpdateLeadInput): Promise<Lead> {
    const n = parseInt(id, 10);
    if (Number.isNaN(n)) throw new Error('Invalid id');
    await this.leadRepo.update(n, updateLeadInput as Partial<Lead>);
    const updated = await this.leadRepo.findOne({ where: { id: n } });
    if (!updated) throw new Error('Lead not found');
    return updated;
  }

  async remove(id: string): Promise<Lead> {
    const lead = await this.findOne(id);
    if (!lead) throw new Error('Lead not found');
    await this.leadRepo.remove(lead);
    return lead;
  }
}
