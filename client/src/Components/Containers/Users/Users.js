/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { FormControl, Grid, IconButton, InputAdornment, InputLabel, makeStyles, OutlinedInput, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import MatButton from '../../common/Button'
import Text from '../../common/Text'
import {MdGroupAdd} from 'react-icons/md'
import UserTable from './UserTable'
import {AiFillCloseCircle} from 'react-icons/ai'
import UserForm from './UserForm';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    getUsers,
    getUserForm,
    createUser
} from '../../../redux/actions/userAction';


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


const Users = ({user:{loading, error, message, userTableData, userFormFields, showForm, formDetails}, getUsers, getUserForm, createUser}) => {
    const styles = useStyles();
    const [userObj, setUserObject] = useState({
        attributes: [],
        userData: []
    });
    const [searchInputValue, setSearchInputValue] = useState('');
    const [showUserForm, setShowUserForm] = useState(false)
    const [formFields, setFormsFields] = useState([]);

    const handleSearch = (event) => {
        setSearchInputValue(event.target.value)
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
        getUserForm()
    }

    const fetchUser = () => {
        getUsers()
    }

    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <React.Fragment>
            { showForm && <UserForm fetchUser={fetchUser} createUser={createUser} userInputs={userFormFields} initialUserValues={initialUserValues} />}
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
                <UserTable attributes={userTableData.userAttributes} userData={userTableData.userRows} />
            </Paper>
        </React.Fragment>
    )
}

Users.propTypes = {
    user: PropTypes.object.isRequired,
    getUsers: PropTypes.func.isRequired,
    getUserForm: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps, {getUsers, getUserForm, createUser})(Users)