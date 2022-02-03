import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import Table from '../../../Common/Table';
import {DashboardContext} from '../../../../context/dashboard-context'

const records = [
  {
    id: 1234,
    name: "Vipin Pandey",
    std: "8th",
    date: "2022-01-28",
    inTime: "11.00 AM",
    outTime: "2.00PM"
  },
  {
    id: 12345,
    name: "Vipin Pandey",
    std: "8th",
    date: "2022-01-28",
    inTime: "11.00 AM",
    outTime: "2.00PM"
  },
  {
    id: 1236,
    name: "Vipin Pandey",
    std: "8th",
    date: "2022-01-28",
    inTime: "11.00 AM",
    outTime: "2.00PM"
  },
  {
    id: 1237,
    name: "Vipin Pandey",
    std: "8th",
    date: "2022-01-28",
    inTime: "11.00 AM",
    outTime: "2.00PM"
  }
]

const headers = [
  {
    "id": "id",
    "label": "Id",
  },
  {
    "id": "name",
    "label": "Student Name",
  },
  {
    "id": "std",
    "label": "Standard",
  },
  {
    "id": "date",
    "label": "Date"
  },
  {
    "id": "inTime",
    "label": "In Time"
  },
  {
    "id": "outTime",
    "label": "Out Time"
  }
]

const StudentAttendence = () => {
  const {refreshPage, getAllStudentAttendence} = useContext(DashboardContext)

  useEffect(() => {
    refreshPage("Inside Student attendence page");
  }, [])

  const filterFunction = () => {

  }

  const editAttendence = () => {

  }
  
  return (
    <>
      <Table
        records={records}
        headCells={headers}
        filterFunction={filterFunction}
        openInPopup={editAttendence}
      />
    </>
  )
};

export default StudentAttendence;
