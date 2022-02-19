import React, { useState, useContext, useEffect, createRef } from 'react';
import Table from '../../../Common/Table';
import {Grid, Table as MuiTable, TableBody, TableCell, TableHead, TableRow, Toolbar, makeStyles} from "@material-ui/core";
import {DashboardContext} from '../../../../context/dashboard-context';
import ActionButton from '../../../Common/ActionButton';
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Input from '../../../Common/Input';
import MatButton from '../../../Common/Button';

const useStyles = makeStyles((theme) => ({
  seacrhInput: {
    width: "60%",
  },
  largeFont: {
    fontSize: '20px'
  },
  searchInput: {
    height: "50px",
    width: "40%",
    flex: "1",
    paddingLeft: "10px"
  },
  attendenceButton: {
    width: "90%"
  }
}))

const StudentAttendence = () => {
  const { getAllStudentAttendence, markStudentAbsence, getStudentById, markStudentAttendenceById, getAllAttendenceOfStudentById} = useContext(DashboardContext)
  const searchRef = createRef()
  const styles = useStyles();
  const [showTables, setShowTables] = useState({
    searchUserInput: false,
    searchAttendeceInput: true,
    showStudentTable: false,
    showattendenceTable: true
  })

  const [attendenceTableData, setAttendenceTableData] = useState({
    attendenceRows: [],
    attendenceAttributes: []
  })

  const [markeAttendenceTableData, setMarkAttendenceTableData] = useState({
    rows: [],
    attributes: []
  })

  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    loadAttendence()
  }, [])

  const toggleElements = (flag1, flag2, flag3, flag4) => {
    setShowTables({
      searchUserInput: flag1,
      searchAttendeceInput: flag2,
      showStudentTable: flag3,
      showattendenceTable: flag4
    })
  }

  const loadAttendence = () => {
    getAllStudentAttendence()
    .then(result => {
      if(result.resultShort === 'success') {
        setAttendenceTableData({
          attendenceRows: result.attendence,
          attendenceAttributes: result.attributes
        })
      } else {
        setAttendenceTableData({
          attendenceRows: [],
          attendenceAttributes: []
        })
      }
    })
    .catch(error => {
      setAttendenceTableData({
        attendenceRows: [],
        attendenceAttributes: []
      })
    })
  }

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  }

  const searchStudent = () => {
    getStudentById(inputValue)
    .then(result => {
      if(result.resultShort === 'success') {
        console.log("result", result)
        setMarkAttendenceTableData({
          rows: result.studentDetails,
          attributes: result.attributes
        });
        toggleElements(true, false, true, false);
      } else {
        setMarkAttendenceTableData({
          row: [],
          attributes: result.attributes
        })
      }
    })
    .catch(error => {
      console.log('Error', error)
    })
  }

  const hideSearchInputForStudentAttendence = () => {
    toggleElements(false, true, false, true);
  }

  const updateAttendence = (row) => {
    console.log('row', row)
    markStudentAbsence(row.attendenceId)
    .then(result => {
      if(result.resultShort === 'success') {
        loadAttendence();
      }
    })
    .catch(error => {
      console.log('Error while calling markStudentAbsence method')
    })
  }

  const searchStudentAttendence = (event) => {
    if (event.code === 'Enter') {
      if(searchRef.current.value !== "") {
        getAllAttendenceOfStudentById(searchRef.current.value)
        .then(result => {
          console.log('REsult', result)
          if(result.resultShort === 'success') {
            setAttendenceTableData({
              attendenceRows: result.attendence,
              attendenceAttributes: result.attributes
            })
          } else {
            setAttendenceTableData({
              attendenceRows: [],
              attendenceAttributes: result.attributes
            })
          }
        })
      } else if(searchRef.current.value === "") {
        console.log('')
        loadAttendence();
      }
    }
  }

  const markStudentAttendce = (row) => {
    markStudentAttendenceById(row.id)
    .then(result => {
      if(result.resultShort === 'success') {
        toggleElements(false, true, false, true);
        loadAttendence();
      }
    })
    .catch(error => {
      toggleElements(true, false, true, false);
    })

  }

  const showInputStudentForAttendence = () => {
    toggleElements(true, false, false, true)
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
            <MatButton onClick={searchStudent} variant="contained" style={{ flex: "1", width: "80%" }}>Search</MatButton>
          </Grid>
          <Grid item xs={2}>
              <MatButton onClick={hideSearchInputForStudentAttendence} variant="contained" style={{ flex: "1", width: "90%" }}>Cancel</MatButton>
          </Grid>
        </Grid> 
       )
      }
      {
        showTables.showStudentTable &&
        <Table
          records={markeAttendenceTableData.rows}
          headCells={markeAttendenceTableData.attributes}
          edit={markStudentAttendce}
        />
      }
      {
        showTables.searchAttendeceInput && (
          <Grid container>
              <Grid items xs={6}>
                {/* <Toolbar> */}
                  <input  onKeyDown={searchStudentAttendence} className={styles.searchInput} ref={searchRef} name="studentAttendence" placeholder="Search"  />
                  {/* <Input
                    onKeyDown={searchStudentAttendence}
                    label="Search Student"
                    className={styles.seacrhInput}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  /> */}
                {/* </Toolbar> */}
              </Grid>
              <Grid item sm></Grid>
              <Grid item>
                <Toolbar>
                  <MatButton
                  // className={styles.attendenceButton}
                    variant="outlined"
                    onClick={showInputStudentForAttendence}
                  >
                    Mark Attendence
                  </MatButton>
                </Toolbar>
              </Grid>
          </Grid>
        )
      }
      {
        showTables.showattendenceTable && 
        <MuiTable>
          <TableHead>
            <TableRow>
              {
                attendenceTableData.attendenceAttributes.map((cell, index) => {
                  return (
                    <TableCell
                      key={index}
                    >
                      {cell.label}
                    </TableCell>
                  )
                })
              }
              <TableCell key={'Actions'}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              attendenceTableData.attendenceRows.map((details, celIndex) => {
                return (
                  <TableRow key={details.id}>
                    {
                      attendenceTableData.attendenceAttributes.map((rowCell, cellIndex) => {
                        const value = details[rowCell.props];
                        if(rowCell.props && rowCell.props.includes('.')) {
                          const itemSplit = rowCell.props.split('.');
                          return (
                            <TableCell>
                              {details[itemSplit[0]][itemSplit[1]] ? details[itemSplit[0]][itemSplit[1]] : "-"}
                            </TableCell>
                          )
                        }
                        return (
                          value === null ? (
                            <TableCell key={cellIndex} className={styles.largeFont}>
                              -
                            </TableCell>
                          ) : (
                            <TableCell key={cellIndex}>
                              {value}
                            </TableCell>
                          )
                        )
                      })
                    }
                    <TableCell key={'actionButtons'}>
                      <ActionButton
                        color="secondary"
                        onClick={() => updateAttendence(details)}
                      >
                        <CloseOutlinedIcon fontSize="small" />
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </MuiTable>
      }
    </>
  )
};

export default StudentAttendence;
