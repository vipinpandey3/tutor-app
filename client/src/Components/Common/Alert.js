/* eslint-disable no-unused-vars */
import React from 'react'
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Notification = ({open, handleClose, severity, duration, message}) => {
    const [position, setPosition] = React.useState({
        vertical: 'top',
        horizontal: 'center',
    });
    const {vertical, horizontal} = position

  return (
    <Snackbar  anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
  )

}

export default Notification