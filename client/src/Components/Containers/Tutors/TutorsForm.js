/* eslint-disable array-callback-return */
import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import MatButton from "../../common/Button";
import Text from "../../common/Text";
import Input from '../../common/Input';
import DatePicker from "../../common/DatePicker";
import Select from "../../common/Select";

const useStyles = makeStyles((theme) => ({
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

const TutorsForm = (props) => {
  const styles = useStyles();
  const {formValues, formDetails, formComponent, setFormValues, toggleForm , addTutors, loadTutors} =  props;

  const valueChange = (e) => {
    const {name, value} = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  

  const onSubmit = (e) => {
    e.preventDefault();
    if(formDetails.editFlag === "true") {
    } else {
      addTutors(formValues)
      loadTutors()
    }
  }

  const handleCancle = () => {
    toggleForm(false, false, "Add Tutor", "Submit");
  }

  return (
    <form>
      <Paper className={styles.paperConent}>
        <Grid container>
          <Grid item xs={3}>
            <Text variant="subtitle1" component="h6">
              {formDetails.title}
            </Text>
          </Grid>
        </Grid>
        <Grid container>
          {formComponent.map((input) => {
            if(input.type === 'input') {
              return (
                <Grid key={input.id} item xs={6} className={styles.contentMargin}>
                <Input style={{ width: "90%" }} size="medium" name={input.name} value={formValues[input.name]} label={input.label} onChange={valueChange}/>
              </Grid>
              )
            } else if(input.type === 'date') {
              return (
                <Grid key={input.id} item xs={6} className={styles.contentMargin}>
                  <DatePicker style={{ width: "90%" }} name={input.name} value={formValues[input.name]} onChange={valueChange} label={input.label}/>
                </Grid>
              )
            } else if(input.type === 'select') {
              return (
                <Grid key={input.id} item xs={6} className={styles.contentMargin}>
                    {/* <DatePicker style={{ width: "90%" }} name={input.name} value={formValue[input.name]} onChange={valueChange} label={input.label}/> */}
                  <Select style={{width: "90%"}} value={formValues[input.name]} name={input.name} label={input.label} onChange={valueChange} options={input.option} />
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
              onClick={onSubmit}
              size="large"
            >
              {formDetails.buttonName}
            </MatButton>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};


export default TutorsForm;
