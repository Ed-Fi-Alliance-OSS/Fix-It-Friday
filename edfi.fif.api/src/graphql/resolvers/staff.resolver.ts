import { Args, Query, Resolver } from '@nestjs/graphql';
import { Staff } from '../graphql.schema';
import StaffService from '../services/staff.service';

@Resolver('Staff')
export default class StaffResolvers {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly staffService: StaffService) {}

  @Query()
  async staffs(): Promise<Staff[]> {
    return this.staffService.findAll();
  }

  @Query('staff')
  async findOneById(
    @Args('staffkey')
    staffkey: number,
  ): Promise<Staff> {
    return this.staffService.findOneById(staffkey);
  }
}
