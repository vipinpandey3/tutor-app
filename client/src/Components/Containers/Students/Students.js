import {
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  Toolbar,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Input from "../../Common/Input";
import Table from "../../Common/Table";
import SearchIcon from "@material-ui/icons/Search";
import MatButton from "../../Common/Button";
import AddIcon from "@material-ui/icons/Add";
import StudentForm from "./StudentForm";
import moment from 'moment'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {addStudent, getStudents, fetchStudentFormFields, toggleForm, editStudentFormFields} from '../../../redux/actions/studentAction'
// import Loader from '../../Common/Loader'


const useStyles = makeStyles((theme) => ({
  paperCotent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  seacrhInput: {
    width: "60%",
  },
}));

const initialcFormValues = {
  firstName: "",
  lastName: "",
  emailId: "",
  mobile: "",
  address: "",
  aadharNo: "",
  gender: "Male",
  dob: moment().format('YYYY-MM-DD'),
  stream: 'Common',
};
const Students = ({student: {students, loading, formDetails, showForm, studentFormFields}, getStudents, fetchStudentFormFields, toggleForm, editStudentFormFields, addStudent}) => {
  const history = useHistory();
  const classes = useStyles();
  const [formValues, setFormValues] = useState(initialcFormValues)
  const [filterFunction, setFilterFunction] = useState({
    fn: (item) => {
      return item;
    },
  });

  const loadUsers = () => {
    getStudents();
  }

  useEffect(() => {
    loadUsers();
  }, [])

  const searchUser = (event) => {};

  const loadForm = () => {
    fetchStudentFormFields()
  };

  const showHideForm = (flag) => {
    toggleForm(flag)
    setFormValues(initialcFormValues)
  }

  const redirectToStudentDetailsPage = (studentId) => {
    history.push(`/students/${studentId}`);
  };

  const editStudent= (row) => {
    editStudentFormFields();
    setFormValues(row)
  }

  return (
    <>
      {/* <Loader /> */}
      {showForm && (
          <StudentForm 
            initialcFormValues={formValues} 
            formTitle={formDetails}
            addStudent={addStudent}
            formFields={studentFormFields}
            toggleForm={showHideForm}
            loadUsers={loadUsers}
          />
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
                onClick={loadForm}
              >
                Add New
              </MatButton>
            </Toolbar>
          </Grid>
        </Grid>
        {
          students.studentTableAttributes && students.studentTableAttributes.length > 0 &&  <Table
            records={students.studentTablerows}
            headCells={students.studentTableAttributes}
            edit={editStudent}
            redirectToDetailsPage={redirectToStudentDetailsPage}
          />
        }
      </Paper>
    </>
  );
};

Students.propTypes = {
  getStudents: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  fetchStudentFormFields: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  editStudentFormFields: PropTypes.func.isRequired,
  addStudent: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    student: state.student
  } 
}


export default connect(mapStateToProps, {getStudents, fetchStudentFormFields, toggleForm, editStudentFormFields, addStudent})(Students);
