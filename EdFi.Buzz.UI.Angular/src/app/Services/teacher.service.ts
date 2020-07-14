import { Injectable } from '@angular/core';
import { Teacher } from '../Models/teacher';
import { getStaffById, getStaffNameById } from './GraphQL/staffQueries';
import { Apollo } from 'apollo-angular';


@Injectable({ providedIn: 'root' })
export class TeacherApiService {
  controllerName = 'teacher';

  constructor(private apollo: Apollo) {
  }

  async getTeacher(): Promise<Teacher> {
    const client = this.apollo.getClient();
    const { data } = await client.query({ query: getStaffById, variables: { staffkey: 95695 } });
    const staff = data.staffbyid;
    const teacher: Teacher = <Teacher>staff;

    return teacher;
  }

  async getStaffNameByKey(staffKey:number){
    const client = this.apollo.getClient();
    const { data } = await client.query({ query: getStaffNameById, variables: { staffkey: staffKey } });
    const staff = data.staffbyid;
    const teacher: Teacher = <Teacher>staff;

    return teacher;
  }
}
