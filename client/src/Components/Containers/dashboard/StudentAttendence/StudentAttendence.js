import {Grid, Table as MuiTable, TableBody, TableCell, TableHead, TableRow, Toolbar, makeStyles} from "@material-ui/core";
import React, { createRef, useEffect, useState } from 'react';
import {
  getAllAttendenceOfStudentById,
  getAllStudentAttendence,
  getStudentById,
  markStudentAbsence,
  markStudentAttendenceById,
  toggleStudenAttendenceElements
} from "../../../../redux/actions/dashboardAction"

import ActionButton from '../../../Common/ActionButton';
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";
import Input from '../../../Common/Input';
import MatButton from '../../../Common/Button';
import PropTypes from 'prop-types'
import Table from '../../../Common/OldTable';
import {connect} from 'react-redux';

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
    height: "46px",
    width: "40%",
    flex: "1",
    paddingLeft: "10px",
    marginTop: "9px"
  },
  attendenceButton: {
    width: "90%"
  }
}))

const StudentAttendence = ({dashboard: {error, message, loading, showStudentTables, studentAttendenceTableData, markStudentAttendenceTableData}, toggleStudenAttendenceElements, getAllStudentAttendence, getAllAttendenceOfStudentById, getStudentById, markStudentAttendenceById, markStudentAbsence}) => {
  const searchRef = createRef()
  const styles = useStyles();
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    loadAttendence()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadAttendence = () => {
    getAllStudentAttendence()
  }

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  }

  const searchStudent = () => {
    getStudentById(inputValue)
  }

  const hideSearchInputForStudentAttendence = () => {
    const postObj = {
      flag1: false,
      flag2: true,
      flag3: false,
      flag4: true
    }
    toggleStudenAttendenceElements(postObj)
  }

  const updateAttendence = (row) => {
    markStudentAbsence(row.attendenceId)
  }

  const searchStudentAttendence = (event) => {
    if (event.code === 'Enter') {
      if(searchRef.current.value !== "") {
        getAllAttendenceOfStudentById(searchRef.current.value)
      } else if(searchRef.current.value === "") {
        loadAttendence();
      }
    }
  }

  const markStudentAttendce = (row) => {
    markStudentAttendenceById(row.id)
  }

  const showInputStudentForAttendence = () => {
    const postObj = {
      flag1: true,
      flag2: false,
      flag3: false,
      flag4: true
    }
    toggleStudenAttendenceElements(postObj)
  }
  
  return (
    <>
      {
       showStudentTables.searchUserInput && (
        <Grid container>
          <Grid xs={3} items="true">
            <Input
              onChange={onInputChange}
              label="Search Student"
              className={styles.searchUserInput}
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
        showStudentTables.showStudentTable &&
        <Table
          records={markStudentAttendenceTableData.rows}
          headCells={markStudentAttendenceTableData.attributes}
          edit={markStudentAttendce}
        />
      }
      {
        showStudentTables.searchAttendeceInput && (
          <Grid container>
              <Grid xs={6}>
                  <input  
                    onKeyDown={searchStudentAttendence} 
                    className={styles.searchInput} 
                    ref={searchRef} 
                    name="studentAttendence" 
                    placeholder="Search"  
                  />
              </Grid>
              <Grid item sm></Grid>
              <Grid item>
                <Toolbar>
                  <MatButton
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
        showStudentTables.showattendenceTable && 
        <MuiTable>
          <TableHead>
            <TableRow>
              {
                studentAttendenceTableData.attendenceAttributes.map((cell, index) => {
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
              studentAttendenceTableData.attendenceRows.map((details, rowCellIndex) => {
                return (
                  <TableRow key={rowCellIndex}>
                    {
                      studentAttendenceTableData.attendenceAttributes.map((rowCell, cellIndex) => {
                        const value = details[rowCell.props];
                        if (!value) {
                          return (
                            <TableCell key={cellIndex}>
                              {"-"}
                            </TableCell>
                          )
                        }
                        if(rowCell.props && rowCell.props.includes('.')) {
                          const itemSplit = rowCell.props.split('.');
                          return (
                            <TableCell key={cellIndex}>
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

StudentAttendence.propTyes = {
  dashboard: PropTypes.object.isRequired,
  getAllStudentAttendence: PropTypes.func.isRequired,
  toggleStudenAttendenceElements: PropTypes.func.isRequired,
  getAllAttendenceOfStudentById: PropTypes.func.isRequired,
  getStudentById: PropTypes.func.isRequired,
  markStudentAttendenceById: PropTypes.func.isRequired,
  markStudentAbsence: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    dashboard: state.dashboard
  }
}

export default connect(mapStateToProps, {markStudentAbsence, markStudentAttendenceById, getAllStudentAttendence, toggleStudenAttendenceElements, getAllAttendenceOfStudentById, getStudentById})(StudentAttendence);
