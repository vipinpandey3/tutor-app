import { Grid, makeStyles, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import MatButton from '../Components/Common/Button'
import Input from '../Components/Common/Input'
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    login,
    removeAuthToken
} from '../redux/actions/authAction'

const useStyles = makeStyles((theme) => ({
    paperContent: {
        width: '400px',
        margin: "10% auto",
        padding: theme.spacing(4)
    },
}))

const Login = ({auth: {isAuth, token}, login, removeAuthToken}) => {
    const styles = useStyles();
    const [emailId, setEmaildId] = useState('');
    const [password, setPassword] = useState()
    // useEffect(() => {
    //     removeAuthToken()
    // }, [])
    const handleEmailId = (e) => {
        setEmaildId(e.target.value);
    }

    const handlePaswordInput = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const loginObj =  {
            emailId: emailId,
            password: password
        }
        login(loginObj)
        // if(isAuth) {
        //     return history.push('/dashboard')
        // }
    }
    return (
        <Paper className={styles.paperContent}>
            <form onSubmit={submitHandler}>
                <Grid container>
                    <Grid item xs={12} style={{marginTop: "20px"}}>
                        <Input value={emailId} style={{width: '100%'}} onChange={handleEmailId} label="Email Id" />
                    </Grid>
                    <Grid item sm={12} style={{marginTop: "20px"}}>
                        <Input value={password} style={{width: '100%'}} onChange={handlePaswordInput} label="Password" type="password" />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} style={{marginTop: "20px"}}>
                        <MatButton color="primary" style={{width: '100%'}} variant="contained" type="submit" size="large">Login</MatButton>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

Login.propTypes= {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    removeAuthToken: PropTypes.func.isRequired
}

const mapStateToProps =state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {login, removeAuthToken})(Login)
