import React, { useEffect, useState } from "react";
import Form from "../../Common/Form";

const initialFormValues = {
  id: 0,
  fullName: "",
  email: "",
  mobile: "",
  branch: "",
  gender: "male",
  departmentId: "",
  hireDate: new Date(),
  isPermanent: false,
};

const formComponent = [
  {
    id: 1,
    name: "fullName",
    label: "FullName",
    type: "input",
  },
  {
    id: 2,
    name: "email",
    label: "Email",
    type: "input",
  },
  {
    id: 3,
    name: "mobile",
    label: "Mobile",
    type: "input",
  },
  {
    id: 4,
    name: "branch",
    label: "Branch",
    type: "input",
  },
  {
    id: 5,
    name: "gender",
    label: "Gender",
    type: "radio",
  },
  {
    id: 6,
    name: "department",
    label: "Department",
    type: "select",
  },
  {
    id: 7,
    name: "addmissionDate",
    label: "Date of Adddmission",
    type: "date",
  },
  {
    id: 8,
    name: "batch",
    label: "Batch",
    type: "checkbox",
  },
];

const TutorsForm = () => {
    const [forms, setForms] = useState(formComponent)

  return (
    <>
      <Form initialFormValues={initialFormValues} formComponent={forms} />
    </>
  );
};

export default TutorsForm;
