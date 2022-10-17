/* eslint-disable no-unused-vars */
import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Text from '../../Common/Text';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TeacherAttendenceTable from './TeacherAttendenceTable';
import { TutorContext } from '../../../context/tutor-context';
import MatButton from '../../Common/Button';
import AddIcon from "@material-ui/icons/Add";
import EducationForm from './TutorRelatedForm';
import {connect} from 'react-redux';
import {fetchTutorDetails, fetchTutorEducationFormFields, toggleForm} from '../../../redux/actions/tutorAction';
import PropTypes from 'prop-types'

const useStyles = makeStyles(theme => ({
    paperContent: {
        padding: theme.spacing(3),
        margin: theme.spacing(2)
    },
    flexcontainer: {
        display: "flex",
        flexDirection: "row-wrap",
    },
    block: {
        fontWeight: "900",
        paddingLeft: theme.spacing(1),
    },
    columnContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    paddingTop: {
        paddingTop: "10px"
    },
    accordionContent: {
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        '&.MuiAccordion-root.Mui-expanded': {
            padding: theme.spacing(1.1),
        }
    },
    mrl5: {
        margin: "0 10px"
    },
    alignRight: {
        marginLeft: '119px'
    }
}))

const educationInitialValue = {
    std: "",
    seatNumber: "",
    year: "",
    totalMarks: "",
    instituteName: "",
    universityName: "",
    percentage: "",
  };

const TutorDetails = (props) => {
    const {tutor: {
            tutorDetails,
            educationFormFields,
            showForm,
            formDetails
        }, 
        fetchTutorDetails, 
        fetchTutorEducationFormFields,
        toggleForm
    } = props
    const styles = useStyles()
    const params = useParams();
    const {tutorId} = params;
    const [educationFormValues, setEducationFormValues] = useState(educationInitialValue)
    

    const loadTutorDetails = () => {
        fetchTutorDetails(tutorId);
    }

    useEffect(() => {
        loadTutorDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addTutorEducation = () => {
        fetchTutorEducationFormFields({title: "Add Education", buttonName: 'Submit', editFlag: false})
    }

    const toggleFormDetails = (flag = false, detaildObj) => {
        // setShowForm(flag)
        // setFormDetails(detaildObj);
    }

    const editEducationDetails = (id) => {
        const editArray = tutorDetails.educationDetails.filter(detail => {
            return detail.id === id
        })
        setEducationFormValues(editArray[0])
        fetchTutorEducationFormFields({title: "Edit Education", buttonName: 'Edit',editFlag: true})
    }

    const hideForm = () => {
        const postObj = {
            showFlag: false, 
            editFlag: false, 
            formName: "Add Tutor Education", 
            buttonName: 'Submit'
        }
        toggleForm(postObj);
        setIntialValue();
    }

    const setIntialValue = () => {
        setEducationFormValues(educationInitialValue)
    }

    const handleDelete = () => {
        console.log('Testing');
    }
    return (
       <>
        <Paper className={styles.paperContent}>
            <Grid container>
                {
                    tutorDetails.tutorDetailsAttributes && 
                    tutorDetails.tutorDetailsAttributes.length > 0 &&
                    tutorDetails.tutorDetailsAttributes.map(detail => {
                        return (
                            <Grid item xs={detail.size} className={styles[detail.class]}>
                                <Text>
                                    {detail.name}:
                                </Text>
                                <Text className={styles.block}>
                                    {
                                        tutorDetails.tutorData[detail.id] ?
                                        tutorDetails.tutorData[detail.id] : "-"
                                    }
                                </Text>
                            </Grid>
                        )
                    }) 
                }
            </Grid>
        </Paper>
        {
            showForm && (
                <Paper className={styles.paperContent}>
                    <EducationForm
                        formFields={educationFormFields}
                        formDetails={formDetails}
                        educationInitialValue={educationFormValues}
                        tutorId={tutorId}
                        toggleFormDetails={toggleFormDetails}
                        setIntialValue={setIntialValue}
                        hideForm={hideForm}
                        fetchTutorDetails={loadTutorDetails}
                    />
                </Paper>
            )
        }
        <Paper className={styles.paperContent}>
            <Grid container>
                <Grid item xs={6}>
                    <Text >
                        Tutor Educational Details
                    </Text>
                </Grid>
                <Grid item xs={6}>
                    <MatButton
                        className={styles.alignRight}
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={addTutorEducation}
                        >
                            Add Tutor Education Details
                    </MatButton>
                </Grid>
            </Grid>
            <hr></hr>
            {
                tutorDetails.educationDetails ? 
                tutorDetails.educationDetails.map(detail => {
                    return (
                        <div key={detail.id}>
                            <Grid container>
                                {
                                    tutorDetails.educationAttrbutes.map((attributes) => {
                                        return (
                                            <Grid item xs={attributes.size} className={`${styles[attributes.class]} ${styles.paddingTop}`}>
                                                <Text>
                                                {attributes.name}: 
                                                </Text>
                                                <Text 
                                                className={styles.block}
                                                >
                                                {
                                                    detail[attributes.id] ?
                                                    detail[attributes.id] : "-"
                                                }
                                                </Text>
                                        </Grid>
                                        )
                                    })
                                }
                                <Grid item xs={3} className={`${styles.flexcontainer}`}>
                                    <MatButton
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => editEducationDetails(detail.id)}
                                    >
                                        Edit Details
                                    </MatButton>
                                    </Grid>
                            </Grid>
                            <hr></hr>
                        </div>
                    )
                })
                : (
                    <p>No details found</p>
                )
            }
        </Paper>
       </>
    )
}

TutorDetails.prototype = {
    tutorDetails: PropTypes.object.isRequired,
    fetchTutorDetails: PropTypes.func.isRequired,
    fetchTutorEducationFormFields: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    tutor: state.tutor
})

export default connect(mapStateToProps, {fetchTutorDetails, fetchTutorEducationFormFields, toggleForm})(TutorDetails)