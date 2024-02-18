/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
import {
  Grid,
  makeStyles,
  Paper,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {
  fetchAllExams,
  hideNotification
} from '../../../../redux/actions/examAction'
import CMentTabs from "../../../common/Tabs";
import OngoingExams from "./ongoingExams/Loadable";
import Box from '@mui/material/Box';
import CompletedExams from "./completedExams/Loadable";
import CanceledExams from "./canceledExams/Loadable";
import Notification from "../../../common/Alert";

const useStyles = makeStyles((theme) => ({
  paperCotent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  table: {
    width: "1300px",
    "&.MuiTable-root": {
      marginTop: "10px",
    },
  },
  flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: "space-between",
      alignItems: 'center'
  },
}));



const initialExamFormValue = {
  examType: "",
  timeStart: "10.00",
  examDate: new Date(),
  academicYear: "",
  marks: "",
  standard: "",
  subjects: [],
  hours: 1
}

const tabs = [
  {
    label: "OnGoing Exams",
    id: 0
  },
  {
    label: "Completed Exams",
    id: 1
  },
  {
    label: "Canceled Exams",
    id: 2
  }
]

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Exams = ({fetchAllExams, hideNotification, exam: {
  loading, 
  error,
  message,
  severity
}}) => {
  const [tabValue, setTabValue] = useState(0);
  const [filter, setFilter] = useState({status: [1]})
  const abortController = new AbortController();


  useEffect(() => {
    loadExam();
    return () => {
      console.log("Insid the useEffect")
      abortController.abort(); // Cancel the request if component unmounts
    };
  }, [tabValue])

  const loadExam = () => {
    fetchAllExams(filter)
  }

  const handleTabChange = (event, newValue) => {
    if(newValue === 0) {
      setFilter({
        ...filter,
        status: [1,2]
      })
    } else if(newValue === 1) {
      setFilter({
        ...filter,
        status: [3]
      })
    } else if(newValue === 2) {
      setFilter({
        ...filter,
        status: [0]
      })
    }
    setTabValue(newValue);
  };

  return (
    <>
      <Notification
          open={error} 
          handleClose={hideNotification} 
          severity={severity}
          duration={3000} 
          message={message} 
      />
      <CMentTabs tabs={tabs} tabValue={1} handleChange={handleTabChange} value={tabValue}>
        <CustomTabPanel value={tabValue} index={0}>
          <OngoingExams />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={1}>
          <CompletedExams />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={2}>
          <CanceledExams />
        </CustomTabPanel>
      </CMentTabs>
    </>
  );
};

Exams.propTypes = {
  fetchAllExams: PropTypes.func.isRequired,
  hideNotification: PropTypes.func.isRequired,
  exam: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    exam: state.exam
  }
}

export default connect(mapStateToProps, {fetchAllExams, hideNotification})(Exams);