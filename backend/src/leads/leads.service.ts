import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lead, LeadDocument } from './schemas/lead.schema';
import { CreateLeadInput } from './dto/create-lead.input';
import { UpdateLeadInput } from './dto/update-lead.input';

@Injectable()
export class LeadsService {
  constructor(@InjectModel(Lead.name) private leadModel: Model<LeadDocument>) {}

  async create(createLeadInput: CreateLeadInput): Promise<Lead> {
    const createdLead = new this.leadModel(createLeadInput);
    return createdLead.save();
  }

  async findAll(): Promise<Lead[]> {
    return this.leadModel.find().exec();
  }

  async findOne(id: string): Promise<Lead> {
    return this.leadModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<Lead> {
    return this.leadModel.findOne({ email }).exec();
  }

  async update(id: string, updateLeadInput: UpdateLeadInput): Promise<Lead> {
    return this.leadModel
      .findByIdAndUpdate(id, updateLeadInput, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Lead> {
    return this.leadModel.findByIdAndDelete(id).exec();
  }
}
