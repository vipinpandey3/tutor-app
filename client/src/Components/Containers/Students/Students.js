import {
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  Toolbar,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Input from "../../Common/Input";
import Table from "../../Common/Table";
import SearchIcon from "@material-ui/icons/Search";
import MatButton from "../../Common/Button";
import Popup from "../../Common/Popup";
import AddIcon from "@material-ui/icons/Add";
import StudentForm from "./StudentForm";
import StudentsRecords from "./StudentsRecords";
import { StudentContext } from "../../../context/student-context";

const useStyles = makeStyles((theme) => ({
  paperCotent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  seacrhInput: {
    width: "60%",
  },
}));

const headCells = [
  { id: "firstName", label: "First Name" },
  { id: "lastName", label: "Last Name" },
  { id: "emailId", label: "EmailId" },
  { id: "gender", label: "Gender" },
  { id: "dob", label: "Date of Birth" },
  { id: "aadharNo", label: "Aadhar Number" },
];

const Students = () => {
  const history = useHistory();
  const classes = useStyles();
  const [students, setStudents] = useState({
    studentRows: [],
    studenetTableAttributes: []
  })
  const { fetchStudents, 
          addStudent, 
          addParent, 
          fetchStudentDetails, 
          storStudentEducationDetails, 
          fetchStudentFeesDetails
        } = useContext(StudentContext);
  const [showForm, setForm] = useState(false);
  const [filterFunction, setFilterFunction] = useState({
    fn: (item) => {
      return item;
    },
  });

  useEffect(() => {
    fetchStudents()
      .then(result => {
        console.log(result)
        setStudents({
          studentRows: result.students,
          studenetTableAttributes: result.attributes
        })
      })
  }, [])

  const searchUser = (event) => {};

  const toggleForm = () => {
    setForm(true);
  };

  const redirectToStudentDetailsPage = (studentId) => {
    history.push(`/students/${studentId}`);
  };

  return (
    <>
      {showForm && (
        <Paper className={classes.paperCotent}>
          <StudentForm />
        </Paper>
      )}
      <Paper className={classes.paperCotent}>
        <Grid container>
          <Grid items xs={6}>
            <Toolbar>
              <Input
                onChange={searchUser}
                label="Search Users"
                className={classes.seacrhInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Toolbar>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <Toolbar>
              <MatButton
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={toggleForm}
              >
                Add New
              </MatButton>
            </Toolbar>
          </Grid>
        </Grid>
        
       {
         students.studentRows && students.studentRows.length > 0 &&  <Table
          records={students.studentRows}
          headCells={students.studenetTableAttributes}
          filterFunction={filterFunction}
          openInPopup={toggleForm}
          redirectToDetailsPage={redirectToStudentDetailsPage}
        />
       }
      </Paper>
      {/* <Popup 
        title="Students Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
          <StudentForm />
      </Popup> */}
    </>
  );
};

export default Students;
