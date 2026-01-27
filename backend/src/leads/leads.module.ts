import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lead } from './entities/lead.entity';
import { LeadsResolver } from './leads.resolver';
import { LeadsService } from './leads.service';

@Module({
  imports: [TypeOrmModule.forFeature([Lead])],
  providers: [LeadsResolver, LeadsService],
})
export class LeadsModule {}
