/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// /* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import {tokens} from '../../../../utils/theme';
import { useTheme } from "@mui/material";
import {
    Grid,
    InputAdornment,
    makeStyles,
    Toolbar,
} from "@material-ui/core";
import Input from "../../../common/Input";
import Table from "../../../common/Table.js";
import SearchIcon from "@material-ui/icons/Search";
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {getStudents, createRemarks} from '../../../../redux/actions/classAction.js';
import {classStudentsIcons} from '../../../../utils/utilities.js';
import Popup from "../../../common/Popup.js";
import TextArea from '../../../common/TextArea.js';


const useStyles = makeStyles((theme) => ({
    paperCotent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    seacrhInput: {
        width: "60%",
    },
}));


const ClassDetails = ({student: {students, loading,
  studentFormFields, error, severity, message},
  classData: {teacher_id, subject_id, is_class_teacher, subjetc_name}, getStudents, createRemarks}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const params = useParams();
  const classes = useStyles();
  const {classId} = params;
  const [postObj, setPostObj] = useState({
    limit: 20, 
    offset: 0,
    filter: {
        status: 'current',
        stdId: classId
    }
  });
  const [selected, setSelected] = React.useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [remarks, setRemarks] = useState("")
  useEffect(() => {
    getStudents(postObj)
  }, [postObj])

  const download = () => {

  }

  const handleSuccess = async() => {
    const postObj = {
      studentIds: selected,
      teacherId: teacher_id,
      subjectId: subject_id,
      remarkText: remarks
    }
    createRemarks(postObj)
    setOpenPopup(false)
  }

  const actionButtonClick = () => {
    setOpenPopup(true)
  }
  return (
    <Box m="20px">
      <Popup
        title="Asign Standard"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        handleSuccess={handleSuccess}
      >
        <Grid item xs={12}>
          <TextArea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            label="Remarks"
          />
        </Grid>
      </Popup>
      <Box
        m="40px 0 0 0"
        height="50vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Toolbar>
              <Input
              //   onChange={searchUser}
                label="Search Users"
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
        </Grid>
        {
          students.studentTableAttributes && students.studentTableAttributes.length > 0 &&  <Table
            records={students.studentTablerows}
            headCells={students.studentTableAttributes}
          //   edit={editStudent}
            selected={selected}
            setSelected={setSelected}
            downloadResults={download}
            title="Students"
            showDownloadButton={true}
          //   redirectToDetailsPage={redirectToStudentDetailsPage}
          //   showFilterSection={toggleFilterSection}
            actionButtons={classStudentsIcons}
            actionButtonClick={actionButtonClick}
          />
        }
      </Box>
    </Box>
  )
}

ClassDetails.propTypes = {
  student: PropTypes.object.isRequired,
  getStudents: PropTypes.func.isRequired,
  createRemarks: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
      student: state.student,
      classData: state.class
    }
  }

export default connect(mapStateToProps, {getStudents, createRemarks})(ClassDetails)
