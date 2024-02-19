/* eslint-disable array-callback-return */
import { Grid, makeStyles, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import MatButton from '../../common/Button';
import DatePicker from '../../common/DatePicker';
import Input from '../../common/Input';
import Text from '../../common/Text';
import Select from '../../common/Select';

const useStyles = makeStyles((theme) => ({
    paperContent: {
      margin: theme.spacing(5),
      padding: theme.spacing(3),
    },
  }));

const UserForm = (props) => {
    const styles = useStyles()
    const {formTitle, userInputs, initialUserValues, setShowUserForm, createUser, fetchUser} = props
    const [userFormValue, setUserFormValues] = useState(initialUserValues);


    const valueChange = (event) => {
        const {name, value} = event.target;
        setUserFormValues({
            ...userFormValue,
            [name]: value
        })
    }

    const handleCancle = () => {
        setShowUserForm(false);
    }

    const formSubmit = (event) => {
        console.log('userFormValue', userFormValue)
        createUser(userFormValue)
            .then((result) => {
                console.log('Result', result)
                if(result.resultShort === "success") {
                    setUserFormValues(false);
                    userFormValue(initialUserValues);
                    fetchUser();
                }
            })
            .catch((error) => {
                console.log("error", error);
            })
        event.preventDefault();
    }
    return (
        <Paper className={styles.paperContent}>
            <form onSubmit={formSubmit}>
                <Grid container>
                    <Grid item xs={3}>
                    <Text variant="subtitle1" component="h6">
                        {formTitle}
                    </Text>
                    </Grid>
                </Grid>
                <Grid container style={{ paddingTop: "10px" }}>
                    {userInputs.map((input) => {
                    if (input.type === "date") {
                        return (
                        <Grid
                            key={input.id}
                            item
                            xs={3}
                            style={{paddingTop: '10px'}}
                            className={styles.contentMargin}
                        >
                            <DatePicker
                            style={{ width: "90%" }}
                            name={input.name}
                            value={userFormValue[input.name]}
                            onChange={valueChange}
                            label={input.label}
                            />
                        </Grid>
                        );
                    } else if (input.type === "input") {
                        return (
                        <Grid
                            key={input.id}
                            item
                            xs={3}
                            className={styles.contentMargin}
                            style={{paddingTop: '10px'}}
                        >
                            <Input
                            style={{ width: "90%" }}
                            size="medium"
                            name={input.name}
                            valur={userFormValue[input.name]}
                            label={input.label}
                            onChange={valueChange}
                            />
                        </Grid>
                        );
                    }
                    else if(input.type === 'select') {
                        return (
                          <Grid key={input.id} item xs={3} className={styles.contentMargin}  style={{paddingTop: '10px'}}>
                              {/* <DatePicker style={{ width: "90%" }} name={input.name} value={formValue[input.name]} onChange={valueChange} label={input.label}/> */}
                            <Select style={{width: "90%"}} value={userFormValue[input.name]} name={input.name} label={input.label} onChange={valueChange} options={input.options} />
                          </Grid>
                        )
                      }
                    })}
                </Grid>
                <Grid container style={{ paddingTop: "10px" }}>
                    <Grid item sm></Grid>
                    <Grid item xs={2}>
                    <MatButton
                        variant="outlined"
                        style={{ flex: "1", width: "90%" }}
                        color="primary"
                        type="button"
                        onClick={handleCancle}
                        size="large"
                    >
                        Cancle
                    </MatButton>
                    </Grid>
                    <Grid item xs={2}>
                    <MatButton
                        variant="contained"
                        style={{ flex: "1", width: "90%" }}
                        color="primary"
                        type="submit"
                        size="large"
                    >
                        Create User
                    </MatButton>
                    </Grid>
                </Grid>
                </form>
        </Paper>
    )
}

export default UserForm
