import { Grid, InputAdornment, makeStyles, Paper, Toolbar } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router";
import Input from "../../Common/Input";
import Table from "../../Common/Table";
import SearchIcon from "@material-ui/icons/Search";
import MatButton from "../../Common/Button";
import Popup from "../../Common/Popup";
import AddIcon from "@material-ui/icons/Add";
import StudentForm from "./StudentForm";
import StudentsRecords from './StudentsRecords';

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
  { id: "fullName", label: "Tutors Name" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile" },
  { id: "department", label: "Department" },
  {id: 'actions', label: 'Actions', disableSorting: true}
];

const Students = () => {
  const history = useHistory()
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false)
  const [filterFunction, setFilterFunction] = useState({
    fn: (item) => {
      return item;
    },
  });

  const searchUser = (event) => {};

  const openModalPupup = () => {
    setOpenPopup(true)
  }

  const redirectToStudentDetailsPage = (studentId) => {
    console.log("student Id", studentId);
    history.push(`/students/${studentId}`);
  }

  return (
    <>
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
                    )
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
                    onClick={openModalPupup}
                >
                    Add New
                </MatButton>
            </Toolbar>
          </Grid>
        </Grid>
        <Table
          records={StudentsRecords}
          headCells={headCells}
          filterFunction={filterFunction}
          openInPopup={openModalPupup}
          redirectToDetailsPage={redirectToStudentDetailsPage}
        />
      </Paper>
      <Popup 
        title="Students Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
          <StudentForm />
      </Popup>
    </>
  );
};

export default Students;
