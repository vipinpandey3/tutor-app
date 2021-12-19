/* eslint-disable no-unused-vars */
import {
  Checkbox,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { ExamContext } from "../../../context/exam-context";
import MatButton from "../../Common/Button";
import Input from "../../Common/Input";
import Text from "../../Common/Text";
import ExamForm from "./ExamForm";
import ExamTable from "./ExamTable";

const useStyles = makeStyles((theme) => ({
  paperCotent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  table: {
    width: "1300px",
    "&.MuiTable-root": {
      marginTop: "10px",
    },
  },
  flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center'
  },
}));

const initialExamFormValue = {
  examType: "",
  timeStart: "10.00",
  examDate: new Date(),
  academicYear: "",
  marks: "",
  standard: "",
  subjects: [],
  hours: 1
}

const Exams = () => {
  const styles = useStyles();
  
  const [formTitle, setFormTitle] = useState({
    title: '"Schedule Exam"',
    buttonTitle: "Schedule Exam"
  })
  const [showExamForm, setShowExamForm] = useState(false);
  const [searchStudent, setSearchStudent] = useState("")
  const [editFormFieldValue, setEditFormFieldValues] = useState([])
  const [examFormField, setExamFormFields] = useState([]);
  const [editFormFlag, setEditExamFormFlag] = useState(false)
  // Destructuring Fees Context Functions
  const {fetchAllExams, fetchExamFormFields, fetchSubjectByStandard, createExam, disableExam, getExamById} = useContext(ExamContext);
  const [examData, setExamData] = useState({
    rows: [],
    examTableHeader: [],
    examNestedTableHeader: []
  })

  useEffect(() => {
    loadExam()
  }, [])

  const loadExam = () => {
    fetchAllExams().then(data => {
      if(data.resultShort && data.resultShort === 'success') {
        setExamData({
          ...examData,
          rows: data.exams,
          examTableHeader: data.examTableHeader,
          examNestedTableHeader: data.examNestedTableHeader
        })
      }})
  }

  const SchduleExam = (formValue, flag) => {
    console.log('form value', formValue);
    setShowExamForm(flag)
  }

  const hindeForm = () => {
    setShowExamForm(false)
  }

  const fetchFeesForms = () => {
    fetchExamFormFields().then((data) => {
      setExamFormFields(data.formFields)
    })
    .catch(error => {
      console.log("Error", error)
    })
  }
  
  // const showExamFormFields = (title, buttonTitle, flag=false) => {
  //   fetchFeesForms()
  //   setFormTitle({
  //     ...formTitle,
  //     title: title,
  //     buttonTitle: buttonTitle
  //   })
  //   setEditExamFormFlag(flag)
  //   setShowExamForm(true)
  // }

  const showExamFormFields = () => {
    fetchFeesForms()
    setShowExamForm(true)
  }

  // const editExam = (data) => {
  //   getExamById(data.ExamId)
  //     .then(result => {
  //       showExamFormFields('Edit Exam', "Update Exam", true)
  //       setEditFormFieldValues(result.examData)
  //     })    
  // }

  return (
    <>
      { showExamForm &&  <ExamForm 
                            hindeForm={hindeForm} 
                            loadExam={loadExam} 
                            initialExamFormValue={initialExamFormValue} 
                            formTitle={formTitle} 
                            SchduleExam={SchduleExam} 
                            examFormInput={examFormField} 
                            fetchSubjectByStandard={fetchSubjectByStandard} 
                            createExam={createExam}
                          />
      }      
      <Paper className={styles.paperCotent}>
        <Grid container>
          <Grid item xs={3}>
              <Text variable="subtitle1" component="subtitle1">Upcoming Exam</Text>
          </Grid>
          <Grid item sm></Grid>
          <Grid item xs={3}>
            <MatButton onClick={showExamFormFields} variant="contained" style={{ flex: "1", width: "90%" }}>Create Exam</MatButton>
          </Grid>
        </Grid>
        {
          examData.examTableHeader && <ExamTable 
                                          rows={examData.rows} 
                                          ExamTableHeader={examData.examTableHeader} 
                                          ExamNestedTableHeader={examData.examNestedTableHeader}
                                          disableExam={disableExam}
                                          loadExam={loadExam}
                                          />
        }
      </Paper>
    </>
  );
};

export default Exams;


// eslint-disable-next-line no-lone-blocks
{/* <Paper className={styles.paperCotent}>
        <Grid container>
          <Grid container>
            <Grid item xs={3}>
              <Text variant="subtitle1" component="h1">
                Exam result
              </Text>
            </Grid>
            <Grid item sm></Grid>
            <Grid item xs={3}>
              <Input style={{ width: "100%" }} label="Search Student" value={searchStudent} onChange={handleSearchInput} />
            </Grid>
          </Grid>
          <Grid container>
            <Grid>
              <TableContainer>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  className={styles.table}
                >
                  <TableHead>
                    <TableHeaderRow />
                  </TableHead>
                  <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id}>{value}</TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </Grid>
      </Paper> */}
