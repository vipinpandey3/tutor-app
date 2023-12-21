import {
    Grid,
    InputAdornment,
    makeStyles,
    Paper,
    Toolbar,
  } from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { useHistory } from "react-router";
import Input from "../../../Common/Input";
import Table from "../../../Common/Table.js";
import SearchIcon from "@material-ui/icons/Search";
import MatButton from "../../../Common/Button";
import AddIcon from "@material-ui/icons/Add";
import StudentForm from "../studentForms/StudentForm";
import moment from 'moment'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
  // import { socket } from "../../../socket";
import {
  addStudent,
  getStudents,
  fetchStudentFormFields, 
  toggleForm, 
  editStudentFormFields, 
  toggleUploadSection, 
  uploadFile, 
  hideNotification
} from '../../../../redux/actions/studentAction'
import StudentFileUpload from "../studentForms/StudentFileUpload";
import Notification from "../../../Common/Alert";
import {tokens} from '../../../../utils/theme'
import { useTheme } from "@mui/material";
import Header from "../../../Common/Header";
  
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
  const Students = ({student: {students, loading, showFileImport, formDetails, showForm, studentFormFields, error, severity, message}, getStudents, fetchStudentFormFields, toggleForm, editStudentFormFields, addStudent, toggleUploadSection, uploadFile, hideNotification}) => {
    const history = useHistory();
    const currentRef = useRef(true)
    const classes = useStyles();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = React.useState([]);
    const [formValues, setFormValues] = useState(initialcFormValues);
    // const [filterFunction, setFilterFunction] = useState({
    //   fn: (item) => {
    //     return item;
    //   },
    // });
    
    const loadStudents = () => {
      getStudents();
    }
  
    // socket.on('upload_excel', (data) => {
    //   console.log('Data =========', data)
    // })
    // useEffect(() => {
    // }, [socket])
    
    useEffect(() => {
      if(currentRef.current) {
        currentRef.current = false
        getStudents()
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getStudents])
    // socket.on('upload_excel', (data) => {
    //   console.log('socket connected', data)
    // })
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

    const download = () => {
      // downloadResults(filter)
    }

    const toggleFilterSection = () => {
      console.log('toggleFilterSection')
    }
  
    const editStudent= (row) => {
      editStudentFormFields();
      setFormValues(row)
    }
  
    return (
      <>
        <Box m="20px">
        <Notification
          open={error} 
          handleClose={hideNotification} 
          severity={severity} 
          duration={3000} 
          message={message} 
        />
        {/* <Loader /> */}
        {/* {showFileImport && <StudentFileUpload toggleUploadSection={toggleUploadSection} uploadFile={uploadFile} />}
        {showForm && (
            <StudentForm 
              initialcFormValues={formValues} 
              formTitle={formDetails}
              addStudent={addStudent}
              formFields={studentFormFields}
              toggleForm={showHideForm}
              loadStudents={loadStudents}
            />
        )} */}
        {/* <Header
          title="Students"
        /> */}
        <Box 
          m="40px 0 0 0"
          height="50vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${colors.grey[100]} !important`,
            },
          }}
        >
          <Grid container>
            <Grid item xs={6}>
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
                  onClick={toggleUploadSection}
                >
                  Upload Excel
                </MatButton>
              </Toolbar>
            </Grid>
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
              selected={selected}
              setSelected={setSelected}
              downloadResults={download}
              title="Students"
              showDownloadButton={true}
              redirectToDetailsPage={redirectToStudentDetailsPage}
              showFilterSection={toggleFilterSection}
            />
          }
        </Box>
      </Box>
        {/* <Paper className={classes.paperCotent}>
          <Grid container>
            <Grid item xs={6}>
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
                  onClick={toggleUploadSection}
                >
                  Upload Excel
                </MatButton>
              </Toolbar>
            </Grid>
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
        </Paper> */}
      </>
    );
  };
  
  Students.propTypes = {
    getStudents: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
    fetchStudentFormFields: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    editStudentFormFields: PropTypes.func.isRequired,
    addStudent: PropTypes.func.isRequired,
    toggleUploadSection: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    hideNotification: PropTypes.func.isRequired,
    // socketConnect: PropTypes.func.isRequired
  }
  
  const mapStateToProps = state => {
    return {
      student: state.student
    } 
  }
  
  
  export default connect(mapStateToProps, {toggleUploadSection, uploadFile, getStudents, fetchStudentFormFields, toggleForm, editStudentFormFields, addStudent, hideNotification})(Students);