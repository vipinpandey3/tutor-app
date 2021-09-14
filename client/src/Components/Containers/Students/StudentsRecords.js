export const StudentsRecords = [
  {
    id: 1,
    firstName: "Vipin",
    lastName: "Pandey",
    emailId: "Vipinpandey@gmail.com",
    gender: "Male",
    dob: "21/12/1995",
    aadharNo: "123456789123",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 2,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 3,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 4,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 5,
    fullName: "Pandey Vipin",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
];

export const parentFormInput = [
  {
    id: "1",
    name: "fatherName",
    label: "Father Name",
    type: "input",
  },
  {
    id: "2",
    name: "fatherAadhar",
    label: "Father Aadhar Number",
    type: "input",
  },
  {
    id: "3",
    name: "motherName",
    label: "Mother Name",
    type: "input",
  },
  {
    id: "4",
    name: "motherAadhar",
    label: "Mother Aadhar Number",
    type: "input",
  },
  {
    id: "5",
    name: "fatherEmailId",
    label: "Father Email",
    type: "input",
  },
  {
    id: "6",
    name: "motherEmailId",
    label: "Mother Email",
    type: "input",
  },
  {
    id: "7",
    name: "fatherHighestQualifaction",
    label: "Father Highest Education",
    type: "input",
  },
  {
    id: "8",
    name: "motherHighestQualifaction",
    label: "Mother Highest Eduation",
    type: "input",
  },
  {
    id: "9",
    name: "fatherDob",
    label: "Father DOB",
    type: "date",
  },
  {
    id: "10",
    name: "motherdob",
    label: "Mother DOB",
    type: "date",
  },
];

export const parentFormInitialValue = {
  fatherName: "",
  fatherAadhar: "",
  motherName: "",
  motherAadhar: "",
  fatherEmailId: "",
  motherEmailId: "",
  fatherHighestQualifaction: "",
  motherHighestQualifaction: "",
  motherdob: "",
  fatherDob: "",
};

export const studentEducationInitialValue = {
  std: "",
  seatNumber: "",
  year: "",
  totalMarks: "",
  instituteName: "",
  universityName: "",
  percentage: "",
};


export const studentEducationForms = [
  {
    id: 1,
    name: "std",
    label: 'Standard',
    type: 'input'
  },
  {
    id: 2,
    name: 'seatNumber',
    label: "Seat Number",
    type: 'input'
  },
  {
    id: 3,
    name: "Year",
    type: "input",
    label: "Academic Year"
  },
  {
    id: 4,
    name: "totalMarks",
    type: "input",
    label: "Total Marks(400/600)"
  },
  {
    id: 5,
    name: "instituteName",
    type: "input",
    label: "Institute/College Name"
  },
  {
    id: 6,
    name: "universityName",
    type: "input",
    label: "Univeristy/Board Name"
  },
  {
    id: 7,
    name: "percentage",
    type: "input",
    label: "Percentage"
  }
]