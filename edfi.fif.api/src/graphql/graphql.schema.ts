
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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

export abstract class IQuery {
    abstract staff(): Staff[] | Promise<Staff[]>;

    abstract staffbyid(staffkey: string): Staff | Promise<Staff>;

    abstract sectionsbystaff(staffkey: string): Section[] | Promise<Section[]>;

    abstract sectionbystaff(staffkey: string, sectionkey?: string): Section | Promise<Section>;

    abstract studentbystaff(staffkey: string, studentschoolkey: string): StudentSchool | Promise<StudentSchool>;

    abstract studentsbystaff(staffkey: string): StudentSchool[] | Promise<StudentSchool[]>;

    abstract surveys(): Survey[] | Promise<Survey[]>;

    abstract survey(): Survey | Promise<Survey>;

    abstract surveysummary(sectionkey: string, title?: string): SurveySummary[] | Promise<SurveySummary[]>;

    abstract questions(): SurveySummaryQuestions[] | Promise<SurveySummaryQuestions[]>;
}

export class School {
    schoolkey?: string;
    schoolname?: string;
    schooltype?: string;
    schooladdress?: string;
    schoolcity?: string;
    schoolcounty?: string;
    schoolstate?: string;
    localeducationagencyname?: string;
    localeducationagencykey?: number;
    stateeducationagencyname?: string;
    stateeducationagencykey?: number;
    educationservicecentername?: string;
    educationservicecenterkey?: number;
}

export class Section {
    sectionkey?: string;
    schoolkey?: string;
    localcoursecode?: string;
    sessionname?: string;
    sectionidentifier?: string;
    schoolyear?: number;
    student?: StudentSchool;
    students?: StudentSchool[];
}

export class Staff {
    staffkey?: number;
    personaltitleprefix?: string;
    firstname?: string;
    middlename?: string;
    lastsurname?: string;
    staffuniqueid?: string;
    section?: Section;
    sections?: Section[];
}

export class StudentSchool {
    studentschoolkey?: string;
    studentkey?: string;
    schoolkey?: string;
    schoolname?: string;
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
    sectionkey?: number;
    surveykey?: number;
    title?: string;
    studentsanswered?: number;
    numberofquestions?: number;
    totalstudents?: number;
    questions?: SurveySummaryQuestions[];
}

export class SurveySummaryAnswers {
    sectionkey?: number;
    surveykey?: number;
    title?: string;
    surveyquestionkey?: number;
    question?: string;
    studentschoolkey?: number;
    studentname?: string;
    answer?: string;
}

export class SurveySummaryQuestions {
    surveykey?: number;
    title?: string;
    surveyquestionkey?: number;
    question?: string;
    answers?: SurveySummaryAnswers[];
}
