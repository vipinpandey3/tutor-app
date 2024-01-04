/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import {
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import Text from "../../../../common/Text";
import ExamTable from "../../examTable/Loadable";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {
  fetchAllExams,
  fetchExamFormFields,
  createExam,
  toggleForm,
  deleteExam,
  fetchSubjectByStandard
} from '../../../../../redux/actions/examAction'

const useStyles = makeStyles((theme) => ({
  paperCotent: {
    margin: theme.spacing(1),
    padding: theme.spacing(1.5),
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

const CanceledExams = ({exam: {loading, error, message, examData, examFormFields, formDetails, showForm, subjects}, toggleForm, createExam, fetchExamFormFields, fetchAllExams, deleteExam, fetchSubjectByStandard}) => {
  const styles = useStyles();
  const [searchStudent, setSearchStudent] = useState("")
  const [editFormFieldValue, setEditFormFieldValues] = useState([]);
  const [editFormFlag, setEditExamFormFlag] = useState(false)

  useEffect(() => {
    loadExam()
  }, [])

  const loadExam = () => {
    fetchAllExams()
  }

  return (
    <>
      <Paper className={styles.paperCotent}>
        <Grid container>
          <Grid item xs={3}>
              <Text variable="subtitle1" component="subtitle1">Upcoming Exam</Text>
          </Grid>
          <Grid item sm></Grid>
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

CanceledExams.propTypes = {
  fetchAllExams: PropTypes.func.isRequired,
  fetchExamFormFields: PropTypes.func.isRequired,
  exam: PropTypes.object.isRequired,
  createExam: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  deleteExam: PropTypes.func.isRequired,
  fetchSubjectByStandard: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    exam: state.exam
  }
}

export default connect(mapStateToProps, {deleteExam, createExam, fetchAllExams, fetchExamFormFields, toggleForm, fetchSubjectByStandard})(CanceledExams);