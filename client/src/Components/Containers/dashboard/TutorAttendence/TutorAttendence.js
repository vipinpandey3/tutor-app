import {Table as MuiTable, Grid, InputAdornment, makeStyles, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@material-ui/core';
import React, { useState } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import { useContext } from 'react';
import { useEffect } from 'react';
import { DashboardContext } from '../../../../context/dashboard-context';
import Input from '../../../Common/Input';
import Table from '../../../Common/Table';
import MatButton from '../../../Common/Button';
import ActionButton from '../../../Common/ActionButton';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

const useStyles = makeStyles((theme) => ({
  seacrhInput: {
    width: "60%",
  },
  largeFont: {
    fontSize: '20px'
  }
}))

const TutorAttendence = () => {
  const {getTutorById, updateTutorAttendence, markTutorAbsence, getAllTutorAttendence, searchTutorAttendencebyId, markTutorAttendceById} = useContext(DashboardContext)
  const styles = useStyles();
  const [showTables, setShowTables] = useState({
    searchUserInput: false,
    searchAttendeceInput: true,
    showTutorTable: false,
    showattendenceTable: true
  })

  const [tutorAttendenceRecord, setTutorAttendence] = useState({
    attedenceRows: [],
    attendenceTableAttributes: []
  });

  const [inputValue, setInputValue] = useState("")

  const [markeAttendenceTableData, setMarkAttendenceTableData] = useState({
    rows: [],
    attributes: []
  })

  const loadAttendence = () => {
    getAllTutorAttendence()
    .then(result => {
      if(result.resultShort === 'success') {
        setTutorAttendence({
          attendenceTableAttributes: result.attributes,
          attedenceRows: result.attendence,
        })
      }
    })
  }

  useEffect(() => {
    loadAttendence()
  }, []);


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

  const searchTutorForAttendence = () => {
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
    markTutorAttendceById(row.id)
    .then(result => {
      if(result.resultShort === 'success') {
        toggleElements(false, true, false, true);
      }
    })
    .catch(error => {
      toggleElements(true, false, true, false);
    })
  }

  const updateAttendence = (row, type) => {
    console.log('updateAttendence', row, type)
    if(type === 'timeOut') {
      return updateTutorAttendence(row.attendenceId)
      .then(result => {
        if(result.resultShort === 'success') {
          loadAttendence();
        }
      })
      .catch(error => {
        console.log('Error while calling markTutorAbsence method')
      })
    }
    if(type === 'absent') {
      return markTutorAbsence(row.attendenceId)
      .then(result => {
        if(result.resultShort === 'success') {
          loadAttendence();
        }
      })
      .catch(error => {
        console.log('Error while calling markTutorAbsence method')
      })
    }
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
              <Grid item xs={3}>
                <Toolbar>
                  <MatButton
                    variant="outlined"
                    onClick={searchTutorForAttendence}
                  >
                    Mark Attendence
                  </MatButton>
                </Toolbar>
              </Grid>
          </Grid>
        )
      }
      { showTables.showattendenceTable && 
        <MuiTable>
          <TableHead>
            <TableRow key="header">
              {
                tutorAttendenceRecord.attendenceTableAttributes.map((cell, index) => {
                  return (
                    <TableCell key={index}>
                      {
                        cell.label
                      }
                    </TableCell>
                  )
                })
              }
              <TableCell key={'Actions'}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              tutorAttendenceRecord.attedenceRows.map((details, index) => {
                return (
                  <TableRow 
                    key={details.id}
                  >
                    {
                      tutorAttendenceRecord.attendenceTableAttributes.map((rowCell, cellIndex) => {
                        const value = details[rowCell.props]
                        if(rowCell.props && rowCell.props.includes('.')) {
                          const itemSplit = rowCell.props.split('.');
                          return (
                            <TableCell key={cellIndex}>
                              {details[itemSplit[0]][itemSplit[1]]}
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
                        onClick={() => updateAttendence(details, 'timeOut')}
                        color="primary"
                      >
                        <EditOutlinedIcon fontSize="small" />
                      </ActionButton>
                      <ActionButton
                        color="secondary"
                        onClick={() => updateAttendence(details, 'absent')}
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

export default TutorAttendence;

// eslint-disable-next-line no-lone-blocks
{/* <Table
          records={tutorAttendenceRecord.attedenceRows}
          headCells={tutorAttendenceRecord.attendenceTableAttributes}
          openInPopup={editAttendence} */}

