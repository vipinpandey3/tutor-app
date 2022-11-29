import { Grid, makeStyles, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import MatButton from '../Components/Common/Button'
import Input from '../Components/Common/Input';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    login,
    removeAuthToken,
    hideNotification
} from '../redux/actions/authAction'
import Notification from '../Components/Common/Alert';

const useStyles = makeStyles((theme) => ({
    paperContent: {
        width: '400px',
        margin: "15% 25%",
        padding: theme.spacing(4),
    },
}))

const Login = ({auth: {isAuth, token, error, message}, login, removeAuthToken, hideNotification}) => {
    const styles = useStyles();
    const [formValues, setFormValues] = useState({
        emailId: "",
        password: ""
    })

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        login(formValues);
    }

    return (
        <>
            <Notification 
                open={error} 
                handleClose={hideNotification} 
                severity="error" 
                duration={6000} 
                message={message} 
            />
            <Paper className={styles.paperContent}>
                <form onSubmit={submitHandler}>
                    <Grid container>
                        <Grid item xs={12} style={{marginTop: "20px"}}>
                            <Input value={formValues.emailId} name="emailId" style={{width: '100%'}} onChange={handleInputChange} label="Email Id" />
                        </Grid>
                        <Grid item sm={12} style={{marginTop: "20px"}}>
                            <Input value={formValues.password} name="password" style={{width: '100%'}} onChange={handleInputChange} label="Password" type="password" />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} style={{marginTop: "20px"}}>
                            <MatButton color="primary" style={{width: '100%'}} variant="contained" type="submit" size="large">Login</MatButton>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    )
}

Login.propTypes= {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    removeAuthToken: PropTypes.func.isRequired,
    hideNotification: PropTypes.func.isRequired
}

const mapStateToProps =state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {login, removeAuthToken, hideNotification})(Login)
