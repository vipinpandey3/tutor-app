/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import {
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { ExamContext } from "../../../context/exam-context";
import MatButton from "../../Common/Button";
import Text from "../../Common/Text";
import ExamForm from "./ExamForm";
import ExamTable from "./ExamTable";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {
  fetchAllExams,
  fetchExamFormFields,
  createExam,
  toggleForm,
  deleteExam
} from '../../../redux/actions/examAction'

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

const Exams = ({exam: {loading, error, message, examData, examFormFields, formDetails, showForm}, toggleForm, createExam, fetchExamFormFields, fetchAllExams, deleteExam}) => {
  const styles = useStyles();
  
  const [formTitle, setFormTitle] = useState({
    title: '"Schedule Exam"',
    buttonTitle: "Schedule Exam"
  })
  const [searchStudent, setSearchStudent] = useState("")
  const [editFormFieldValue, setEditFormFieldValues] = useState([]);
  const [editFormFlag, setEditExamFormFlag] = useState(false)
  // const {fetchSubjectByStandard, getExamById} = useContext(ExamContext);

  useEffect(() => {
    loadExam()
  }, [])

  const loadExam = () => {
    fetchAllExams()
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
      { showForm &&  
        <ExamForm
          toggleForm={toggleForm} 
          loadExam={loadExam} 
          initialExamFormValue={initialExamFormValue} 
          formTitle={formTitle} 
          examFormInput={examFormFields} 
          // fetchSubjectByStandard={fetchSubjectByStandard} 
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
            <MatButton onClick={fetchExamFormFields} variant="contained" style={{ flex: "1", width: "90%" }}>Create Exam</MatButton>
          </Grid>
        </Grid>
        {
          examData.examTableHeader && 
          <ExamTable 
            rows={examData.rows} 
            ExamTableHeader={examData.examTableHeader} 
            ExamNestedTableHeader={examData.examNestedTableHeader}
            disableExam={deleteExam}
            loadExam={loadExam}
          />
        }
      </Paper>
    </>
  );
};

Exams.propTypes = {
  fetchAllExams: PropTypes.func.isRequired,
  fetchExamFormFields: PropTypes.func.isRequired,
  exam: PropTypes.object.isRequired,
  createExam: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  deleteExam: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    exam: state.exam
  }
}

export default connect(mapStateToProps, {deleteExam, createExam, fetchAllExams, fetchExamFormFields, toggleForm})(Exams);