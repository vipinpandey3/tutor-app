import { Grid, InputAdornment, makeStyles, Toolbar } from '@material-ui/core';
import React, { createRef, useState } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { useContext } from 'react';
import { useEffect } from 'react';
import { DashboardContext } from '../../../../context/dashboard-context';
import Input from '../../../Common/Input';
import Table from '../../../Common/Table';
import MatButton from '../../../Common/Button';

const useStyles = makeStyles((theme) => ({
  seacrhInput: {
    width: "60%",
  }
}))

const records = [
  {
    id: 1234,
    name: "Vipin Pandey",
    std: "8th",
    date: "2022-01-28",
    inTime: "11.00 AM",
    outTime: "2.00PM"
  },
  {
    id: 12345,
    name: "Vipin Pandey",
    std: "8th",
    date: "2022-01-28",
    inTime: "11.00 AM",
    outTime: "2.00PM"
  },
  {
    id: 1236,
    name: "Vipin Pandey",
    std: "8th",
    date: "2022-01-28",
    inTime: "11.00 AM",
    outTime: "2.00PM"
  },
  {
    id: 1237,
    name: "Vipin Pandey",
    std: "8th",
    date: "2022-01-28",
    inTime: "11.00 AM",
    outTime: "2.00PM"
  }
]

const headers = [
  {
    "id": "id",
    "label": "Id",
  },
  {
    "id": "name",
    "label": "Student Name",
  },
  {
    "id": "std",
    "label": "Standard",
  },
  {
    "id": "date",
    "label": "Date"
  },
  {
    "id": "inTime",
    "label": "In Time"
  },
  {
    "id": "outTime",
    "label": "Out Time"
  }
]

const TutorAttendence = () => {
  const {getTutorById, refreshPage, getAllTutorAttendence, searchTutorAttendencebyId, markTutorAttendceById} = useContext(DashboardContext)
  const styles = useStyles();
  const [showTables, setShowTables] = useState({
    searchUserInput: false,
    searchAttendeceInput: true,
    showTutorTable: false,
    showattendenceTable: true
  })

  const [tutorAttendenceRecord, setTutorAttendence] = useState({
    attedenceRows: records,
    attendenceTableAttributes: headers
  });

  const [inputValue, setInputValue] = useState("")

  const [markeAttendence, setMarkAttendence] = useState(false);
  const [markeAttendenceTable, setMarkAttendenceTable]= useState(false);
  const [markeAttendenceTableData, setMarkAttendenceTableData] = useState({
    rows: [],
    attributes: []
  })

  const [tutor, setTutor] = useState({
    row: [],
    attributes: []
  })

  useEffect(() => {
  }, [])
  const filterFunction = () => {

  }

  const editAttendence = () => {

  }

  const searchTutorAttendence = (event) => {
    console.log('Event', event)
    if(event.keyCode === 13) {
      console.log('Value', event.target.value)
      searchTutorAttendencebyId(event.target.value)
        .then(result => {
          if(result.resultShort === 'success') {
            setTutorAttendence({
              ...tutorAttendenceRecord,
              attedenceRows: result
            })
          }
        })
    }
  }

  const markTutorAttendce = () => {
    toggleElements(true, false, false, true)
  }

  const searchTutor = () => {
    getTutorById(inputValue)
    .then(result => {
      if(result.resultShort === 'success') {
        setMarkAttendenceTableData({
          rows: result.tutorDetails,
          attributes: result.attributes
        });
        toggleElements(true, false, true, false)
      } else {
        setMarkAttendenceTableData({
          row: [],
          attributes: []
        })
      }
    })
    .catch(error => {
      console.log('Error', error)
    })
  }

  const toggleElements = (flag1, flag2, flag3, flag4) => {
    setShowTables({
      searchUserInput: flag1,
      searchAttendeceInput: flag2,
      showTutorTable: flag3,
      showattendenceTable: flag4
    })
  }

  const cancelAttedence = () => {
    toggleElements(false, true, false, true);
    setInputValue("")
  }

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value)
  }

  const markeTutorAttendence = (row) => {
    console.log('Row data', row)
  }
  
  return (
    <>
      {
       showTables.searchUserInput && (
        <Grid container>
          <Grid item xs={3}>
            <Input
              onChange={onInputChange}
              label="Search Student"
              className={styles.seacrhInput}
              value={inputValue}
              name="tutor"             
            />
          </Grid>
          <Grid item xs={3}>
            <MatButton onClick={searchTutor} variant="contained" style={{ flex: "1", width: "80%" }}>Search</MatButton>
          </Grid>
          <Grid item xs={2}>
              <MatButton onClick={cancelAttedence} variant="contained" style={{ flex: "1", width: "90%" }}>Cancel</MatButton>
          </Grid>
        </Grid> 
       )
      }
      {
        showTables.showTutorTable && 
        <Table 
          records={markeAttendenceTableData.rows}
          headCells={markeAttendenceTableData.attributes}
          edit={markeTutorAttendence}
        />
      }
      {
        showTables.searchAttendeceInput && (
          <Grid container>
              <Grid items xs={6}>
                <Toolbar>
                  <Input
                    onKeyDown={searchTutorAttendence}
                    label="Search Student"
                    className={styles.seacrhInput}
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
                    onClick={markTutorAttendce}
                  >
                    Mark Attendence
                  </MatButton>
                </Toolbar>
              </Grid>
          </Grid>
        )
      }
      { showTables.showattendenceTable && <Table
          records={tutorAttendenceRecord.attedenceRows}
          headCells={tutorAttendenceRecord.attendenceTableAttributes}
          openInPopup={editAttendence}
        />
        }
    </>
  )
};

export default TutorAttendence;

