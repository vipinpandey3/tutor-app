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
import AddIcon from "@material-ui/icons/Add";
import StudentForm from "./StudentForm";
import { StudentContext } from "../../../context/student-context";
import moment from 'moment'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {getStudents} from '../../../redux/actions/studentAction'
import Loader from '../../Common/Loader'


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
const Students = ({student: {students, loading}, getStudents}) => {
  const history = useHistory();
  const classes = useStyles();
  // const [students, setStudents] = useState({
  //   studentRows: [],
  //   studenetTableAttributes: []
  // })
  const { fetchStudents, addStudent, studentFormFields} = useContext(StudentContext);
  const [showForm, setForm] = useState(false);
  const [formFields, setFormFields] = useState([])
  const [filterFunction, setFilterFunction] = useState({
    fn: (item) => {
      return item;
    },
  });

  const [formTitle, setFormTitle] = useState({
    title: 'Create Student',
    buttonTitle: 'Submit'
  })

  const loadUsers = () => {
    console.log('toggleForm button clicked')
    getStudents();
    // fetchStudents()
    //   .then(result => {
    //     setStudents({
    //       studentRows: result.students,
    //       studenetTableAttributes: result.attributes
    //     })
    //   })
  }

  useEffect(() => {
    loadUsers();
  }, [])

  const searchUser = (event) => {};

  const loadForm = () => {
    studentFormFields()
      .then(result => {
        setFormFields(result.formFields)
        setForm(true)
      })
  };

  const toggleForm = (flag) => {
    setForm(flag)
  }

  const redirectToStudentDetailsPage = (studentId) => {
    history.push(`/students/${studentId}`);
  };

  return (
    <>
      {/* <Loader /> */}
      {showForm && (
          <StudentForm 
            initialcFormValues={initialcFormValues} 
            formTitle={formTitle}
            addStudent={addStudent}
            formFields={formFields}
            toggleForm={toggleForm}
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
            filterFunction={filterFunction}
            openInPopup={loadForm}
            redirectToDetailsPage={redirectToStudentDetailsPage}
          />
        }
      </Paper>
    </>
  );
};

Students.propTypes = {
  getStudents: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    student: state.student
  } 
}


export default connect(mapStateToProps, {getStudents})(Students);
