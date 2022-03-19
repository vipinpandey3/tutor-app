import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import { StudentContext } from "../../../context/student-context";
import MatButton from "../../Common/Button";
import DatePicker from "../../Common/DatePicker";
import MultiSelect from "../../Common/MultiSelect";
import Select from "../../Common/Select";
import Text from "../../Common/Text";
import TimePicker from "../../Common/TimePicker";
import Input from '../../Common/Input';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   "& .MuiFormControl-root": {
  //     width: "80%",
  //     margin: theme.spacing(1),
  //   },
  // },
  paperConent: {
    padding: theme.spacing(3),
    margin: theme.spacing(5),
  },
  contentMargin: {
    margin: "10px 0",
    '& .MuiFormControl-root': {
      width: '90% !important'
    }
  },
}));

const StudentForm = (props) => {
  const { formTitle, initialcFormValues, formFields, toggleForm, loadUsers , addStudent} = props;
  const [formValue, setFormValues] = useState(initialcFormValues)
  const styles = useStyles();

  const valueChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValue,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(formValue)
      // .then(result => {
      //   toggleForm(false)
      //   loadUsers()
      // })
  }

  const handleCancle = () => {
    toggleForm(false)
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
          {formFields.map((input) => {
            if(input.type === 'input') {
              return (
                <Grid key={input.id} item xs={6} className={styles.contentMargin}>
                <Input style={{ width: "90%" }} size="medium" name={input.name} value={formValue[input.name]} label={input.label} onChange={valueChange}/>
              </Grid>
              )
            } else if(input.type === 'date') {
              return (
                <Grid key={input.id} item xs={6} className={styles.contentMargin}>
                  <DatePicker style={{ width: "90%" }} name={input.name} value={formValue[input.name]} onChange={valueChange} label={input.label}/>
                </Grid>
              )
            } else if(input.type === 'select') {
              return (
                <Grid key={input.id} item xs={6} className={styles.contentMargin}>
                    {/* <DatePicker style={{ width: "90%" }} name={input.name} value={formValue[input.name]} onChange={valueChange} label={input.label}/> */}
                  <Select style={{width: "90%"}} value={formValue[input.name]} name={input.name} label={input.label} onChange={valueChange} options={input.option} />
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
              onClick={handleCancle}
              size="large"
            >
              Cancle
            </MatButton>
          </Grid>
          <Grid item xs={2}>
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
}

export default StudentForm;





