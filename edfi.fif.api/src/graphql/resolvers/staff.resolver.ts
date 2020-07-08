import { Args, Parent, Query, Resolver, ResolveProperty } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { Staff, Section, StudentSchool } from '../graphql.schema';
import StaffService from '../services/staff.service';
import ValidateStaffIdGuard from '../guards/validateStaffId.guard';

@Resolver('Staff')
export default class StaffResolvers {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly staffService: StaffService) {}

  @Query('staff')
  async staffs(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  @Query('staffbyemail')
  async staffByEmail(
    @Args('staffemail')
    staffemail: string,
  ): Promise<Staff> {
    return this.staffService.findOneByEmail(staffemail);
  }

  @Query('staffbyid')
  async staffById(
    @Args('staffkey')
    staffkey: number,
  ): Promise<Staff> {
    return this.staffService.findOneById(staffkey);
  }

  @Query('sectionsbystaff')
  @UseGuards(ValidateStaffIdGuard)
  async findSectionByStaff(
    @Args('staffkey')
    staffkey: number,
    @Args('sectionkey')
    sectionkey: string,
  ): Promise<Section> {
    return this.staffService.findSectionByStaff(staffkey, sectionkey);
  }

  @Query('sectionsbystaff')
  @UseGuards(ValidateStaffIdGuard)
  async findSectionsByStaff(
    @Args('staffkey')
    staffkey: number,
  ): Promise<Section[]> {
    return this.staffService.findSectionsByStaff(staffkey);
  }

  @Query('studentsbystaff')
  async findStudentsByStaff(
    @Args('staffkey')
    staffkey: number,
  ): Promise<StudentSchool[]> {
    return this.staffService.findStudentsByStaff(staffkey);
  }

  @Query('studentbystaff')
  async findStudentByStaff(
    @Args('staffkey')
    staffkey: number,
    @Args('studentschoolkey')
    studentschoolkey: string,
  ): Promise<StudentSchool> {
    return this.staffService.findStudentByStaff(staffkey, studentschoolkey);
  }

  @ResolveProperty('sections')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async sections(@Parent() parent): Promise<Section[]> {
    return this.staffService.findSectionsByStaff(parent.staffkey);
  }

  @ResolveProperty('section')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async section(
    @Parent() parent,
    @Args('sectionkey')
    sectionkey: string,
  ): Promise<Section> {
    return this.staffService.findSectionByStaff(parent.staffkey, sectionkey);
  }
}
