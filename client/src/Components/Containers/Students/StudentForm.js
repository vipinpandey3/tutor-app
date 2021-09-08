import React, { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../../context/student-context";
import Form from "../../Common/Form";

const initialFormValues = {
  id: 0,
  firstName: "",
  lastName: "",
  address: "",
  emailId: "",
  mobile: "",
  gender: "male",
  departmentId: "",
  dob: new Date(),
  isPermanent: false,
};

const formComponent = [
  {
    id: 1,
    name: "firstName",
    label: "FirstName",
    type: "input",
  },
  {
    id: 2,
    name: "lastName",
    label: "lastName",
    type: "input",
  },
  {
    id: 3,
    name: "emailId",
    label: "Email",
    type: "input",
  },
  {
    id: 4,
    name: "mobile",
    label: "Mobile",
    type: "input",
  },
  {
    id: 5,
    name: "address",
    label: "address",
    type: "input",
  },
  {
    id: 6,
    name: "aadharNo",
    label: "Aadhar Number",
    type: 'input'
  },
  {
    id: 7,
    name: "gender",
    label: "Gender",
    type: "radio",
  },
//   {
//     id: 7,
//     name: "department",
//     label: "Department",
//     type: "select",
//   },
  {
    id: 8,
    name: "dob",
    label: "Date of Birth",
    type: "date",
  },
  {
    id: 9,
    name: "batch",
    label: "Batch",
    type: "checkbox",
  },
];

const genderItems = [
  {
    id: "male",
    title: "Male",
  },
  {
    id: "female",
    title: "Female",
  },
  {
    id: "others",
    title: "Others",
  },
];

const StudentForm = () => {
  const { addStudent } = useContext(StudentContext);
  // const addStudentToDB = (values) => {
  //     addStudent(values)
  // }
  return (
    <>
      <Form
        initialFormValues={initialFormValues}
        formComponent={formComponent}
        addValues={addStudent}
        items={genderItems}
      />
    </>
  );
};

export default StudentForm;
