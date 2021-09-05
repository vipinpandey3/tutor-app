import { Accordion, AccordionDetails, AccordionSummary, Chip, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Text from '../../Common/Text';
import TutorRecords from './TutorRecords';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TeacherAttendenceTable from './TeacherAttendenceTable';

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
    const [tutorsRecords, setTutorRecords] = useState({})

    const getTutorDetails = (id) => {
        const newArray = TutorRecords.filter(records => {
            if(records.id === parseInt(id) ) {
                return records
            }
        })
        console.log("newArray", newArray[0])
        setTutorRecords(newArray[0]);
    }
    useEffect(() => {
        getTutorDetails(tutorId);
    }, [tutorId]);

    const handleDelete = () => {
        console.log('TEsting');
    }
    return (
        <>
            <Paper className={styles.paperContent}>
                <Grid container>
                    <Grid item xs={3}>
                        <Text variant="subtitle1" component="subtitle1">
                            Tutor Name:
                        </Text>
                        <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                            {tutorsRecords.fullName}
                        </Text>
                    </Grid>
                    <Grid item xs={3}>
                        <Text variant="subtitle1" component="subtitle1">
                            Tutor Id:
                        </Text>
                        <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                            10215A
                        </Text>
                    </Grid>
                    <Grid item xs={3}>
                        <Text variant="subtitle1" component="subtitle1">
                            Tutor Email:
                        </Text>
                        <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                            {tutorsRecords.email}
                        </Text>
                    </Grid>
                    <Grid item xs={3}>
                        <Text variant="subtitle1" component="subtitle1">
                            Tutor Mobile:
                        </Text>
                        <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                            {tutorsRecords.mobile}
                        </Text>
                    </Grid>
                    <Grid item xs={3}>
                        <Text variant="subtitle1" component="subtitle1">
                            Tutor Department:
                        </Text>
                        <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                            {tutorsRecords.department}
                        </Text>
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={styles.paperContent}>
                <Grid container className={styles.columnContainer}>
                    <Grid item xs={12}>
                        <Text variant="subtitle1" component="subtitle1">
                            Tutor Educational Details
                        </Text>
                    </Grid>
                    <hr></hr>
                    {/* className="padding_top_10" */}
                    <Grid container className={`${styles.flexcontainer} 'padding_top_10'`}>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Graduation Type: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Post Graduation
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Degree 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Master of Science
                            </Text>
                        </Grid>
                        <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Institute/University: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                University of Mumbai
                            </Text>
                        </Grid>
                        <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Passing Year:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                2023/2024
                            </Text>
                        </Grid>
                        <Grid item xs={5} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Specialization:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Computer Science
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Digital Signal Processing and Image processing:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                            Embedded Systems:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Data Mining and Data Warehousing
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A
                            </Text>
                        </Grid><Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Artificial Intelligence, Neural Networks and Intelligent Systems:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A+
                            </Text>
                        </Grid>
                        <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Bioinformatics
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A
                            </Text>
                        </Grid>
                    </Grid>
                    <hr></hr>
                    <Grid container className={`${styles.flexcontainer} 'padding_top_10'`}>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Graduation Type: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Graduation
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Degree 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Bachelor of Science
                            </Text>
                        </Grid>
                        <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Institute/University: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                University of Mumbai
                            </Text>
                        </Grid>
                        <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Passing Year:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                2018/2019
                            </Text>
                        </Grid>
                        <Grid item xs={5} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Specialization:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Computer Science
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Data Communication, Networking & Security
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A
                            </Text>
                        </Grid>
                        <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Advance Java:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A
                            </Text>
                        </Grid>
                        <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Operating Systems & Linux:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A
                            </Text>
                        </Grid><Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                DBMS II and Software Engineering:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A+
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Principle of Web Design and Web Technologies:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A
                            </Text>
                        </Grid>
                        <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Do Net Technologies:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                A
                            </Text>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={styles.paperContent}>
                <Grid container className={styles.columnContainer}>
                    <Grid container className={`${styles.flexcontainer} 'padding_top_10'`}>
                        <Grid item xs={9}>
                            <Text variant="subtitle1" component="subtitle1">
                                Tutor Experience
                            </Text>
                        </Grid>
                        <Grid item xs={3}>
                            <Text variant="subtitle1" component="subtitle1">
                                Total Experience
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                2 Year, 11 Months
                            </Text>
                        </Grid>
                    </Grid>
                    <hr></hr>
                    <Grid container className={`${styles.flexcontainer} 'padding_top_10'`}>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Coaching/Institute Name: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Kalra Shukla Classes
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                City/Branch: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Mumbai, Charni Road
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                From - To: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Feb-2017 - June-2018
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Experince in Months: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                17 Months
                            </Text>
                        </Grid>
                        <Grid item xs={12} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Summary: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                At Kalra Shukla I was teaching as the Faculty Teacher. My subject were Database Management System and Advance Algorithm
                            </Text>
                        </Grid>
                    </Grid>
                    <hr></hr>
                    <Grid container className={`${styles.flexcontainer} 'padding_top_10'`}>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Coaching/Institute Name: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Pratik Dhaval' Learning curve
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                City/ Branch: 
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                Mumbai, Charni Road, C. P Tank
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                From - To:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                June-2016 - Nov-2017
                            </Text>
                        </Grid>
                        <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Experince in Months:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                18 Months
                            </Text>
                        </Grid>
                        <Grid item xs={12} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Summary:
                            </Text>
                            <Text variant="subtitle1" component="subtitle1" className={styles.block}>
                                At PDLC I was teaching as the non-Faculty Teacher. My subject were Basic Maths and Advance Maths 
                            </Text>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
            <Accordion className={`${styles.accordionContent}`}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Text className={styles.heading}> Education Details</Text>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container className={styles.flexContainer}>
                            <Grid item xs={12}>
                                Filtered By:
                            </Grid>
                            <Grid item xs={12}>
                                <Chip
                                    className={styles.mrl5}
                                    label="Start Date: 01 Aug 2021"
                                    // onClick={handleClick}
                                    // onDelete={handleDelete}
                                />
                                <Chip
                                    label="Start Date: 03 Aug 2021"
                                    // onClick={handleClick}
                                    // onDelete={handleDelete}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TeacherAttendenceTable />
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
        </>
    )
}

export default TutorDetails
