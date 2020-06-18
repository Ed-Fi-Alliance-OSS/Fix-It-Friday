import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import StaffResolvers from '../resolvers/staff.resolver';
import StaffService from '../services/staff.service';
import StaffEntity from '../entities/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity])],
  providers: [StaffService, StaffResolvers],
})
export default class StaffModule {}
