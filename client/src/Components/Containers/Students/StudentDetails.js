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
  TableSortLabel,
  TableBody,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import Text from "../../Common/Text";
import { parentFormInput } from "./StudentsRecords";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { StudentContext } from "../../../context/student-context";
import { ParentForms, StudentEducationForms } from "./StudentRelatedForms";
import MatButton from "../../Common/Button";
import AddIcon from "@material-ui/icons/Add";

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
  motherdob: "",
  fatherDob: "",
};

// const studentEducationInitialValue = {
//   std: "",
//   seatNumber: "",
//   year: "",
//   totalMarks: "",
//   instituteName: "",
//   universityName: "",
//   percentage: "",
// };

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

  const [studentEducationInitialValue, setStudentEducationInitialValue] = useState({
    std: "",
    seatNumber: "",
    year: "",
    totalMarks: "",
    instituteName: "",
    universityName: "",
    percentage: "",
  })

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
        setDetails({
          studentDetail: result.studentDetails,
          parentDetails: result.parentDetails,
          educationDetails: result.educationDetails,
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
    }).catch(err => {
      console.log('err', err);
    })
    const totalPaid = feesDetails.feesDetailsRow.reduce((accumulatedPaid, currentPaid) => {
      let total = accumulatedPaid + parseInt(currentPaid.paidAmount);
      return total;
    }, 0);
    setTotalPaid(totalPaid);
  }, []);

  const fetchFormForm = (value) => {
    if (value === "parentForm") {
      fetchParentFields(true)
        .then(result => {
          if(result.formFields && result.formFields.length > 0) {
            setFormFields({...formFields, parentFormFields: result.formFields})
            setShowForm({educationDetailsForm: false, parentForms: true});
          }
        })
    }
    if (value === "educationForm") {
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

  const fetchStudentEducationDetails = (event) => {};
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
            parentFormInitialValue={ !details.parentDetails ? parentFormInitialValue : details.parentDetails }
            setFormDetails={setParentFormDetails}
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
              onClick={() => details.parentDetails ? editParentsDetails() : fetchFormForm("parentForm")}
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











// eslint-disable-next-line no-lone-blocks
{/* <Grid>
              {details.educationDetails.map((details) => {
                return (
                  <div key={details.id}>
                    <Grid container className="padding_top_10">
                      <Grid
                        item
                        xs={6}
                        className={`${styles.flexcontainer} ${styles.paddingTop}`}
                      >
                        <Text variant="subtitle1" >
                          {" "}
                          Standard:
                        </Text>
                        <Text
                          variant="subtitle1"
                          component="h6"
                          className={styles.block}
                        >
                          {details.std}
                        </Text>
                      </Grid>
                      <Grid item xs={3} className={`${styles.flexcontainer}`}>
                        <Text variant="subtitle1">
                          Year:
                        </Text>
                        <Text
                          variant="subtitle1"
                          component="h6"
                          className={styles.block}
                        >
                          {details.year}
                        </Text>
                      </Grid>
                      <Grid item xs={3} className={`${styles.flexcontainer}`}>
                        <MatButton
                          variant="outlined"
                          startIcon={<AddIcon />}
                          // onClick={() => toggleForm("educationForm")}
                        >
                          {details.parentsDetail
                          ? "Edit Details"
                            : "Add Details"}
                        </MatButton>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className={`${styles.flexcontainer} ${styles.paddingTop}`}
                      >
                        <Text variant="subtitle1">
                          Institute Name:
                        </Text>
                        <Text
                          variant="subtitle1"
                          component="h6"
                          className={styles.block}
                        >
                          {details.instituteName}
                        </Text>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className={`${styles.flexcontainer} ${styles.paddingTop}`}
                      >
                        <Text variant="subtitle1">
                          Seat Number:
                        </Text>
                        <Text
                          variant="subtitle1"
                          component="h6"
                          className={styles.block}
                        >
                          {details.seatNumber}
                        </Text>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className={`${styles.flexcontainer} ${styles.paddingTop}`}
                      >
                        <Text
                          variant="subtitle1"
                        
                          className={`${styles.block} ${styles.noPadding}`}
                        >
                          Final Exam Subject & Score Cards
                        </Text>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className={`${styles.flexcontainer} ${styles.paddingTop}`}
                      >
                        <Text variant="subtitle1">
                          Total Marks:
                        </Text>
                        <Text
                          variant="subtitle1"
                          component="h6"
                          className={styles.block}
                        >
                          {details.totalMarks}
                        </Text>
                      </Grid>
                    </Grid>
                    <Grid container className="pbt_10">
                      <Grid
                        item
                        xs={3}
                        className={`${styles.flexcontainer} ${styles.paddingTop}`}
                      >
                        <Text variant="subtitle1">
                          English:
                        </Text>
                        <Text
                          variant="subtitle1"
                          component="h6"
                          className={styles.block}
                        >
                          54/100
                        </Text>
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        className={`${styles.flexcontainer} ${styles.paddingTop}`}
                      >
                        <Text variant="subtitle1">
                          French:
                        </Text>
                        <Text
                          variant="subtitle1"
                          component="h6"
                          className={styles.block}
                        >
                          46/100
                        </Text>
                      </Grid>
                    </Grid>
                    <hr></hr>
                  </div>
                );
              })}
            </Grid> */}
