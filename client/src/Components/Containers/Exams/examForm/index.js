/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { Paper, makeStyles, Grid } from "@material-ui/core";
import Input from "../../../common/Input";
import MatButton from "../../../common/Button";
import Text from "../../../common/Text";
import DatePicker from "../../../common/DatePicker";
import Select from '../../../common/Select'
import MultiSelect from "../../../common/MultiSelect";
import TimePicker from "../../../common/TimePicker";

const useStyles = makeStyles((theme) => ({
  paperConent: {
    padding: theme.spacing(1),
    margin: theme.spacing(1.5),
  },
  contentMargin: {
    margin: "10px 0",
    '& .MuiFormControl-root': {
      width: '90% !important'
    }
  },
}));

const ExamForm = (props) => {
  const styles = useStyles();
  const {
    toggleForm,
    examFormInput,
    formTitle,
    initialExamFormValue,
    fetchSubjectByStandard,
    createExam,
    subjects
  } = props;
  const [examFormValue, setExamFormValue] = useState(initialExamFormValue);
  const [examTimeValue, setExamTimeValue] = useState(null)
  
  const valueChange = (e) => {
    if(e.target.name === "standard") {
      console.log('e.target.value', e.target.value);
      fetchSubjectByStandard(e.target.value)
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

  const handltTimeInputChange = (event) => {
    setExamTimeValue(event);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final Value', examFormValue)
    createExam(examFormValue)
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

  return (
    <form>
      <Paper className={styles.paperConent}>
        <Grid container>
          <Grid item xs={3}>
            <Text variant="subtitle1" component="h6">
              {formTitle.title}
            </Text>
          </Grid>
        </Grid>
        <Grid container>
          {examFormInput.map((input) => {
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
            else if(input.type === 'time') {
              return (
                <Grid key={input.id} item xs={3} className={styles.contentMargin}>
                  <TimePicker style={{width: '90%'}} value={examTimeValue} name={input.name}  label={input.label} onChange={handltTimeInputChange} />
                </Grid>
              )
            }
          })}
        </Grid>
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

export default ExamForm;













// if (input.type === "date") {
//   return (
    // <Grid
    //   key={input.id}
    //   item
    //   xs={3}
    //   className={styles.contentMargin}
    // >
    //   <DatePicker
    //     style={{ width: "90%" }}
    //     name={input.name}
    //     value={examFormValue[input.name]}
    //     onChange={valueChange}
    //     label={input.label}
    //   />
    // </Grid>
//   );
// } else if (input.type === "input") {
//   console.log('Input', examFormValue[input.name]);
//   return (
//     <Grid
//       key={input.id}
//       item
//       xs={3}
//       className={styles.contentMargin}
//     >
//       <Input
//         style={{ width: "90%" }}
//         size="medium"
//         name={input.name}
//         value={examFormValue[input.name]}
//         label={input.label}
//         onChange={valueChange}
//       />
//     </Grid>
//   );
// } else if(input.type === 'select') {
//   return (
    // <Grid key="input.id" item xs={3} className={styles.contentMargin}>
    //   <Select  value={examFormValue[input.name]} name={input.name} label="Exam Type" onChange={valueChange} options={input.options} />
    // </Grid>
//   )
// }
