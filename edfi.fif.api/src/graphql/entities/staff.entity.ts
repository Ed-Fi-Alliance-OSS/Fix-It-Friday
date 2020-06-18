import { Entity, Column, PrimaryColumn, ManyToMany, JoinTable } from 'typeorm';
import SectionEntity from './section.entity';

@Entity({ schema: 'fif', name: 'staff', synchronize: false })
export default class StaffEntity {
  @PrimaryColumn() staffkey: number;

  @Column() personaltitleprefix: string;

  @Column() firstname: string;

  @Column() middlename: string;

  @Column() lastsurname: string;

  @Column() staffuniqueid: string;

  @ManyToMany(() => SectionEntity, section => section.sectionkey)
  @JoinTable()
  sections?: SectionEntity[];
}
