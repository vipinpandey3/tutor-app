import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { InputAdornment, makeStyles, Paper, Toolbar } from "@material-ui/core";
import Table from "../../Common/Table";
import { Grid } from "@material-ui/core";
import Input from "../../Common/Input";
import SearchIcon from "@material-ui/icons/Search";
import MatButton from "../../Common/Button";
import AddIcon from "@material-ui/icons/Add";
import TutorsForm from "./TutorsForm";
import {TutorContext} from '../../../context/tutor-context'

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

const Tutors = () => {
  const history = useHistory()
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [tutors, setTutors] = useState({
    tutorsRows: [],
    tutorTableAttributes: []
  })
  const {fetchTutorForms, fetchTutors} = useContext(TutorContext)
  const [formDetails, setFormDetails] = useState({
    formName: "Add Tutor",
    buttonName: "Submit",
    editFlag: false
  })
  const [formFields, setFormFields] = useState()
  const [showForm, setShowForm] = useState(false)
  const [formValues, setFormValues] = useState(initialFormValues)

  const [filterFunction, setFilterFunction] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    loadTutors()
  }, [])

  const loadTutors = () => {
    fetchTutors()
      .then((result) => {
        if(result && result.resultShort === 'success') {
          console.log('result', result)
          setTutors({
            tutorsRows: result.data,
            tutorTableAttributes: result.turorTableAtttibutes
          })
        }
      })
  }

  const handelSearch = (e) => {
    let target = e.target;
    setFilterFunction({
      fn: (items) => {
        console.log(items);
        if (target.value === "") {
          return items;
        } else {
          const item = items.filter(
            (item) => item.fullName.toLowerCase() === target.value.toLowerCase()
          );
          return item;
        }
      },
    });
  };

  const openModalPupup = () => {
      setOpenPopup(true)
  };

  const redirectToTutorsDetailsPage = (tutorId) => {
    history.push(`/tutors/${tutorId}`);
  }

  const toggleForm = (showFlag, editFlag, formName, buttonName, formValue=initialFormValues) => {
    setShowForm(showFlag);
    setFormDetails({
      formName: formName,
      buttonName: buttonName,
      editFlag: editFlag
    });
    setFormValues(formValue);
  }

  const loadForm = () => {
    fetchTutorForms()
      .then(result => {
        if(result && result.resultShort === 'success') {
          setFormFields(result.formFields);
          toggleForm(true, false, "Add Tutor", "Submit", initialFormValues)
        }
      })
  }

  const editTutor = (row) => {
    fetchTutorForms()
      .then(result => {
        if(result && result.resultShort === 'success') {
          setFormFields(result.formFields);
          toggleForm(true, true, "Update Tutor", "Update", row);
        }
      })
  }

  return (
    <>
      {
        showForm && <TutorsForm 
          formComponent={formFields} 
          formValues={formValues} 
          setFormValues={setFormValues} 
          toggleForm={toggleForm} 
          formDetails={formDetails} 
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
          tutors.tutorsRows && 
          tutors.tutorsRows.length > 0 && 
          <Table
            headCells={tutors.tutorTableAttributes}
            records={tutors.tutorsRows}
            filterFunction={filterFunction}
            openInPopup={openModalPupup}
            redirectToDetailsPage={redirectToTutorsDetailsPage}
            edit={editTutor}
          />
        }
      </Paper>
      {/* <Popup
        title="Tutors Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
      </Popup> */}
        {/* <TutorsForm /> */}
    </>
  );
};

export default Tutors;
