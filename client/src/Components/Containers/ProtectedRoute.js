import React from 'react'
import Navbar from '../../Pages/Navbar';
import Sidebar from '../../Pages/Sidebar';
import {Route, Switch, Redirect} from 'react-router-dom'
import Dashboard from '../../Pages/Dashboard';
import Fees from './Fees/Fees';
import Exams from './Exams/Exams';
import StudentDetails from './Students/StudentDetails';
import Students from './Students/Students';
import TutorDetails from './Tutors/TutorDetails';
import Tutors from './Tutors/Tutors';
import { makeStyles } from '@material-ui/core';
import Users from './Users/Users';

const useStyles = makeStyles({
    appMain: {
      paddingLeft: '250px',
      width: '100%'
    }
  })

const ProtectedRoute = ({isAuth, component: Component, ...rest}) => {
    const classes = useStyles();
    return (
        <>
             <Sidebar />
              <div className={classes.appMain}>
                <Navbar />
                <Switch>
                  <Route {...rest} render={(props) =>{
                    isAuth ? (
                      <Component />
                    ) : (
                      <Redirect
                        to={{
                          pathname: "/login",
                          state: { from: props.location }
                        }}
                      />
                    )
                  }} />
                  {/* <Route path="/dashboard" exact>
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
                  <Route path="/users">
                    <Users />
                  </Route> */}
                </Switch>
              </div>
        </>
    )
}

export default ProtectedRoute
