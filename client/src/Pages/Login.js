import { Grid, makeStyles, Paper } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import MatButton from '../Components/Common/Button'
import Input from '../Components/Common/Input'
import {useHistory, Redirect} from 'react-router-dom'
import { AuthContext } from '../context/auth-context'

const useStyles = makeStyles((theme) => ({
    paperContent: {
        width: '400px',
        margin: "10% auto",
        padding: theme.spacing(4)
    },
}))

const Login = (props) => {
    const styles = useStyles();
    let history = useHistory()
    const [emailId, setEmaildId] = useState('');
    const [password, setPassword] = useState()
    // const {loginHandler, setIsAuthenticated} = props
    const {login} = useContext(AuthContext)
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
            .then(result => {
                return history.push('/dashboard')
            })
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

export default Login
