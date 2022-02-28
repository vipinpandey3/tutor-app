import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AccordionSummary,
  makeStyles,
  Paper,
  Typography,
  Accordion,
  AccordionDetails,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Text from "../../Common/Text";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { StudentContext } from "../../../context/student-context";
import { ParentForms, StudentEducationForms } from "./StudentRelatedForms";
import MatButton from "../../Common/Button";
import AddIcon from "@material-ui/icons/Add";
import moment from 'moment';
import {fetchParentFormFields, 
  fetchStudentDetails, 
  addParentDetails, 
  toggleForm, 
  fetchEditParentFormFields, 
  fetchStudentEducationFormfields,
  addStudeEducationDetails
} from "../../../redux/actions/studentAction"
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

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
  }
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

const StudentDetails = ({student: {formFields, showForm, studentDetails, error, message, formDetails}, fetchStudentEducationFormfields, fetchEditParentFormFields, addParentDetails, fetchParentFormFields, fetchStudentDetails, toggleForm, addStudeEducationDetails}) => {
  const [totalPaid, setTotalPaid] = useState(0);
  const { fetchStudentFeesDetails } = useContext(StudentContext);
  const styles = useStyles();
  const params = useParams();
  const { studentId } = params;

  const [studentEducationInitialValue, setStudentEducationInitialValue] = useState(educationInitialValue)
  const [parentIntitialValue, setParentInititalValue] = useState(parentFormInitialValue)

  // const [formFields, setFormFields] = useState({
  //   parentFormFields: [],
  //   educationFormFields: []
  // })
  const [feesDetails, setFeesDetails] = useState({
    feesTableHeaders: [],
    feesDetailsRow: []
  })

  const [parentFormDetails, setParentFormDetails] = useState({
    title: "Add Parents",
    buttonName: 'Submit',
    editFlag: false
  })

  const [educationFormDetails, setEducationFormDetails] = useState({
    title: "Add Education Details",
    buttonName: "Submit",
    editFlag: false
  })

  const [educationArrayIndex, setEducationArrayIndex] = useState(0)

  const loadStudentDteails = () => {
    fetchStudentDetails(studentId)
  }

  useEffect(() => {
    loadStudentDteails()
    fetchStudentFeesDetails(studentId).then(result => {
      setFeesDetails({
        feesDetailsRow: result.fees,
        feesTableHeaders: result.header
      })
      const totalPaid = feesDetails.feesDetailsRow.reduce((accumulatedPaid, currentPaid) => {
        let total = accumulatedPaid + parseInt(currentPaid.paidAmount);
        return total;
      }, 0);
      console.log("totalPaid", totalPaid)
      setTotalPaid(totalPaid);
    }).catch(err => {
      console.log('err', err);
    })
  }, []);

  const fetchFormForm = (value) => {
    console.log("value", value)
    if (value === "parentForm") {
      setParentInititalValue(parentFormInitialValue);
      fetchParentFormFields(true)
    }
    if (value === "educationForm") {
      console.log("educationForm", value)
      setFormValue("educationDetailsForm")
      fetchStudentEducationFormfields()
    }
  };

  const editParentsDetails  = () => {
    fetchEditParentFormFields(false)
    console.log("FOrmDetails *********", studentDetails.parentDetails);
    setParentInititalValue(studentDetails.parentDetails)
  }

  const editEducationDetails = (id) => {
  
  }

  const loadParentFormFields = () => {
    Object.keys(studentDetails.parentDetails).length > 0 ? editParentsDetails() : fetchFormForm("parentForm")
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

  return (
    <>
      <Paper className={`${styles.paperContent} `}>
        <Grid container>
          {studentDetails.studentDetailAttributes.map(atributes => {
            return (
              <>
                <Grid item xs={atributes.size} className={styles[atributes.class]}>
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
              </>
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
            formDetails={parentFormDetails}
            parentFormInitialValue={parentIntitialValue}
            setFormDetails={setParentFormDetails}
            hideForm={hideForm}
            setFormValue={setFormValue}
          />
        </Paper>
      )}
      <Paper className={styles.paperContent}>
        <Grid container className={styles.columnContainer}>
          <Grid item xs={9}>
            <Text className={`${styles.block} ${styles.noPadding}`}>
              Parents Details
            </Text>
          </Grid>
          <Grid item xs={3}>
            <MatButton
              className={styles.alignRight}
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
            <>
              <Grid container>
                {
                  studentDetails.parentDetailsAttributes.map((atributes) => {
                    return (
                      <>
                        <Grid item xs={atributes.size} className={`${styles[atributes.class]} pt_5`}>
                          <Text>
                            {atributes.name}: 
                          </Text>
                          <Text variant="subtitle1" component="h6" className={styles.block}>
                            {
                              studentDetails.parentDetails[atributes.id] ? 
                              studentDetails.parentDetails[atributes.id] : "-"
                            }
                          </Text>
                        </Grid>
                      </>
                    )
                  })
                }
              </Grid>
            </>
          ) : (
            <p>No Details found</p>
          )}
        </Grid>
      </Paper>
      {showForm && formFields.educationFormFields && formFields.educationFormFields.length > 0 && (
        <Paper className={styles.paperContent}>
          <StudentEducationForms
            addStudeEducationDetails={addStudeEducationDetails}
            error={error}
            setFormValue={setFormValue}
            showForms={showForm}
            studentId={studentId}
            formFields={formFields.educationFormFields}
            formDetails={educationFormDetails}
            setFormDetails={setEducationFormDetails}
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
      <Paper className={`${styles.paperContent} `}>
        <Grid container>
          <Grid item xs={12}>
            <Text variant="subtitle1">
              Fee details
            </Text>
          </Grid>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
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
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell style={{ textAlign: "right" }}>Total Paid</TableCell>
              <TableCell>{totalPaid}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
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
  addStudeEducationDetails: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    student: state.student
  }
}

export default connect(mapStateToProps, {addStudeEducationDetails, fetchStudentEducationFormfields, fetchEditParentFormFields, toggleForm, fetchParentFormFields, fetchStudentDetails, addParentDetails})(StudentDetails);