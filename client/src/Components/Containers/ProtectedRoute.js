import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({Component: component, ...rest}) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  console.log("isAuth", isAuth);
  return (
    <Route 
      {...rest} render={(props) =>{isAuth ? (<component {...props} />) : (<Redirect to='/login' />)
    }} />
  )
}

export default ProtectedRoute
