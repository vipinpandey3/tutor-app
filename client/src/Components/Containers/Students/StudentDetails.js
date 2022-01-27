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
import moment from 'moment'

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

const StudentDetails = () => {
  // const [studentRecord, setStudentRecord] = useState({});
  const [showForms, setShowForm] = useState({
    parentForms: false,
    educationDetailsForm: false,
  });
  const [totalPaid, setTotalPaid] = useState(0);
  const { fetchStudentDetails, fetchStudentFeesDetails, fetchParentFields, fetchEducationFormFields } = useContext(StudentContext);
  const styles = useStyles();
  const params = useParams();
  const { studentId } = params;
  const [details, setDetails] = useState({
    studentDetail: {},
    educationDetails: [],
    parentDetails: {},
    studentDetailAttributes: [],
    parentDetailsAttributes: [],
    educationDetailsAttributes: []
  })

  const [studentEducationInitialValue, setStudentEducationInitialValue] = useState(educationInitialValue)
  const [parentIntitialValue, setParentInititalValue] = useState(parentFormInitialValue)

  const [formFields, setFormFields] = useState({
    parentFormFields: [],
    educationFormFields: []
  })
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
      .then((result) => {
        console.log("result", result)
        setDetails({
          studentDetail: result.studentDetails,
          parentDetails: result.studentDetails.Parent,
          educationDetails: result.studentDetails.StudentEducationDetails,
          studentDetailAttributes: result.studentDetailAttributes,
          parentDetailsAttributes: result.parentDetailsAttributes,
          educationDetailsAttributes: result.educationDetailsAttributes
        })
      })
      .catch((err) => {
        console.log("err", err);
      });
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
    // const totalPaid = feesDetails.feesDetailsRow.reduce((accumulatedPaid, currentPaid) => {
    //   let total = accumulatedPaid + parseInt(currentPaid.paidAmount);
    //   return total;
    // }, 0);
    // console.log("totalPaid", totalPaid)
    // setTotalPaid(totalPaid);
  }, []);

  const fetchFormForm = (value) => {
    console.log("value", value)
    if (value === "parentForm") {
      console.log("Details", details.parentDetails)
      fetchParentFields(true)
        .then(result => {
          if(result.formFields && result.formFields.length > 0) {
            setFormFields({...formFields, parentFormFields: result.formFields})
            setParentFormDetails({
              title: "Add Parents",
              buttonName: 'Submit',
              editFlag: false
            })
            setShowForm({educationDetailsForm: false, parentForms: true});
          }
        })
    }
    if (value === "educationForm") {
      console.log("educationForm", value)
      fetchEducationFormFields()
        .then(result => {
          if(result.formFields && result.formFields.length > 0) {
            setFormFields({...formFields, educationFormFields: result.formFields})
            setEducationFormDetails({
              title: "Add Education Details",
              buttonName: "Submit",
              editFlag: false
            })
            setShowForm({educationDetailsForm: true, parentForms: false,});

          }
        })
    }
  };

  const editParentsDetails  = () => {
    fetchParentFields(false)
        .then(result => {
          if(result.formFields && result.formFields.length > 0) {
            setFormFields({...formFields, parentFormFields: result.formFields})
            setParentInititalValue(details.parentDetails)
            setShowForm({educationDetailsForm: false,parentForms: true,});
            setParentFormDetails({
              title: "Update Parents",
              buttonName: 'Update',
              editFlag: true
            })
          }
        })
        .catch(err => {
          console.log('err', err);
        })
  }

  const editEducationDetails = (id) => {
    fetchEducationFormFields()
        .then(result => {
          if(result.formFields && result.formFields.length > 0) {
            setFormFields({...formFields, educationFormFields: result.formFields})
            setStudentEducationInitialValue(details.educationDetails[id])
            setShowForm({educationDetailsForm: true, parentForms: false});
            setEducationFormDetails({
              title: "Update Education Details",
              buttonName: "Update",
              editFlag: true
            })
            setEducationArrayIndex(id)
          }
        })
        .catch(error => {
          console.log('Error while fetching education form fields', error)
        })
  }

  const hideForm = (formName, flag) => {
    setShowForm({
      ...showForms,
      [formName]: flag
    }); 
    if(formName === "educationDetailsForm") {
      setStudentEducationInitialValue(educationInitialValue)
    } else {
      setParentInititalValue(parentFormInitialValue);
    }
  }

  const fetchStudentEducationDetails = (event) => {
    console.log("fetchStudentEducationDetails",event)
  };
  return (
    <>
      <Paper className={`${styles.paperContent} `}>
        <Grid container>
          {details.studentDetailAttributes.map(atributes => {
            return (
              <>
                <Grid item xs={atributes.size} className={styles[atributes.class]}>
                  <Text>
                    {atributes.name}: 
                  </Text>
                  <Text variant="subtitle1" component="h6" className={styles.block}>
                    {
                      details.studentDetail[atributes.id] ? 
                      details.studentDetail[atributes.id] : "-"
                    }
                  </Text>
                </Grid>
              </>
            )
          })}
        </Grid>
      </Paper>
      {showForms.parentForms && (
        <Paper className={styles.paperContent}>
          <ParentForms
            setShowParentForm={setShowForm}
            showForms={showForms}
            studentId={studentId}
            formFields={formFields.parentFormFields}
            loadStudentDteails={loadStudentDteails}
            formDetails={parentFormDetails}
            parentFormInitialValue={parentIntitialValue}
            setFormDetails={setParentFormDetails}
            hideForm={hideForm}
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
              onClick={() =>Object.keys(details.parentDetails).length < 0 ? editParentsDetails() : fetchFormForm("parentForm")}
            >
              {details.parentDetails.hasOwnProperty('id')
                ? "Edit Parents Details"
                : "Add Parents Details"}
            </MatButton>
          </Grid>
          {details.parentDetails ? (
            <>
              <Grid container>
                {
                  details.parentDetailsAttributes.map((atributes) => {
                    return (
                      <>
                        <Grid item xs={atributes.size} className={`${styles[atributes.class]} pt_5`}>
                          <Text>
                            {atributes.name}: 
                          </Text>
                          <Text variant="subtitle1" component="h6" className={styles.block}>
                            {
                              details.parentDetails[atributes.id] ? 
                              details.parentDetails[atributes.id] : "-"
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
      {showForms.educationDetailsForm && (
        <Paper className={styles.paperContent}>
          <StudentEducationForms
            setShowEdutionForm={setShowForm}
            showForms={showForms}
            studentId={studentId}
            formFields={formFields.educationFormFields}
            formDetails={educationFormDetails}
            setFormDetails={setEducationFormDetails}
            loadStudentDteails={loadStudentDteails}
            educationFormIntialValue={studentEducationInitialValue}
            hideForm={hideForm}
          />
        </Paper>
      )}
      <Accordion
        className={`${styles.paperContent} ${styles.noPadding}`}
        onChange={() => fetchStudentEducationDetails()}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={styles.heading}>
            Student Education Details
          </Typography>
          {/* <MatButton
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => toggleForm("educationForm")}
          >
            "Add Education Details"
          </MatButton> */}
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
                  {`${details.studentDetail.lastName} ${details.studentDetail.firstName}`}
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
                details.educationDetails.map((detail, index) => {
                  return (
                    <div key={detail.id}>
                      <Grid container className="padding_top_10">
                        {
                          details.educationDetailsAttributes.map((attributes) => {
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

export default StudentDetails;