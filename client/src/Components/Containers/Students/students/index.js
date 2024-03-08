/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  InputAdornment,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React, { useEffect, useState, useRef } from "react";
import { Box } from "@mui/material";
import { useHistory } from "react-router";
import Input from "../../../common/Input";
import Table from "../../../common/Table.js";
import SearchIcon from "@material-ui/icons/Search";
import MatButton from "../../../common/Button";
import AddIcon from "@material-ui/icons/Add";
import StudentForm from "../studentForms/StudentForm";
import moment from 'moment'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { studentTableButtons } from "../../../../utils/utilities.js"
// import { socket } from "../../../socket";
import {
  addStudent,
  getStudents,
  fetchStudentFormFields,
  toggleForm,
  editStudentFormFields,
  toggleUploadSection,
  uploadFile,
  hideNotification,
  fetchStandards,
  assignClass
} from '../../../../redux/actions/studentAction'
import StudentFileUpload from "../studentForms/StudentFileUpload";
import Notification from "../../../common/Alert";
import { tokens } from '../../../../utils/theme'
import { useTheme } from "@mui/material";
import Popup from "../../../common/Popup.js";
import Select from "../../../common/Select.js";

// import Loader from '../../common/Loader'


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
  stream: 'common',
};
const Students = ({ student: { students, loading, showFileImport, formDetails, showForm,
  studentFormFields, error, severity, message, standards },
  getStudents, fetchStudentFormFields, toggleForm, editStudentFormFields,
  addStudent, toggleUploadSection, uploadFile, hideNotification, fetchStandards,
  assignClass
}) => {
  const history = useHistory();
  const currentRef = useRef(true)
  const classes = useStyles();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = React.useState([]);
  const [std, setStd] = useState("")
  const [formValues, setFormValues] = useState(initialcFormValues);
  const [openPopup, setOpenPopup] = useState()
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
    if (currentRef.current) {
      currentRef.current = false
      getStudents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getStudents])
  // socket.on('upload_excel', (data) => {
  //   console.log('socket connected', data)
  // })

  useEffect(() => {
    fetchStandards();
  }, [])
  const searchUser = (event) => { };

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

  const editStudent = (row) => {
    editStudentFormFields();
    setFormValues(row)
  }

  const handleToggleUploadSection = () => {
    toggleUploadSection(true)
  }

  const actionButtonClick = (type) => {
    setOpenPopup(true)
  }

  const handleInputChange = (e) => {
    setStd(e.target.value)
  }

  const handleSuccess = () => {
    let postObj = {
      std: std,
      students: selected
    }
    assignClass(postObj)
  }

  return (
    <>
      <Popup
        title="Asign Standard"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        handleSuccess={handleSuccess}
      >
        <Grid item xs={3}>
          <Select
            name="std"
            label="Standard"
            value={std}
            onChange={handleInputChange}
            options={standards}
          />
        </Grid>
      </Popup>
      <Box m="20px">
        <Notification
          open={error}
          handleClose={hideNotification}
          severity={severity}
          duration={3000}
          message={message}
        />
        {/* <Loader /> */}
        {
          showFileImport && <StudentFileUpload toggleUploadSection={toggleUploadSection} uploadFile={uploadFile} />
        }
        {showForm && (
          <StudentForm
            initialcFormValues={formValues}
            formTitle={formDetails}
            addStudent={addStudent}
            formFields={studentFormFields}
            toggleForm={showHideForm}
            loadStudents={loadStudents}
          />
        )}
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
                  onClick={handleToggleUploadSection}
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
            students.studentTableAttributes && students.studentTableAttributes.length > 0 && <Table
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
              actionButtons={studentTableButtons}
              actionButtonClick={actionButtonClick}
            />
          }
        </Box>
      </Box>
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
  fetchStandards: PropTypes.func.isRequired,
  assignClass: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    student: state.student
  }
}


export default connect(mapStateToProps, { toggleUploadSection, uploadFile, getStudents, fetchStudentFormFields, toggleForm, editStudentFormFields, addStudent, hideNotification, fetchStandards, assignClass })(Students);