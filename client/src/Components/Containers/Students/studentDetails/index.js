/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {
  AccordionSummary,
  makeStyles,
  Paper,
  Typography,
  Accordion,
  AccordionDetails,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Text from "../../../common/Text";
import {tokens} from '../../../../utils/theme'
import { useTheme } from "@mui/material";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ParentForms, StudentEducationForms } from "../studentForms/StudentRelatedForms";
import MatButton from "../../../common/Button";
import AddIcon from "@material-ui/icons/Add";
import moment from 'moment';
import {fetchParentFormFields, 
  fetchStudentDetails, 
  addParentDetails, 
  toggleForm, 
  fetchEditParentFormFields, 
  fetchStudentEducationFormfields,
  addStudeEducationDetails,
  fetchStudentFeesDetails,
  updateEducationDetails,
  fetchStudentAttendence,
  markStudentAbsence,
  hideNotification
} from "../../../../redux/actions/studentAction"

import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Notification from "../../../common/Alert";
import CMentTabs from "../../../common/Tabs";
import {StudentDetailTabs} from "../../../../utils/utilities";
import StudentFees from "./studentFees";
import StudentAttendence from "./studentAttendence";

const useStyles = makeStyles((theme) => ({
  paperContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    "&.MuiAccordion-root.Mui-expanded": {
      margin: theme.spacing(2),
    },
    backgroundColor: "white"
  },
  tabContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: "white"
  },
  flexcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  block: {
    fontWeight: "900",
    paddingLeft: theme.spacing(1),
    color: "black"
  },
  title: {
    color: "black"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
  },
  noPadding: {
    padding: "0px",
  },
  paddingTop: {
    paddingTop: "10px",
  },
  "MuiAccordion-root": {
    paddingTop: "5px",
  },
  alignRight: {
    marginLeft: '119px'
  },
  halfWidth: {
    width: "50%"
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.text.main,
      backgroundColor: theme.palette.primary.main,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const parentFormInitialValue = {
  fatherName: "",
  fatherAadhar: "",
  motherName: "",
  motherAadhar: "",
  fatherEmailId: "",
  motherEmailId: "",
  fatherHighestQualification: "",
  motherHighestQualification: "",
  motherdob: moment().format('YYYY-MM-DD'),
  fatherDob: moment().format('YYYY-MM-DD'),
};

const educationInitialValue = {
  std: "",
  seatNumber: "",
  year: "",
  totalMarks: "",
  instituteName: "",
  universityName: "",
  percentage: "",
};

const StudentDetails = ({student: {formFields, showForm, studentDetails, error, message, formDetails, feesDetails, totalPaid, studentAttendenceTable, studentAttendenceData, severity}, updateEducationDetails, fetchStudentFeesDetails, fetchStudentEducationFormfields, fetchEditParentFormFields, addParentDetails, fetchParentFormFields, fetchStudentDetails, toggleForm, addStudeEducationDetails, fetchStudentAttendence, markStudentAbsence, hideNotification}) => {
  const styles = useStyles();
  const params = useParams();
  const { studentId } = params;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [studentEducationInitialValue, setStudentEducationInitialValue] = useState(educationInitialValue)
  const [parentIntitialValue, setParentInititalValue] = useState(parentFormInitialValue)
  const [tabValue, setTabValue] = useState(0);
  const loadStudentDteails = () => {
    fetchStudentDetails(studentId)
  }

  useEffect(() => {
    loadStudentDteails();
    fetchStudentFeesDetails(studentId);
    fetchStudentAttendence(studentId, {limit: 5, offset: 0})
  }, []);

  const fetchFormForm = (value) => {
    if (value === "parentForm") {
      setParentInititalValue(parentFormInitialValue);
      fetchParentFormFields(true)
    }
    if (value === "educationForm") {
      setFormValue("educationDetailsForm")
      const postObj = {
        formName: "Add Education Detail",
        buttonTitle: 'Submit',
        editFlag: false
      }
      fetchStudentEducationFormfields(postObj)
    }
  };

  const editParentsDetails  = () => {
    fetchEditParentFormFields(false)
    setParentInititalValue(studentDetails.parentDetails)
  }

  const editEducationDetails = (id) => {
    const postObj = {
      formName: "Edit Education Detail",
      buttonTitle: 'Update',
      editFlag: true
    }
    setStudentEducationInitialValue(studentDetails.educationDetails[id])
    fetchStudentEducationFormfields(postObj);
  }

  const loadParentFormFields = () => {
    return studentDetails.parentDetails && Object.keys(studentDetails.parentDetails).length > 0 ? editParentsDetails() : fetchFormForm("parentForm")
  }

  const hideForm = (formName, flag) => {
    toggleForm(flag)
    if(formName === "educationDetailsForm") {
      setStudentEducationInitialValue(educationInitialValue)
    } else {
      setParentInititalValue(parentFormInitialValue);
    }
  }

  const setFormValue = (formName) => {
    if(formName === "educationDetailsForm") {
      setStudentEducationInitialValue(educationInitialValue)
    } else {
      setParentInititalValue(parentFormInitialValue);
    }
  }

  const markAbsence = (row) => {
    markStudentAbsence(row.id)
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      
      <Notification
        open={error} 
        handleClose={hideNotification} 
        severity={severity} 
        duration={3000} 
        message={message} 
      />
      <Paper className={`${styles.paperContent} `}>
        <Grid container>
          {studentDetails.studentDetailAttributes.map((atributes, index) => {
            return (
              <Grid key={index} item xs={atributes.size} className={styles[atributes.class]}>
                <Text className={styles.title}>
                  {atributes.name}: 
                </Text>
                <Text variant="subtitle1" component="h6" className={styles.block}>
                  {
                    studentDetails.details[atributes.id] ? 
                    studentDetails.details[atributes.id] : "-"
                  }
                </Text>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
      {showForm && formFields.parentFormFields && formFields.parentFormFields.length > 0 && (
        <Paper className={styles.paperContent}>
          <ParentForms
            addParentDetails={addParentDetails}
            showForm={showForm}
            error={error}
            studentId={studentId}
            formFields={formFields.parentFormFields}
            formDetails={formDetails}
            parentFormInitialValue={parentIntitialValue}
            hideForm={hideForm}
            setFormValue={setFormValue}
          />
        </Paper>
      )}
      <Paper className={styles.paperContent}>
        <Grid container className={styles.columnContainer}>
          <Grid item xs={3}>
            <Text component="h6" className={`${styles.block} ${styles.noPadding}`}>
              Parents Details
            </Text>
          </Grid>
          <Grid item sm></Grid>
          <Grid item xs={3}>
            <MatButton
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={loadParentFormFields}
            >
              {studentDetails.parentDetails && studentDetails.parentDetails.hasOwnProperty('id')
                ? "Edit Parents Details"
                : "Add Parents Details"}
            </MatButton>
          </Grid>
          {studentDetails.parentDetails ? (
            <Grid container>
              {
                studentDetails.parentDetailsAttributes.map((attributes) => {
                  return (
                    <Grid key={attributes.id} item xs={attributes.size} className={`${styles[attributes.class]} pt_5`}>
                      <Text className={styles.title}>
                        {attributes.name}: 
                      </Text>
                      <Text variant="subtitle1" component="h6" className={styles.block}>
                        {
                          studentDetails.parentDetails[attributes.id] ? 
                          studentDetails.parentDetails[attributes.id] : "-"
                        }
                      </Text>
                    </Grid>
                  )
                })
              }
            </Grid>
          ) : (
            <p>No Details found</p>
          )}
        </Grid>
      </Paper>
      {showForm && formFields.educationFormFields && formFields.educationFormFields.length > 0 && (
        <Paper className={styles.paperContent}>
          <StudentEducationForms
            addStudeEducationDetails={addStudeEducationDetails}
            updateEducationDetails={updateEducationDetails}
            error={error}
            setFormValue={setFormValue}
            showForms={showForm}
            studentId={studentId}
            formFields={formFields.educationFormFields}
            formDetails={formDetails}
            educationFormIntialValue={studentEducationInitialValue}
            hideForm={hideForm}
          />
        </Paper>
      )}
      <Accordion
        className={`${styles.paperContent} ${styles.noPadding}`}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={`${styles.heading} ${styles.title}`}>
            Student Education Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className={styles.columnContainer}>
            <Grid container>
              <Grid item xs={6} className={styles.flexcontainer}>
                <Text variant="subtitle1"  className={styles.title}>
                  FullName:
                </Text>
                <Text
                  variant="subtitle1"
                  component="h6"
                  className={styles.block}
                >
                  {`${studentDetails.details.lastName} ${studentDetails.details.firstName}`}
                </Text>
              </Grid>
              <Grid item sm></Grid>
              <Grid>
                <MatButton
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => fetchFormForm("educationForm")}
                >
                  Add Details
                </MatButton>
              </Grid>
            </Grid>
            <hr></hr>
            <Grid>
              {
                studentDetails.educationDetails.map((detail, index) => {
                  return (
                    <div key={detail.id}>
                      <Grid container className="padding_top_10">
                        {
                          studentDetails.educationDetailsAttributes.map((attributes) => {
                            return (
                              <Grid item xs={attributes.size} className={`${styles[attributes.class]} ${styles.paddingTop}`}>
                                <Text className={styles.title}>
                                  {attributes.name}: 
                                </Text>
                                <Text 
                                  variant="subtitle1"
                                  component="h6"
                                  className={styles.block}
                                >
                                  {
                                    detail[attributes.id] ?
                                    detail[attributes.id] : "-"
                                  }
                                </Text>
                              </Grid>
                            )
                          })
                        }
                        <Grid item xs={3} className={`${styles.flexcontainer}`}>
                          <MatButton
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => editEducationDetails(index)}
                          >
                            Edit Details
                          </MatButton>
                        </Grid>
                      </Grid>
                      <hr></hr>
                    </div>
                  )
                })
              }
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Paper className={`${styles.tabContainer}`}>
        <CMentTabs tabs={StudentDetailTabs} value={tabValue} handleChange={handleTabChange}>
          <CustomTabPanel value={tabValue} index={0}>
            <StudentFees feesDetails={feesDetails} totalPaid={totalPaid} />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <StudentAttendence 
              studentAttendenceData={studentAttendenceData} 
              studentAttendenceTable={studentAttendenceTable} 
              markAbsence={markAbsence} />
          </CustomTabPanel>
        </CMentTabs>
      </Paper>
    </>
  );
};

StudentDetails.propTypes = {
  fetchParentFormFields: PropTypes.func.isRequired,
  student: PropTypes.object.isRequired,
  fetchStudentDetails: PropTypes.func.isRequired,
  addParentDetails: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  fetchEditParentFormFields: PropTypes.func.isRequired,
  fetchStudentEducationFormfields: PropTypes.func.isRequired,
  addStudeEducationDetails: PropTypes.func.isRequired,
  fetchStudentFeesDetails: PropTypes.func.isRequired,
  updateEducationDetails: PropTypes.func.isRequired,
  fetchStudentAttendence: PropTypes.func.isRequired,
  markStudentAbsence: PropTypes.func.isRequired,
  hideNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    student: state.student,
  }
}

export default connect(mapStateToProps, {updateEducationDetails, fetchStudentFeesDetails, addStudeEducationDetails, fetchStudentEducationFormfields, fetchEditParentFormFields, toggleForm, fetchParentFormFields, fetchStudentDetails, addParentDetails, fetchStudentAttendence, markStudentAbsence, hideNotification})(StudentDetails);