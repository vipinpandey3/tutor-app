import { Grid, makeStyles, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import MatButton from '../Components/Common/Button'
import Input from '../Components/Common/Input'
import {useHistory, Redirect} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    paperContent: {
        width: '400px',
        margin: "10% auto",
        padding: theme.spacing(4)
    },
}))

const Login = (props) => {
    const styles = useStyles();
    const history = useHistory()
    const [emailId, setEmaildId] = useState('');
    const [password, setPassword] = useState()
    const {setTokenState} = props
    const handleEmailId = (e) => {
        setEmaildId(e.target.value);
    }

    const handlePaswordInput = (e) => {
        setPassword(e.target.value)
    }

    const LoginHandler = async(userObj) => {
        setTokenState(false)
        const response = await fetch('http://localhost:5000/login', {
            headers: {
                'Accept': "application/json",
                "Content-Type": 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(userObj)
        })
        if(!response.ok) {
            throw new Error('Something Went Wrong');
        }
        const data = await response.json();
        return data
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const loginObj =  {
            emailId: emailId,
            password: password
        }
        LoginHandler(loginObj)
            .then(data => {
                if(data.resultShort === "failure") {
                    console.log('Err', data.resultLong)
                } else {
                    localStorage.setItem('token', data.authKey);
                    console.log('ResultLong', data.resultLong);
                    setTokenState(true);
                    return <Redirect to="/login" />
                    // window.location.reload();
                }
            })
            .catch(err => {
                console.log('err', err);
            })
    }

    return (
        <Paper className={styles.paperContent}>
            <form onSubmit={submitHandler}>
                <Grid container>
                    <Grid item xs={12} style={{marginTop: "20px"}}>
                        <Input value={emailId} style={{width: '100%'}} name="emaildId" onChange={handleEmailId} label="Email Id" />
                    </Grid>
                    <Grid item sm={12} style={{marginTop: "20px"}}>
                        <Input value={password} style={{width: '100%'}} name="password" onChange={handlePaswordInput} label="Password" type="password" />
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

export default Login
