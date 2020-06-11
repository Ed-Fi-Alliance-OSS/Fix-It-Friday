import {
  StudentDetailType,
  StudentDetailSurveyType,
} from "../types/StudentDetailTypes";

const surveys: Array<StudentDetailSurveyType> = [
  {
    id: "1",
    name: "Contact Survey Results",
    date: "3/15/2020",
    questions: [
      {
        id: "1",
        question: "Preferred Contact Method",
        answer: "Phone",
      },
      {
        id: "2",
        question: "Best time to Contact",
        answer: "6 am to 9pm (after work)",
      },
      {
        id: "3",
        question: "Contact Notes",
        answer: "Leave a message and they will call back",
      },
    ],
  },
  {
    id: "2",
    name: "Eating Survey Results",
    date: "1/1/2020",
    questions: [
      {
        id: "1",
        question: "Food Allergies",
        answer: "(none)",
      },
      {
        id: "2",
        question: "Eating times",
        answer: "Unrestricted",
      },
    ],
  },
];

const allStudents: Array<StudentDetailType> = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    middleName: "1",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "jdoe@test.com",
    surveys,
    hasEmail: false,
    hasAccessToGoogleClassroom: true,
    hasInternetAccess: true,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Mary",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Test",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Jim",
        relationship: "Father",
        isPrimary: false,
        lastName: "Doe",
        phone: "512-555-3434",
        address: "123 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Grandma",
        relationship: "Grandparent",
        isPrimary: false,
        lastName: "Doe",
        phone: "512-555-5656",
        address: "498 Oak Dr, Austin, TX, USA 78745",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
    siblings: [
      {
        id: "1",
        firstName: "Danny",
        lastName: "Carey",
        gradeLevel: "5th Grade",
        school: "Hopewell Elementary",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Jim",
        lastName: "Morrison",
        gradeLevel: "11th Grade",
        school: "Magic High School",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Dave",
        lastName: "Gahan",
        gradeLevel: "10th Grade",
        school: "Lumberton Primary School",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "4",
        firstName: "Robert",
        lastName: "Plant",
        gradeLevel: "2nd Grade",
        school: "Lumberton Primary School",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
  {
    id: "2",
    firstName: "Richard",
    lastName: "Roe",
    middleName: "2",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "rroe@test.com",
    surveys,
    hasEmail: false,
    hasAccessToGoogleClassroom: false,
    hasInternetAccess: false,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Julie",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Roe",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
    siblings: [
      {
        id: "1",
        firstName: "Danny",
        lastName: "Carey",
        gradeLevel: "5th Grade",
        school: "Hopewell Elemenraty",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
  {
    id: "3",
    firstName: "George",
    lastName: "Lucas",
    middleName: "3",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "glucas@test.com",
    surveys,
    hasEmail: true,
    hasAccessToGoogleClassroom: false,
    hasInternetAccess: true,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Francis",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Lucas",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Bill",
        relationship: "Father",
        isPrimary: false,
        lastName: "Lucas",
        phone: "512-555-3434",
        address: "123 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
    siblings: [
      {
        id: "1",
        firstName: "Danny",
        lastName: "Carey",
        gradeLevel: "5th Grade",
        school: "Hopewell Elemenraty",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Jim",
        lastName: "Morrison",
        gradeLevel: "11th Grade",
        school: "Magic High School",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
  {
    id: "4",
    firstName: "John",
    lastName: "Doe",
    middleName: "4",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "jdoe@test.com",
    surveys,
    hasEmail: true,
    hasAccessToGoogleClassroom: true,
    hasInternetAccess: true,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Mother",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Test",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Father",
        relationship: "Father",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-3434",
        address: "123 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Grandma",
        relationship: "Grandparent",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-5656",
        address: "498 Oak Dr, Austin, TX, USA 78745",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
    siblings: [
      {
        id: "1",
        firstName: "Danny",
        lastName: "Carey",
        gradeLevel: "5th Grade",
        school: "Hopewell Elemenraty",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Jim",
        lastName: "Morrison",
        gradeLevel: "11th Grade",
        school: "Magic High School",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Dave",
        lastName: "Gahan",
        gradeLevel: "10th Grade",
        school: "Lumberton Primary School",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
  {
    id: "5",
    firstName: "John",
    lastName: "Doe",
    middleName: "5",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "jdoe@test.com",
    surveys,
    hasEmail: true,
    hasAccessToGoogleClassroom: true,
    hasInternetAccess: true,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Mother",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Test",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Father",
        relationship: "Father",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-3434",
        address: "123 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Grandma",
        relationship: "Grandparent",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-5656",
        address: "498 Oak Dr, Austin, TX, USA 78745",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
    siblings: [
      {
        id: "1",
        firstName: "Danny",
        lastName: "Carey",
        gradeLevel: "5th Grade",
        school: "Hopewell Elemenraty",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Jim",
        lastName: "Morrison",
        gradeLevel: "11th Grade",
        school: "Magic High School",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
  {
    id: "6",
    firstName: "John",
    lastName: "Doe",
    middleName: "6",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "jdoe@test.com",
    surveys,
    hasEmail: true,
    hasAccessToGoogleClassroom: true,
    hasInternetAccess: true,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Mother",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Test",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Father",
        relationship: "Father",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-3434",
        address: "123 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Grandma",
        relationship: "Grandparent",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-5656",
        address: "498 Oak Dr, Austin, TX, USA 78745",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
    siblings: [
      {
        id: "1",
        firstName: "Danny",
        lastName: "Carey",
        gradeLevel: "5th Grade",
        school: "Hopewell Elemenraty",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Jim",
        lastName: "Morrison",
        gradeLevel: "11th Grade",
        school: "Magic High School",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Dave",
        lastName: "Gahan",
        gradeLevel: "10th Grade",
        school: "Lumberton Primary School",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
  {
    id: "7",
    firstName: "John",
    lastName: "Doe",
    middleName: "7",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "jdoe@test.com",
    surveys,
    hasEmail: true,
    hasAccessToGoogleClassroom: true,
    hasInternetAccess: true,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Mother",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Test",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Father",
        relationship: "Father",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-3434",
        address: "123 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Grandma",
        relationship: "Grandparent",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-5656",
        address: "498 Oak Dr, Austin, TX, USA 78745",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
  {
    id: "8",
    firstName: "John",
    lastName: "Doe",
    middleName: "8",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "jdoe@test.com",
    surveys,
    hasEmail: true,
    hasAccessToGoogleClassroom: true,
    hasInternetAccess: true,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Mother",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Test",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Father",
        relationship: "Father",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-3434",
        address: "123 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Grandma",
        relationship: "Grandparent",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-5656",
        address: "498 Oak Dr, Austin, TX, USA 78745",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
  {
    id: "9",
    firstName: "John",
    lastName: "Doe",
    middleName: "9",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "jdoe@test.com",
    surveys,
    hasEmail: true,
    hasAccessToGoogleClassroom: true,
    hasInternetAccess: true,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Mother",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Test",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Father",
        relationship: "Father",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-3434",
        address: "123 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Grandma",
        relationship: "Grandparent",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-5656",
        address: "498 Oak Dr, Austin, TX, USA 78745",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
  {
    id: "10",
    firstName: "John",
    lastName: "Doe",
    middleName: "10",
    pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
    email: "jdoe@test.com",
    surveys,
    hasEmail: true,
    hasAccessToGoogleClassroom: true,
    hasInternetAccess: true,
    hasPhone: true,
    guardians: [
      {
        id: "1",
        firstName: "Mother",
        relationship: "Mother",
        isPrimary: true,
        lastName: "Test",
        phone: "512-555-1212",
        address: "124 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "2",
        firstName: "Father",
        relationship: "Father",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-3434",
        address: "123 Main St, Austin, TX, USA 78705",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
      {
        id: "3",
        firstName: "Grandma",
        relationship: "Grandparent",
        isPrimary: false,
        lastName: "Test",
        phone: "512-555-5656",
        address: "498 Oak Dr, Austin, TX, USA 78745",
        pictureurl: "https://api.adorable.io/avatars/164/abott@adorable.png",
      },
    ],
  },
];

export default allStudents;
