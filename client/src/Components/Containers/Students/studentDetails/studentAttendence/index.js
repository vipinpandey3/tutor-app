import React from 'react'
import Table from '../../../../common/OldTable';
import { Grid } from "@material-ui/core";
import Text from '../../../../common/Text';
import {
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paperContent: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    "&.MuiAccordion-root.Mui-expanded": {
      margin: theme.spacing(2),
    },
    backgroundColor: "white"
  },
  tabContainer: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    backgroundColor: "white"
  },
  flexcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  block: {
    fontWeight: "900",
    paddingLeft: theme.spacing(1),
    color: "black"
  },
  title: {
    color: "black"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  columnContainer: {
    display: "flex",
    flexDirection: "column",
  },
  noPadding: {
    padding: "0px",
  },
  paddingTop: {
    paddingTop: "10px",
  },
  "MuiAccordion-root": {
    paddingTop: "5px",
  },
  alignRight: {
    marginLeft: '119px'
  },
  halfWidth: {
    width: "50%"
  },
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.text.main,
      backgroundColor: theme.palette.primary.main,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

const StudentAttendence = ({studentAttendenceData, studentAttendenceTable, markAbsence}) => {
  const classes = useStyles();
  return (
    <>
        <Grid container>
            <Grid item xs={3}>
            </Grid>
            <Grid item sm></Grid>
            <Grid item xs={3.5}>
              <Text variant="subtitle1" className={classes.title}>
                {
                  `Attendence - ${studentAttendenceData.attendence}, Absence: ${studentAttendenceData.absence}`
                }
              </Text>
            </Grid>
          </Grid>
          {
            studentAttendenceTable.attendenceTableColumns && 
            studentAttendenceTable.attendenceTableColumns.length > 0 &&
            <Table
              records={studentAttendenceTable.attendenceTableRows}
              headCells={studentAttendenceTable.attendenceTableColumns}
              edit={markAbsence}
            />
          }
    </>
  )
}

export default StudentAttendence