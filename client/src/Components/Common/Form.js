/* eslint-disable array-callback-return */
/* eslint-disable no-lone-blocks */
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import Input from "./Input";
import MatButton from "./Button";
import useForm from "../../customsHooks/useForm";
import RadioGroup from "./RadioGroup";
import Select from "./Select";
import DatePicker from "./DatePicker";
import Checkbox from "./Checkbox";
import Text from "./Text";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

const Form = (props) => {
  const classes = useStyles();
  const { initialFormValues, formComponent, addValues, items, selectOptions, resetForm, formDetails, updateDetails } = props;
  const { values, errors, handleInputChange, dateValue } =
    useForm(initialFormValues);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(formDetails.editFlag) {
      updateDetails(values)
    } else {
      addValues(values, dateValue);
    }
  }

  return (
    <form className={classes.root} autoComplete="off" onSubmit={formSubmitHandler}>
      <Grid container>
          <Grid item xs={3}>
            <Text variant="subtitle1">
              {formDetails.formName}
            </Text>
          </Grid>
        </Grid>
      <Grid container>
        {/* <Grid item xs={12}> */}
          {formComponent.map((formElement) => {
            if (formElement.type === "input") {
              return (
                <Grid key={formElement.id} item xs={formElement.size}>
                  <Input
                    key={formElement.id}
                    name={formElement.name}
                    label={formElement.label}
                    value={values[formElement.name]}
                    onChange={handleInputChange}
                    error={errors[formElement.name]}
                  />
                </Grid>
              );
            }
          })}
          {formComponent.map((formElement) => {
            if (formElement.type === "radio") {
              return (
                <Grid key={formElement.id} item xs={formElement.size}>
                  <RadioGroup
                    key={formElement.id}
                    name={formElement.name}
                    label={formElement.label}
                    value={values[formElement.name]}
                    onChange={handleInputChange}
                    items={items}
                  />
                </Grid>
              );
            } else if (formElement.type === "select") {
              return (
                <Grid key={formElement.id} item xs={formElement.size}>
                  <Select
                    key={formElement.id}
                    name={formElement.name}
                    label={formElement.label}
                    value={values[formElement.name]}
                    onChange={handleInputChange}
                    error={errors.departmentId}
                    options={selectOptions}
                  />
                </Grid>
              );
            } else if (formElement.type === "date") {
              return (
                <Grid key={formElement.id} item xs={formElement.size}>
                  <DatePicker
                    key={formElement.id}
                    name={formElement.name}
                    label={formElement.label}
                    value={values[formElement.name]}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            } else if (formElement.type === "checkbox") {
              return (
                <Grid key={formElement.id} item xs={formElement.size}>
                  <Checkbox
                    key={formElement.id}
                    name={formElement.name}
                    label={formElement.label}
                    value={values[formElement.name]}
                    onChange={handleInputChange}
                  />
                </Grid>
              );
            }
          })}
        {/* </Grid> */}
        <Grid item xs={12}>
          <div>
            <MatButton text="Submit" type="submit">
              {formDetails.buttonTitle}
            </MatButton>
            <MatButton text="Reset" color="default" onClick={resetForm}>
              Reset
            </MatButton>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;