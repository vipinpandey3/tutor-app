import React, { useState } from "react";
import { useHistory } from "react-router";
import { InputAdornment, makeStyles, Paper, Toolbar } from "@material-ui/core";
import Table from "../../Common/Table";
import { Grid } from "@material-ui/core";
import Input from "../../Common/Input";
import SearchIcon from "@material-ui/icons/Search";
import MatButton from "../../Common/Button";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../Common/Popup";
import TutorsForm from "./TutorsForm";

const useStyles = makeStyles((theme) => ({
  paperCotent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  seacrhInput: {
    width: "60%",
  },
}));

const headCells = [
  { id: "fullName", label: "Tutors Name" },
  { id: "email", label: "Email" },
  { id: "mobile", label: "Mobile" },
  { id: "department", label: "Department" },
  {id: 'actions', label: 'Actions', disableSorting: true}
];

const TutorRecords = [
  {
    id: 1,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 2,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 3,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 4,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 5,
    fullName: "Pandey Vipin",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 6,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 7,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 8,
    fullName: "Pandey Vipin",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 9,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  },
  {
    id: 10,
    fullName: "Vipin Pandey",
    email: "Vipinpandey@gmail.com",
    mobile: "9321475789",
    department: "Science",
  }
];

const Tutors = () => {
  const history = useHistory()
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFunction, setFilterFunction] = useState({
    fn: (items) => {
      return items;
    },
  });

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

  return (
    <>
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
                onClick={openModalPupup}
              >
                Add New
              </MatButton>
            </Toolbar>
          </Grid>
        </Grid>
        <Table
          headCells={headCells}
          records={TutorRecords}
          filterFunction={filterFunction}
          openInPopup={openModalPupup}
          redirectToDetailsPage={redirectToTutorsDetailsPage}
        />
      </Paper>
      <Popup
        title="Tutors Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TutorsForm />
      </Popup>
    </>
  );
};

export default Tutors;
