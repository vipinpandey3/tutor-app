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
}));

const StudentDetails = () => {
  // const [studentRecord, setStudentRecord] = useState({});
  const [showForms, setShowForm] = useState({
    parentForms: false,
    educationDetailsForm: false,
  });
  const [totalPaid, setTotalPaid] = useState(0);
  const { fetchStudentDetails, studentDetails, fetchStudentFeesDetails } = useContext(StudentContext);
  const styles = useStyles();
  const params = useParams();
  const { studentId } = params;
  const [feesDetails, setFeesDetails] = useState({
    feesTableHeaders: [],
    feesDetailsRow: []
})

  useEffect(() => {
    fetchStudentDetails(studentId).catch((err) => {
      console.log("err", err);
    });
    fetchStudentFeesDetails(studentId).then(result => {
      setFeesDetails({
        feesDetailsRow: result.fees,
        feesTableHeaders: result.header
      })
    }).catch(err => {
      console.log('err', err);
    })
    console.log('Fees-Details', feesDetails)
    const totalPaid = feesDetails.feesDetailsRow.reduce((accumulatedPaid, currentPaid) => {
      let total = accumulatedPaid + parseInt(currentPaid.paidAmount);
      return total;
    }, 0);
    console.log('total paid', totalPaid)
    setTotalPaid(totalPaid);
  }, []);

  const toggleForm = (value) => {
    if (value === "parentForm") {
      setShowForm({
        educationDetailsForm: false,
        parentForms: true,
      });
    }
    if (value === "educationForm") {
      setShowForm({
        parentForms: false,
        educationDetailsForm: true,
      });
    }
  };

  const fetchStudentEducationDetails = (event) => {};
  return (
    <>
      <Paper className={`${styles.paperContent} `}>
        <Grid container>
          <Grid item xs={2} className={styles.flexcontainer}>
            <Text variant="subtitle1" component="subtitle1">
              FullName:
            </Text>
            <Text variant="subtitle1" component="h6" className={styles.block}>
              {studentDetails.studentDetail.firstName}{" "}
              {studentDetails.studentDetail.lastName}
            </Text>
          </Grid>
          <Grid item xs={3} className={styles.flexcontainer}>
            <Text variant="subtitle1" component="subtitle1">
              Email:
            </Text>
            <Text variant="subtitle1" component="h6" className={styles.block}>
              {studentDetails.studentDetail.emailId}
            </Text>
          </Grid>
          <Grid item xs={2} className={styles.flexcontainer}>
            <Text variant="subtitle1" component="subtitle1">
              Contact:
            </Text>
            <Text variant="subtitle1" component="h6" className={styles.block}>
              8652521189
            </Text>
          </Grid>
          <Grid item xs={2} className={styles.flexcontainer}>
            <Text variant="subtitle1" component="subtitle1">
              Stream:
            </Text>
            <Text variant="subtitle1" component="h6" className={styles.block}>
              Science
            </Text>
          </Grid>
          <Grid item xs={3} className={styles.flexcontainer}>
            <Text variant="subtitle1" component="subtitle1">
              DOB:
            </Text>
            <Text variant="subtitle1" component="h6" className={styles.block}>
              {studentDetails.dob}
            </Text>
          </Grid>
          <Grid
            item
            xs={6}
            className={`${styles.flexcontainer} ${styles.paddingTop}`}
          >
            <Text variant="subtitle1" component="subtitle1">
              Address:
            </Text>
            <Text variant="subtitle1" component="h6" className={styles.block}>
              {studentDetails.address}
            </Text>
          </Grid>
        </Grid>
      </Paper>
      {showForms.parentForms && (
        <Paper className={styles.paperContent}>
          <ParentForms
            setShowParentForm={setShowForm}
            showForms={showForms}
            studentId={studentId}
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
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => toggleForm("parentForm")}
            >
              {studentDetails.parentsDetail
                ? "Edit Parents Details"
                : "Add Parents Details"}
            </MatButton>
          </Grid>
          {studentDetails.parentsDetail ? (
            <>
              <Grid container>
                <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                  <Text variant="subtitle1" component="subtitle1">
                    Father Name:
                  </Text>
                  <Text
                    variant="subtitle1"
                    component="h6"
                    className={styles.block}
                  >
                    {studentDetails.parentsDetail.fatherName}
                  </Text>
                </Grid>
                <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                  <Text variant="subtitle1" component="subtitle1">
                    Father Education:
                  </Text>
                  <Text
                    variant="subtitle1"
                    component="h6"
                    className={styles.block}
                  >
                    {studentDetails.parentsDetail.fatherHighestQualifaction}
                  </Text>
                </Grid>
                <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                  <Text variant="subtitle1" component="subtitle1">
                    Father Aadhar:
                  </Text>
                  <Text
                    variant="subtitle1"
                    component="h6"
                    className={styles.block}
                  >
                    {studentDetails.parentsDetail.fatherAadhar}
                  </Text>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                  <Text variant="subtitle1" component="subtitle1">
                    Mother Name:
                  </Text>
                  <Text
                    variant="subtitle1"
                    component="h6"
                    className={styles.block}
                  >
                    {studentDetails.parentsDetail.motherName}
                  </Text>
                </Grid>
                <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                  <Text variant="subtitle1" component="subtitle1">
                    Mother Education:
                  </Text>
                  <Text
                    variant="subtitle1"
                    component="h6"
                    className={styles.block}
                  >
                    {studentDetails.parentsDetail.motherHighestQualification}
                  </Text>
                </Grid>
                <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                  <Text variant="subtitle1" component="subtitle1">
                    Mother Aadhar:
                  </Text>
                  <Text
                    variant="subtitle1"
                    component="h6"
                    className={styles.block}
                  >
                    {studentDetails.parentsDetail.motherAadhar}
                  </Text>
                </Grid>
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
                <Text variant="subtitle1" component="subtitle1">
                  FullName:
                </Text>
                <Text
                  variant="subtitle1"
                  component="h6"
                  className={styles.block}
                >
                  {`${studentDetails.studentDetail.lastName} ${studentDetails.studentDetail.firstName}`}
                </Text>
              </Grid>
              <Grid>
                <MatButton
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => toggleForm("educationForm")}
                >
                    "Add Details"
                </MatButton>
              </Grid>
            </Grid>
            <hr></hr>
            <Grid>
              {studentDetails.educationDetails.map((details) => {
                return (
                  <div key={details.id}>
                    <Grid container className="padding_top_10">
                      <Grid
                        item
                        xs={6}
                        className={`${styles.flexcontainer} ${styles.paddingTop}`}
                      >
                        <Text variant="subtitle1" component="subtitle1">
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
                        <Text variant="subtitle1" component="subtitle1">
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
                          onClick={() => toggleForm("educationForm")}
                        >
                          {studentDetails.parentsDetail
                            ? "Edit Details"
                            : "Add Details"}
                        </MatButton>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                        className={`${styles.flexcontainer} ${styles.paddingTop}`}
                      >
                        <Text variant="subtitle1" component="subtitle1">
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
                        <Text variant="subtitle1" component="subtitle1">
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
                          component="subtitle1"
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
                        <Text variant="subtitle1" component="subtitle1">
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
                        <Text variant="subtitle1" component="subtitle1">
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
                        <Text variant="subtitle1" component="subtitle1">
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
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Paper className={`${styles.paperContent} `}>
        <Grid container>
          <Grid item xs={12}>
            <Text variant="subtitle1" component="subtitle1">
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
