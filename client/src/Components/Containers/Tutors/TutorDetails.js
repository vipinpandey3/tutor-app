import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Text from '../../Common/Text';
import TutorRecords from './TutorRecords';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TeacherAttendenceTable from './TeacherAttendenceTable';
import { TutorContext } from '../../../context/tutor-context';

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
    }
}))

const TutorDetails = () => {
    const styles = useStyles()
    const params = useParams();
    const {tutorId} = params;
    const {getTutorDetails} = useContext(TutorContext)
    const [details, setDetails] = useState({
        tutorDetails: {},
        tutorDetailsAttributes: []
    })

    const fetchTutorDetails = () => {
        getTutorDetails(tutorId)
            .then(result => {
                if(result.resultShort === "success") {
                    setDetails({
                        tutorDetails: result.data,
                        tutorDetailsAttributes: result.attributes
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
                        console.log("Detail", details)
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
       </>
    )
}

export default TutorDetails