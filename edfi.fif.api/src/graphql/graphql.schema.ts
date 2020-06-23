/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export abstract class IQuery {
    abstract staff(): Staff[] | Promise<Staff[]>;

    abstract sectionsbystaff(staffkey: string): Staff | Promise<Staff>;

    abstract sections(): Section[] | Promise<Section[]>;

    abstract section(sectionkey: string): Section | Promise<Section>;

    abstract students(): StudentSchool[] | Promise<StudentSchool[]>;

    abstract student(studentschoolkey: string): StudentSchool | Promise<StudentSchool>;

    abstract surveys(): Survey[] | Promise<Survey[]>;

    abstract survey(): Survey | Promise<Survey>;

    abstract surveysummary(title?: string): SurveySummary[] | Promise<SurveySummary[]>;

    abstract surveysummarybysection(sectionkey: string, title?: string): SurveySummaryBySection[] | Promise<SurveySummaryBySection[]>;
}

export class Section {
    sectionkey?: string;
    schoolkey?: string;
    localcoursecode?: string;
    sessionname?: string;
    sectionidentifier?: string;
    schoolyear?: number;
    students?: StudentSchool[];
}

export class StudentSchool {
    studentschoolkey?: string;
    studentkey?: string;
    schoolkey?: string;
    schoolyear?: string;
    studentfirstname?: string;
    studentmiddlename?: string;
    studentlastname?: string;
    enrollmentdatekey?: string;
    gradelevel?: string;
    limitedenglishproficiency?: string;
    ishispanic?: boolean;
    sex?: string;
    pictureurl?: string;
    contacts?: ContactPerson[];
    siblingscount?: number;
    siblings?: StudentSchool[];
}

export class Staff {
    staffkey?: number;
    personaltitleprefix?: string;
    firstname?: string;
    middlename?: string;
    lastsurname?: string;
    staffuniqueid?: string;
    sections?: Section[];
}

export class StudentSection {
    studentsectionkey?: string;
    studentschoolkey?: string;
    studentkey?: string;
    sectionkey?: string;
    localcoursecode?: string;
    subject?: string;
    coursetitle?: string;
    teachername?: string;
    studentsectionstartdatekey?: string;
    studentsectionenddatekey?: string;
    schoolkey?: string;
    schoolyear?: string;
}

export class Survey {
    surveykey?: string;
    title?: string;
}

export class SurveySummary {
    surveykey?: string;
    title?: string;
    studentsanswered?: number;
    numberofquestions?: number;
    totalstudents?: number;
}

export class SurveySummaryBySection {
    sectionkey?: string;
    surveykey?: string;
    title?: string;
    studentsanswered?: number;
    numberofquestions?: number;
    totalstudents?: number;
}

export class ContactPerson {
    uniquekey?: string;
    contactpersonkey?: string;
    studentkey?: string;
    contactfirstname?: string;
    contactlastname?: string;
    relationshiptostudent?: string;
    streetnumbername?: string;
    apartmentroomsuitenumber?: string;
    state?: string;
    postalcode?: string;
    phonenumber?: string;
    primaryemailaddress?: string;
    isprimarycontact?: boolean;
    preferredcontactmethod?: string;
    besttimetocontact?: string;
    contactnotes?: string;
}
