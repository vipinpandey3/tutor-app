/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { Paper, makeStyles, Grid } from "@material-ui/core";
import Input from "../../../common/Input";
import MatButton from "../../../common/Button";
import Text from "../../../common/Text";
import DatePicker from "../../../common/DatePicker";
import Select from '../../../common/Select'
import MultiSelect from "../../../common/MultiSelect";
import CMTimePicker from "../../../common/TimePicker";
import {fetchExamFormFields, toggleForm, fetchSubjectByStandard, createExam} from '../../../../redux/actions/examAction';
import {initialExamFormValue, extraInputs, extraInitialExamFormValue} from '../../../../utils/utilities'
import InputGenerator from "./extraInputs";
import dayjs from 'dayjs';
import moment from "moment";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paperConent: {
    padding: theme.spacing(1),
    margin: theme.spacing(1.5),
    "&.MuiAccordion-root.Mui-expanded": {
      margin: theme.spacing(2),
    },
    backgroundColor: "rgb(103 105 132)"
  },
  contentMargin: {
    margin: "10px 0",
    '& .MuiFormControl-root': {
      width: '90% !important'
    }
  },
  title: {
    color: "black",
    fontSize: "24px",
    fontWeight: "900"
  }
}));


const ExamForm = ({exam: {
  loading, 
  error,
  message,
  formDetails,
  examFormFields,
  subjects, showForm}, createExam, toggleForm, fetchExamFormFields, fetchSubjectByStandard}) => {
  const styles = useStyles();
  const history = useHistory();
  
  const [examFormValue, setExamFormValue] = useState(initialExamFormValue);
  const [formTitle, setFormTitle] = useState({
    title: 'Schedule Exam',
    buttonTitle: "Schedule Exam"
  })
  const [dynamicInputs, setDynamicInputs] = useState([]);
  const [showAddButton, setShowAddButton] = useState(false)
  const [showDynamicInputs, setShowDynamicInputs] = useState(false)
  const [inputSets, setInputSets] = useState([]);

  useEffect(() => {
    fetchExamFormFields()
  }, [])

  
  const valueChange = (e) => {
    if(e.target.name === "standard") {
      fetchSubjectByStandard(e.target.value);
      setShowAddButton(true)
    }
    console.log('Event Input Change', e)
    const { name, value } = e.target;
    setExamFormValue({
      ...examFormValue,
      [name]: value,
    });
  };

  const onSelectionInputChange = (event) => {
    const {
      target: { value },
    } = event;
    setExamFormValue({
      ...examFormValue,
      // On autofill we get a the stringified value.
      subjects: typeof value === 'string' ? value.split(',') : value,
    }
    );
  }

  // const handleDynamicInputTimeChange = (index, event) => {
  //   setExamTimeValue(event);
  // }

  const handleSubmit = (e) => {
    for (let index = 0; index < inputSets.length; index++) {
      inputSets[index].timeStart = `${inputSets[index].timeStart.$H}:${inputSets[index].timeStart.$m}:${inputSets[index].timeStart.$s}`
      inputSets[index].examDate = moment(inputSets[index].examDate).format('YYYY-MM-DD');
      inputSets[index].hours = examFormValue.hours;
      inputSets[index].marks = examFormValue.marks;
    }
    const examSubjects = {subjects: inputSets};
    setExamFormValue({
      ...examFormValue
    })
    e.preventDefault();
    createExam(examFormValue, examSubjects)
    history.push('/exams');
    setInputSets([]);
  }

  const handleCancel = () => {
    const postObj = {
      showFlag: false,
      editFlag: false,
      formName: "",
      buttonName: ""
    }
    toggleForm(postObj);
  }

  const handleDynamicInputChange = (index, value) => {
    const updatedInputs = [...dynamicInputs];
    updatedInputs[index].value = value;
    setDynamicInputs(updatedInputs);
  };

  const addInputSet = () => {
    setShowDynamicInputs(true)
    setInputSets([...inputSets, { examDate: new Date(), subject: "", timeStart: dayjs('2022-04-17T15:30') }]);
  };

  return (
    <form>
      <Paper className={styles.paperConent}>
        <Grid container>
          <Grid item xs={3}>
            <Text variant="subtitle1" className={styles.title} component="h4">
              {formTitle.title}
            </Text>
          </Grid>
        </Grid>
        <Grid container>
          {examFormFields.map((input) => {
            if(input.type === 'input') {
              return (
                <Grid key={input.id} item xs={3} className={styles.contentMargin}>
                <Input style={{ width: "90%" }} size="medium" name={input.name} value={examFormValue[input.name]} label={input.label} onChange={valueChange}/>
              </Grid>
              )
            } else if(input.type === 'date') {
              return (
                <Grid key={input.id} item xs={3} className={styles.contentMargin}>
                  <DatePicker style={{ width: "90%" }} name={input.name} value={examFormValue[input.name]} onChange={valueChange} label={input.label}/>
                </Grid>
              )
            } else if(input.type === 'select') {
              return (
                <Grid key={input.id} item xs={3} className={styles.contentMargin}>
                  <Select style={{width: "90%"}} value={examFormValue[input.name]} name={input.name} label={input.label} onChange={valueChange} options={input.options} />
                </Grid>
              )
            }
            else if(input.type === 'multiselect') {
              return (
                <Grid key={input.id} item xs={3} className={styles.contentMargin}>
                  <MultiSelect style={{width: "90%"}} value={examFormValue[input.name]} onChange={onSelectionInputChange} name={input.name} label={input.label} options={subjects.length > 0 ? subjects : input.options } />
                </Grid>
              )
            } 
            // else if(input.type === 'time') {
            //   return (
            //     <Grid key={input.id} item xs={3} className={styles.contentMargin}>
            //       <TimePicker style={{width: '90%'}} value={examTimeValue} name={input.name}  label={input.label} onChange={handltTimeInputChange} />
            //     </Grid>
            //   )
            // }
          })}
        </Grid>
        {
          showAddButton && <Grid container>
          <Grid item sm></Grid>
          <Grid item xs={2}>
            <MatButton
              variant="outlined"
              style={{ flex: "1", width: "25%" }}
              color="primary"
              type="button"
              onClick={addInputSet}
              // onClick={addDynamicInput}
              size="large"
            >
              +
            </MatButton>
          </Grid>
          <Grid item sm></Grid>
        </Grid>
        }
        {showDynamicInputs && <InputGenerator inputSets={inputSets} setInputSets={setInputSets} subjects={subjects} />}
        <Grid container>
          <Grid item sm></Grid>
          <Grid item xs={2}>
            <MatButton
              variant="outlined"
              style={{ flex: "1", width: "85%" }}
              color="primary"
              type="button"
              onClick={handleCancel}
              size="large"
            >
              Cancle
            </MatButton>
          </Grid>
          <Grid item xs={2} alignItems="right">
            <MatButton
              variant="contained"
              style={{ flex: "1", width: "85%" }}
              color="primary"
              type="submit"
              onClick={handleSubmit}
              size="large"
            >
              {formTitle.buttonTitle}
            </MatButton>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

ExamForm.propTypes = {
  fetchExamFormFields: PropTypes.func.isRequired,
  exam: PropTypes.object.isRequired,
  toggleForm: PropTypes.func.isRequired,
  fetchSubjectByStandard: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    exam: state.exam
  }
}

export default connect(mapStateToProps, {
  fetchExamFormFields,
  createExam, toggleForm, fetchSubjectByStandard
})(ExamForm);






















































































