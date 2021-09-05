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

  
  const { initialFormValues, formComponent, addUser } = props;
  const { values, errors, handleInputChange, resetForm } =
    useForm(initialFormValues);

  console.log(formComponent);

  const formSubmitHandler = (e) => {

    addUser(values);
    e.preventDefault();
  }

  return (
    <form className={classes.root} autoComplete="off" onSubmit={formSubmitHandler}>
      <Grid container>
        <Grid item xs={6}>
          {formComponent.map((formElement) => {
            if (formElement.type === "input") {
              return (
                <Input
                  key={formElement.id}
                  name={formElement.name}
                  label={formElement.label}
                  value={values[formElement.name]}
                  onChange={handleInputChange}
                  error={errors[formElement.name]}
                />
              );
            }
          })}

          {/* <Input
            name="fullName"
            label="FullName"
            value={values.fullName}
            onChange={handleInputChange}
            error={errors.fullName}
          />
          <Input
            label="Email"
            name="email"
            value={values.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <Input
            label="Mobile"
            name="mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={errors.mobile}
          />
          <Input
            label="Branch"
            name="branch"
            value={values.city}
            onChange={handleInputChange}
          /> */}
        </Grid>
        <Grid item xs={6}>
          {/* <RadioGroup
            name="gender"
            value={values.gender}
            onChange={handleInputChange}
            label="Gender"
            //items={genderItems}
          />
          <Select
            name="departmentId"
            label="Department"
            value={values.departmentId}
            onChange={handleInputChange}
            error={errors.departmentId}
          />
          <DatePicker
            name="hireDate"
            label="Hire Date"
            value={values.hireDate}
            onChange={handleInputChange}
          />
          <Checkbox
            name="isPermanent"
            label="Permanent Faculty"
            value={values.isPermanent}
            onChange={handleInputChange}
          /> */}
          {formComponent.map((formElement) => {
            if (formElement.type === "radio") {
              return (
                <RadioGroup
                  key={formElement.id}
                  name="gender"
                  value={values[formElement.name]}
                  onChange={handleInputChange}
                  label="Gender"
                  //items={genderItems}
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
          })}
          <div>
            <MatButton text="Submit" type="submit">
              Submit
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
