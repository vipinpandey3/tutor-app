import {Table as MuiTable, Grid, makeStyles, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { DashboardContext } from '../../../../context/dashboard-context';
import Input from '../../../Common/Input';
import Table from '../../../Common/Table';
import MatButton from '../../../Common/Button';
import ActionButton from '../../../Common/ActionButton';
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {
  getAllTutorAttendence,
  toggleTutorAttendenceElement,
  getTutorById,
  markTutorAttendceById,
  updateTutorAttendence,
  markTutorAbsence,
  getAllAttendenceOfTutorById
} from '../../../../redux/actions/dashboardAction'


const useStyles = makeStyles((theme) => ({
  searchUserInput: {
    width: "60%",
    "&.makeStyles-searchInput-29": {
      marginTop: '7px'
    }
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
  actionButton: {
    width: "90%",
    marginLeft: "30px"
  },
  // "MuiToolbar-gutters":  {
  //   paddingRight: "0px",
  //   actionButton: {
  //     width: "100%"
  //   },
  // }
}))

const TutorAttendence = ({dashboard: {error, message, loading, showTutorTables, tutorAttendenceRecord, markAttendenceTableData}, markTutorAttendceById, getTutorById, getAllTutorAttendence, toggleTutorAttendenceElement, updateTutorAttendence, markTutorAbsence, getAllAttendenceOfTutorById}) => {
  const {} = useContext(DashboardContext)
  const styles = useStyles();
  const searchRef = useRef();
  const [inputValue, setInputValue] = useState("")

  const loadAttendence = () => {
    getAllTutorAttendence()
  }

  useEffect(() => {
    loadAttendence()
  }, []);


  const searchTutorAttendence = (event) => {
    if(event.keyCode === 13) {
      if(searchRef.current.value !== "") {
        getAllAttendenceOfTutorById(searchRef.current.value)
      } else {
       loadAttendence() 
      }
    }
  }

  const searchTutorForAttendence = () => {
    const postObj = {
      flag1: true,
      flag2: false,
      flag3: false,
      flag4: true
    }
    toggleTutorAttendenceElement(postObj)
  }

  const searchTutor = () => {
    console.log('INPUT Value', inputValue)
    getTutorById(inputValue)
  }

  const cancelAttedence = () => {
    const postObj = {
      flag1: false,
      flag2: true,
      flag3: false,
      flag4: true
    }
    toggleTutorAttendenceElement(postObj)
    setInputValue("")
  }

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value)
  }

  const markeTutorAttendence = (row) => {
    markTutorAttendceById(row.id)
    setInputValue("")
  }

  const updateAttendence = (row, type) => {
    console.log('updateAttendence', row, type)
    if(type === 'timeOut') {
      return updateTutorAttendence(row.attendenceId)
    }
    if(type === 'absent') {
      return markTutorAbsence(row.attendenceId)
    }
  }

  return (
    <>
      {
       showTutorTables.searchUserInput && (
        <Grid container>
          <Grid item xs={3}>
            <Input
              onChange={onInputChange}
              label="Search Student"
              className={styles.searchUserInput}
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
        showTutorTables.showTutorTable && 
        <Table 
          records={markAttendenceTableData.rows}
          headCells={markAttendenceTableData.attributes}
          edit={markeTutorAttendence}
        />
      }
      {
        showTutorTables.searchAttendeceInput && (
          <Grid container>
              <Grid items xs={6}>
                <input  onKeyDown={searchTutorAttendence} className={styles.searchInput} ref={searchRef} name="studentAttendence" placeholder="Search"/>
              </Grid>
              <Grid item sm></Grid>
              <Grid item xs={3}>
                  <MatButton
                    className={styles.actionButton}
                    variant="outlined"
                    onClick={searchTutorForAttendence}
                  >
                    Mark Attendence
                  </MatButton>
              </Grid>
          </Grid>
        )
      }
      { showTutorTables.showattendenceTable && 
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

TutorAttendence.propTypes = {
  dashboard: PropTypes.object.isRequired,
  getAllTutorAttendence: PropTypes.func.isRequired,
  toggleTutorAttendenceElement: PropTypes.func.isRequired,
  getTutorById: PropTypes.func.isRequired,
  markTutorAttendceById: PropTypes.func.isRequired,
  updateTutorAttendence: PropTypes.func.isRequired,
  markTutorAbsence: PropTypes.func.isRequired,
  getAllAttendenceOfTutorById: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard
  }
}

export default connect(mapStateToProps, {markTutorAbsence, getAllTutorAttendence, toggleTutorAttendenceElement, getTutorById, markTutorAttendceById, updateTutorAttendence, getAllAttendenceOfTutorById})(TutorAttendence);

