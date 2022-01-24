import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Text from '../../Common/Text';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TeacherAttendenceTable from './TeacherAttendenceTable';
import { TutorContext } from '../../../context/tutor-context';
import MatButton from '../../Common/Button';
import AddIcon from "@material-ui/icons/Add";
import { EducationForm } from './TutorRelatedForm';

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
            // margin: theme.spacing(2),
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

const TutorDetails = () => {
    const styles = useStyles()
    const params = useParams();
    const {tutorId} = params;
    const {getTutorDetails, fetchTutorEducationFormFields} = useContext(TutorContext)
    const [details, setDetails] = useState({
        tutorDetails: {},
        tutorDetailsAttributes: [],
        educationDetails: [],
        educationAttrbutes: []
    });
    const [educationFormValues, setEducationFormValues] = useState(educationInitialValue)
    const [formFields, setFormFields] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formDetails, setFormDetails] = useState({
        title: "Add Education",
        buttonName: 'Submit',
        editFlag: false
    })
    

    const fetchTutorDetails = () => {
        getTutorDetails(tutorId)
            .then(result => {
                if(result.resultShort === "success") {
                    setDetails({
                        tutorDetails: result.data,
                        tutorDetailsAttributes: result.attributes,
                        educationDetails: result.data.TutorEducationDetails,
                        educationAttrbutes: result.educationAttributes
                    })
                }
            })
            .catch(error => {
                console.log("Error", error)
            })
    }
    useEffect(() => {
        fetchTutorDetails();
    }, []);

    const addTutorEducation = () => {
        fetchTutorEducationFormFields()
            .then(result => {
                if(result.resultShort === 'success') {
                    setFormFields(result.formFields)
                    setFormDetails({
                        title: "Add Education",
                        buttonName: 'Submit',
                        editFlag: false
                    })
                    setShowForm(true)
                }
            })
    }

    const toggleFormDetails = (flag = false, detaildObj) => {
        setShowForm(flag)
        setFormDetails(detaildObj);
    }

    const editEducationDetails = (id) => {
        fetchTutorEducationFormFields()
            .then(result => {
                if(result.resultShort === 'success') {
                    setFormFields(result.formFields)
                    const editArray = details.educationDetails.filter(detail => {
                        return detail.id === id
                    })
                    setEducationFormValues(editArray[0]);
                    toggleFormDetails(true, {
                        title: "Edit Education Education",
                        buttonName: 'Edit',
                        editFlag: true
                    });
                }
            })
    }

    const hideForm = () => {
        console.log('Button CLicked')
        toggleFormDetails(false, {
            title: "Edit Education Education",
            buttonName: 'Edit',
            editFlag: true
        });
        setIntialValue()
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
                    details.tutorDetailsAttributes && 
                    details.tutorDetailsAttributes.length > 0 &&
                    details.tutorDetailsAttributes.map(detail => {
                        return (
                            <Grid item xs={detail.size} className={styles[detail.class]}>
                                <Text variant="subtitle1">
                                    {detail.name}:
                                </Text>
                                <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                    {
                                        details.tutorDetails[detail.id] ?
                                        details.tutorDetails[detail.id] : "-"
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
                        formFields={formFields}
                        formDetails={formDetails}
                        educationInitialValue={educationFormValues}
                        tutorId={tutorId}
                        toggleFormDetails={toggleFormDetails}
                        setIntialValue={setIntialValue}
                        hideForm={hideForm}
                        fetchTutorDetails={fetchTutorDetails}
                    />
                </Paper>
            )
        }
        <Paper className={styles.paperContent}>
            <Grid container>
                <Grid item xs={6}>
                    <Text variant="subtitle1" component="subtitle1">
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
                details.educationDetails ? 
                details.educationDetails.map(detail => {
                    return (
                        <div key={detail.id}>
                            <Grid container>
                                {
                                    details.educationAttrbutes.map((attributes) => {
                                        return (
                                            <Grid item xs={attributes.size} className={`${styles[attributes.class]} ${styles.paddingTop}`}>
                                                <Text>
                                                {attributes.name}: 
                                                </Text>
                                                <Text 
                                                variant="subtitle1"
                                                component="h6"
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

export default TutorDetails