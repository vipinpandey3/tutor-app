import React from 'react'
import {Route, Redirect} from 'react-router-dom'

const ProtectedRoute = ({Component: component, isAuth, ...rest}) => {
  return (
    <Route {...rest} render={(props) =>{isAuth ? (<component {...props} />) : (<Redirect to='/' />)
    }} />
  )
}

export default ProtectedRoute
