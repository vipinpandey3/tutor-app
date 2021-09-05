import React, { useState } from "react";
import { Paper, makeStyles, Grid } from "@material-ui/core";
import Input from "../../Common/Input";
import MatButton from "../../Common/Button";
import Text from "../../Common/Text";
import DatePicker from "../../Common/DatePicker";

const useStyles = makeStyles((theme) => ({
  paperConent: {
    padding: theme.spacing(3),
    margin: theme.spacing(5),
  },
  contentMargin: {
    margin: "10px 0",
  },
}));

const ExamForm = (props) => {
  const styles = useStyles();
  const {
    hindeForm,
    examFormInput,
    formTitle,
    SchduleExam,
    initialExamFormValue,
  } = props;
  const [examFormValue, setExamFormValue] = useState(initialExamFormValue);
  
  const valueChange = (e) => {
    const { name, value } = e.target;
    setExamFormValue({
      ...examFormValue,
      [name]: value,
    });
  };

  const onSubmit = () => {
    SchduleExam(examFormValue, false);
  };

  const handleCancle = () => {
    hindeForm();
  };
  return (
    <form onSubmit={onSubmit}>
      <Paper className={styles.paperConent}>
        <Grid container>
          <Grid item xs={3}>
            <Text variant="subtitle1" component="h6">
              {formTitle}
            </Text>
          </Grid>
        </Grid>
        <Grid container>
          {examFormInput.map((input) => {
            if (input.type === "date") {
              return (
                <Grid
                  key={input.id}
                  item
                  xs={3}
                  className={styles.contentMargin}
                >
                  <DatePicker
                    style={{ width: "90%" }}
                    name={input.name}
                    value={examFormValue[input.name]}
                    onChange={valueChange}
                    label={input.label}
                  />
                </Grid>
              );
            } else if (input.type === "input") {
              return (
                <Grid
                  key={input.id}
                  item
                  xs={3}
                  className={styles.contentMargin}
                >
                  <Input
                    style={{ width: "90%" }}
                    size="medium"
                    name={input.name}
                    valur={examFormValue[input.name]}
                    label={input.label}
                    onChange={valueChange}
                  />
                </Grid>
              );
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
          <Grid item xs={2} alignItems="right">
            <MatButton
              variant="contained"
              style={{ flex: "1", width: "85%" }}
              color="primary"
              type="submit"
              size="large"
            >
              Schedule Exam
            </MatButton>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default ExamForm;
