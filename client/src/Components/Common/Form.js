/* eslint-disable no-lone-blocks */
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
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

  
  const { initialFormValues, formComponent, addValues, items, selectOptions, setShowFeesForm, formDetails, updateParentDetails } = props;
  const { values, errors, handleInputChange, handleDateChange, resetForm, dateValue } =
    useForm(initialFormValues);
    
  const hideFormFields  = () => {
    setShowFeesForm(false);
    resetForm()
  }

  const formSubmitHandler = (e) => {
    if(formDetails.editFlag) {
      updateParentDetails(values, dateValue)
    } else {
      addValues(values, dateValue);
    }
    e.preventDefault();
  }

  return (
    <form className={classes.root} autoComplete="off" onSubmit={formSubmitHandler}>
      <Grid container>
          <Grid item xs={3}>
            <Text variant="subtitle1">
              {formDetails.title}
            </Text>
          </Grid>
        </Grid>
      <Grid container>
        {/* <Grid item xs={12}> */}
          {formComponent.map((formElement) => {
            if (formElement.type === "input") {
              return (
                <Grid item xs={formElement.size}>
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
                <Grid item xs={formElement.size}>
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
                <Grid item xs={formElement.size}>
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
                <Grid item xs={formElement.size}>
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
                <Grid item xs={formElement.size}>
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
              {formDetails.buttonName}
            </MatButton>
            <MatButton text="Reset" color="default" onClick={hideFormFields}>
              Reset
            </MatButton>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;











{/* {formComponent.map((formElement) => {
            if (formElement.type === "radio") {
              return (
                <RadioGroup
                  key={formElement.id}
                  name="gender"
                  value={values[formElement.name]}
                  onChange={handleInputChange}
                  label="Gender"
                  items={items}
                />
              );
            } else if (formElement.type === "select") {
              return (
                <Select
                  key={formElement.id}
                  name="departmentId"
                  label="Department"
                  value={values[formElement.name]}
                  onChange={handleInputChange}
                  error={errors.departmentId}
                  options={selectOptions}
                />
              );
            } else if (formElement.type === "date") {
              return (
                <DatePicker
                  key={formElement.id}
                  name="hireDate"
                  label="Hire Date"
                  value={values.hireDate}
                  onChange={handleInputChange}
                />
              );
            } else if (formElement.type === "checkbox") {
              return (
                <Checkbox
                  key={formElement.id}
                  name="isPermanent"
                  label="Permanent Faculty"
                  value={values.isPermanent}
                  onChange={handleInputChange}
                />
              );
            }
          })} */}