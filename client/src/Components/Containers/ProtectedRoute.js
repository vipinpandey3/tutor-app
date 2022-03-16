import React from 'react'
// import Navbar from '../../Pages/Navbar';
// import Sidebar from '../../Pages/Sidebar';
import {Route, Redirect} from 'react-router-dom'
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
    appMain: {
      paddingLeft: '250px',
      width: '100%'
    }
  })

const ProtectedRoute = ({Component: Component, isAuth, ...rest}) => {
    const classes = useStyles();
    console.log('IsAuth', isAuth);
    return (
        <>
             {/* <Sidebar />
              <div className={classes.appMain}>
                <Navbar /> */}
                {/* <Switch> */}
                  <Route {...rest} render={(props) =>{
                    !isAuth ? (
                      <Redirect to='/login' />
                    ) : (
                      <Component {...props} />
                    )
                  }} />
                  
                {/* </Switch> */}
              {/* </div> */}
        </>
    )
}

export default ProtectedRoute
