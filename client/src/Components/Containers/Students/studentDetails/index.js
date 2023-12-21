/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AccordionSummary,
  makeStyles,
  Paper,
  Typography,
  Accordion,
  AccordionDetails,
  Table as MuiTable,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Text from "../../../Common/Text";
import Table from '../../../Common/OldTable'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ParentForms, StudentEducationForms } from "../studentForms/StudentRelatedForms";
import MatButton from "../../../Common/Button";
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
import Notification from "../../../Common/Alert";

const useStyles = makeStyles((theme) => ({
  paperContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    "&.MuiAccordion-root.Mui-expanded": {
      margin: theme.spacing(2),
    },
  },
  flexcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  block: {
    fontWeight: "900",
    paddingLeft: theme.spacing(1),
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

  const [studentEducationInitialValue, setStudentEducationInitialValue] = useState(educationInitialValue)
  const [parentIntitialValue, setParentInititalValue] = useState(parentFormInitialValue)

  const loadStudentDteails = () => {
    fetchStudentDetails(studentId)
  }

  useEffect(() => {
    loadStudentDteails();
    fetchStudentFeesDetails(studentId);
    fetchStudentAttendence(studentId)
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
                <Text>
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
                      <Text>
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
          <Typography className={styles.heading}>
            Student Education Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container className={styles.columnContainer}>
            <Grid container>
              <Grid item xs={6} className={styles.flexcontainer}>
                <Text variant="subtitle1" >
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
                    "Add Details"
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
                                <Text>
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
      <div className={`${styles.flexcontainer}`}>
        <Paper className={`${styles.paperContent} ${styles.halfWidth}`}>
          <Grid container>
            <Grid item xs={12}>
              <Text variant="subtitle1">
                Fee details
              </Text>
            </Grid>
          </Grid>
          <MuiTable className={`${styles.table}`}>
            <TableHead>
              <TableRow key="Header">
                {feesDetails.feesTableHeaders.map((header, index) => {
                  return (
                    <TableCell key={index}>{header.label}</TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {feesDetails.feesDetailsRow.map(row => {
                return (
                  <TableRow key={row.id}>
                    {
                      feesDetails.feesTableHeaders.map((rowCell,index) => {
                        const value = row[rowCell.id];
                        return <TableCell key={index}>{value}</TableCell>
                      })
                    }
                  </TableRow>
                )
              })}
              <TableRow key="lastRow">
                <TableCell key="empty1"></TableCell>
                <TableCell key="empty2"></TableCell>
                <TableCell key="empty3"></TableCell>
                <TableCell key="totalPaid" style={{ textAlign: "right" }}>Total Paid</TableCell>
                <TableCell key="empty4">{totalPaid}</TableCell>
                <TableCell key="empty5"></TableCell>
                <TableCell key="empty6"></TableCell>
              </TableRow>
            </TableBody>
          </MuiTable>
        </Paper>
        <Paper className={`${styles.paperContent} ${styles.halfWidth}`}>
        <Grid container>
            <Grid item xs={3}>
            </Grid>
            <Grid item sm></Grid>
            <Grid item xs={3.5}>
              <Text variant="subtitle1">
                {
                  `Attendence - ${studentAttendenceData.attendence}, Absence: ${studentAttendenceData.absence}`
                }
              </Text>
            </Grid>
          </Grid>
          {
            studentAttendenceTable.attendenceTableColumns && 
            studentAttendenceTable.attendenceTableColumns.length > 0 &&
            <Table
              records={studentAttendenceTable.attendenceTableRows}
              headCells={studentAttendenceTable.attendenceTableColumns}
              edit={markAbsence}
            />
          }
        </Paper>
      </div>
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