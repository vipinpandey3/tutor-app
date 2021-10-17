import { FormControl, Grid, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, Paper } from '@material-ui/core'
import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import MatButton from '../../Common/Button'
import Text from '../../Common/Text'
import {MdGroupAdd} from 'react-icons/md'
import UserTable from './UserTable'
import { UserContext } from '../../../context/User-context'
import {AiFillCloseCircle} from 'react-icons/ai'
import UserForm from './UserForm';
import {useSelector} from 'react-redux';
import {fetchUser} from '../../../redux/actions/users'


const useStyles = makeStyles((theme) => ({
    paperContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    iconContainer: {
        marginRight: "10px",
        padding: "0px",
        paddingTop: "6px",
        fontSize: "20px"
    }
}))

const initialUserValues = {
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    phone: "",
    pan: "",
    role: "",
    dob: new Date(),
    address: "",
    remarks: ""
}


const Users = () => {
    const styles = useStyles();
    const {getUsers, searchUser, getUserFormFields, createUser} = useContext(UserContext);
    // const loading = useSelector(state => state.loading);
    // const userData = useSelector(state => state.users)
    // const showUserForm = useSelector(state => state.userForm);
    // const message = useSelector(state => state.message);
    // const attributes = useSelector(state => state.userAttributes)
    const [userObj, setUserObject] = useState({
        attributes: [],
        userData: []
    });
    const [searchInputValue, setSearchInputValue] = useState('');
    const [showUserForm, setShowUserForm] = useState(false)
    const [formFields, setFormsFields] = useState([]);

    const handleSearch = (event) => {
        setSearchInputValue(event.target.value)
        searchUser(searchInputValue)
                .then(result => {
                    setUserObject({
                        ...userObj,
                        userData: result.users
                    })
                })
                .catch((err) => {
                    console.log('err')
                })
    }

    const ClearSearchUser = () => {
        setSearchInputValue("")
        getUsers()
            .then(usersObj => {
                setUserObject({
                    attributes: usersObj.attributes,
                    userData: usersObj.userData
                })
            })
            .catch(error => {
                console.log('Error', error)
            })
    }

    const showUserFormFields = () => {
        setShowUserForm(true);
        getUserFormFields()
            .then(result => {
                setFormsFields(result.formAttributes);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const fetchUser = () => {
        getUsers()
            .then(usersObj => {
                // setUserObject({
                //     attributes: usersObj.attributes,
                //     userData: usersObj.userData
                // })
            })
            .catch(error => {
                console.log('Error', error)
            })
    }

    useEffect(() => {
        fetchUser()
        // getUsers()
        //     .then(usersObj => {
        //         setUserObject({
        //             attributes: usersObj.attributes,
        //             userData: usersObj.userData
        //         })
        //     })
        //     .catch(error => {
        //         console.log('Error', error)
        //     })
    }, [])
    return (
        <React.Fragment>
            { showUserForm && <UserForm fetchUser={fetchUser} createUser={createUser} userInputs={formFields} initialUserValues={initialUserValues} />}
            <Paper className={styles.paperContent}>
                <Grid container>
                    <Grid item xs={6}>
                        {/* <Grid> */}
                            <Text variable="subtitle1" component="subtitle1">Fees</Text>
                        {/* </Grid> */}
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item xs={2}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="searchUser">Search User</InputLabel>
                            <OutlinedInput
                                id="searchUser"
                                type='text'
                                className="searchInput"
                                onChange={handleSearch}
                                value={searchInputValue}
                                name="users"
                                style={{width: "283.8"}}
                                endAdornment={
                                    searchInputValue.length ? (
                                        <InputAdornment position="end">
                                            <IconButton
                                            aria-label="Clear Search User"
                                            onClick={ClearSearchUser}
                                            edge="end"
                                            >
                                                <AiFillCloseCircle />
                                            </IconButton>
                                        </InputAdornment>
                                    ) : ""
                                }
                                label="Password"
                            />
                            </FormControl>
                            {/* <input onKeyDown={handleSearch}  className="searchInput" ref={searchRef} name="users"   /> */}
                    </Grid>
                    <Grid item xs={2}>
                        <MatButton  variant="contained" style={{ flex: "1", width: "90%" }} onClick={showUserFormFields}> <span className={styles.iconContainer}><MdGroupAdd /></span> User</MatButton>
                    </Grid>
                </Grid>
                <UserTable attributes={userObj.attributes} userData={userObj.userData} />
            </Paper>
        </React.Fragment>
    )
}

export default Users