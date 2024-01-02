import { InputAdornment, Paper, Toolbar, makeStyles } from "@material-ui/core";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {addTutors, getTutorForm, getTutors, toggleForm} from '../../../redux/actions/tutorAction'

import AddIcon from "@material-ui/icons/Add";
import { Grid } from "@material-ui/core";
import Input from "../../common/Input";
import Loader from "../../common/Loader";
import MatButton from "../../common/Button";
import PropTypes from 'prop-types'
import SearchIcon from "@material-ui/icons/Search";
import Table from "../../common/OldTable";
import TutorsForm from "./TutorsForm";
import {connect} from 'react-redux';
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  paperCotent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  seacrhInput: {
    width: "60%",
  },
}));

const initialFormValues = {
  fullName: "",
  emailId: "",
  mobileNo: "",
  branch: "Mumbai",
  gender: "Male",
  religion: "Hindu",
  dob: new Date(),
  aadharNo: "",
  address: ""
};

const Tutors = ({tutor: {tutors, formDetails, tutorFormFields, showForm, loading}, getTutors, getTutorForm, toggleForm, addTutors}) => {
  const history = useHistory()
  const classes = useStyles();
  const [formValues, setFormValues] = useState(initialFormValues)

  useEffect(() => {
    loadTutors()
  }, [])

  const loadTutors = () => {
    getTutors()
  }

  const handelSearch = () => {

  }

  const redirectToTutorsDetailsPage = (tutorId) => {
    history.push(`/tutors/${tutorId}`);
  }

  const toggleForms = (showFlag, editFlag, formName, buttonName, formValue=initialFormValues) => {
    toggleForm({showFlag, editFlag, formName, buttonName});
    setFormValues(formValue);
  }

  const loadForm = () => {
    getTutorForm()
  }

  const editTutor = (row) => {
    loadForm()
    toggleForms(true, true, "Update Tutor", "Update", row);
  }

  return (
    <>
      {
        loading && < Loader />
      }
      {
        showForm &&
        <TutorsForm 
          formComponent={tutorFormFields} 
          formValues={formValues} 
          setFormValues={setFormValues} 
          toggleForm={toggleForms}
          formDetails={formDetails} 
          addTutors={addTutors}
          loadTutors={loadTutors}
        />
      }
      <Paper className={classes.paperCotent}>
        <Grid container >
          <Grid item xs={6}>
            <Toolbar>
              <Input
                onChange={handelSearch}
                label="Search Tutors"
                className={classes.seacrhInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Toolbar>
          </Grid>
          <Grid item sm></Grid>
          <Grid item>
            <Toolbar>
              <MatButton
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={loadForm}
              >
                Add New
              </MatButton>
            </Toolbar>
          </Grid>
        </Grid>
        {
          tutors.tutorTableAttributes && 
          tutors.tutorTableAttributes.length > 0 && 
          <Table
            headCells={tutors.tutorTableAttributes}
            records={tutors.tutorRows}
            redirectToDetailsPage={redirectToTutorsDetailsPage}
            edit={editTutor}
          />
        }
      </Paper>
    </>
  );
};

Tutors.propTypes = {
  tutors: PropTypes.object,
  getTutors: PropTypes.func.isRequired,
  toggleForm: PropTypes.func.isRequired,
  getTutorForm: PropTypes.func.isRequired,
  addTutors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
 return {
  tutor: state.tutor
 } 
};

export default connect(mapStateToProps, {getTutors, getTutorForm, toggleForm, addTutors})(Tutors);
