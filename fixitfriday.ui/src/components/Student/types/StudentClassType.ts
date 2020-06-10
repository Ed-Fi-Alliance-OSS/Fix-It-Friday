export enum AccessEnum {
  Email = 'Email',
  GoogleClassroom = 'Google Classroom',
  Internet = 'Internet',
  Phone = 'Phone',
}

export type GuardianInformationType = {
  name: string;
  email: string;
  phone: string;
  address: string;
  relationship: string;
  preferredContactMethod: string;
  bestTimeToContact: string;
  contactNotes: string;
};

export type StudentClassType = {
  studentschoolkey: string;
  studentfirstname: string;
  studentlastname: string;
  studentmiddlename: string;
  pictureurl: string;
  email: string;
  guardianInformation: GuardianInformationType;
  access: Array<AccessEnum>;
};
