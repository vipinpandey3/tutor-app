import React from 'react'
import Navbar from '../../Pages/Navbar';
import Sidebar from '../../Pages/Sidebar';
import {Switch, Route} from 'react-router-dom'
import Dashboard from '../../Pages/Dashboard';
import Fees from './Fees/Fees';
import Exams from './Exams/Exams';
import StudentDetails from './Students/StudentDetails';
import Students from './Students/Students';
import TutorDetails from './Tutors/TutorDetails';
import Tutors from './Tutors/Tutors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    appMain: {
      paddingLeft: '250px',
      width: '100%'
    }
  })

const Routes= (props) => {
    const classes = useStyles();
    const {tokenState} = props;
    return (
        <>
            {tokenState && <Sidebar />}
            <div className={classes.appMain}>
                {tokenState && <Navbar  />}
                <Switch >
                
                <Route path="/dashboard" exact>
                  <Dashboard />
                </Route>
                <Route path="/tutors" exact>
                  <Tutors />
                </Route>
                <Route path="/tutors/:tutorId" exact>
                  <TutorDetails />
                </Route>
                <Route path="/students" exact>
                  <Students />
                </Route>
                <Route path="/students/:studentId" exact>
                  <StudentDetails />
                </Route>
                <Route path="/exams" exact>
                  <Exams />
                </Route>
                <Route path="/fees" exact>
                  <Fees />
                </Route>
                <Route path="*" >
                  <Dashboard />
                </Route>
              </Switch>
            </div>
        </>
    )
}

export default Routes
