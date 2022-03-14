/* eslint-disable array-callback-return */
import { Grid, Paper, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import MatButton from "../../Common/Button";
import DatePicker from "../../Common/DatePicker";
import Input from "../../Common/Input";
import Text from "../../Common/Text";

const useStyles = makeStyles((theme) => ({
  paperContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
}));

const FeesForm = (props) => {
  const styles = useStyles();
  const { formDetails, initiateFeesFormValue, feesInput, getFeesFormValue, toggleForm } =
    props;
  const [feesFormValue, setFeesFormValue] = useState(initiateFeesFormValue);

  const valueChange = (e) => {
    const { name, value } = e.target;
    setFeesFormValue({
      ...feesFormValue,
      [name]: value,
    });
  };

  const handleCancle = () => {
    toggleForm(false)
  }

  const formSubmit = (e) => {
    e.preventDefault();
    getFeesFormValue(feesFormValue);
  };

  

  return (
    <>
      <Paper className={styles.paperContent}>
        <form onSubmit={formSubmit}>
          <Grid container>
            <Grid item xs={3}>
              <Text variant="subtitle1" component="h6">
                {formDetails.formName}
              </Text>
            </Grid>
          </Grid>
          <Grid container style={{ paddingTop: "10px" }}>
            {feesInput.map((input) => {
              if (input.type === "date") {
                return (
                  <Grid
                    key={input.id}
                    item
                    xs={3}
                    style={{paddingTop: '10px'}}
                    className={styles.contentMargin}
                  >
                    <DatePicker
                      style={{ width: "90%" }}
                      name={input.name}
                      value={feesFormValue[input.name]}
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
                    style={{paddingTop: '10px'}}
                  >
                    <Input
                      style={{ width: "90%" }}
                      size="medium"
                      name={input.name}
                      valur={feesFormValue[input.name]}
                      label={input.label}
                      onChange={valueChange}
                    />
                  </Grid>
                );
              }
            })}
          </Grid>
          <Grid container style={{ paddingTop: "10px" }}>
            <Grid item sm></Grid>
            <Grid item xs={2}>
              <MatButton
                variant="outlined"
                style={{ flex: "1", width: "90%" }}
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
                style={{ flex: "1", width: "90%" }}
                color="primary"
                type="submit"
                size="large"
              >
                {formDetails.formButton}
              </MatButton>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
};

export default FeesForm;
