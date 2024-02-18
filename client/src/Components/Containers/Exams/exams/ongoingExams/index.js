/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import {
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import MatButton from "../../../../common/Button";
import Text from "../../../../common/Text";
import ExamForm from "../../examForm/Loadable";
import ExamTable from "../../examTable/Loadable";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { useHistory } from "react-router";
import {
  fetchAllExams,
  createExam,
  toggleForm,
  deleteExam,
  fetchSubjectByStandard
} from '../../../../../redux/actions/examAction'
import CMentTabs from "../../../../common/Tabs";

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

const Exams = ({exam: {loading, error, message, examData, examFormFields, formDetails, showForm, subjects}, toggleForm, createExam, fetchAllExams, deleteExam, fetchSubjectByStandard}) => {
  const styles = useStyles();
  const history = useHistory();
  
  const [searchStudent, setSearchStudent] = useState("")
  const [editFormFieldValue, setEditFormFieldValues] = useState([]);
  const [editFormFlag, setEditExamFormFlag] = useState(false)
  const loadExam = () => {
    fetchAllExams({status: 1})
  }

  const createExams = () => {
    history.push('/exams/createExams')
  }

  return (
    <>
      <Paper className={styles.paperCotent}>
        <Grid container>
          <Grid item xs={3}>
              <Text variable="subtitle1" component="subtitle1">Upcoming Exam</Text>
          </Grid>
          <Grid item sm></Grid>
          <Grid item xs={3}>
            <MatButton onClick={createExams} variant="contained" style={{ flex: "1", width: "90%" }}>Create Exam</MatButton>
          </Grid>
        </Grid>
        {
          examData.examTableHeader && 
          <ExamTable 
            rows={examData.rows} 
            ExamTableHeader={examData.examTableHeader} 
            ExamNestedTableHeader={examData.examNestedTableHeader}
            disableExam={deleteExam}
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
  deleteExam: PropTypes.func.isRequired,
  fetchSubjectByStandard: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    exam: state.exam
  }
}

export default connect(mapStateToProps, {deleteExam, createExam, fetchAllExams, toggleForm, fetchSubjectByStandard})(Exams);