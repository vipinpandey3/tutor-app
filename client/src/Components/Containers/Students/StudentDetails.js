import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AccordionSummary, makeStyles, Paper, Typography, Accordion, AccordionDetails, Table, TableCell, TableHead, TableRow, TableSortLabel, TableBody, } from '@material-ui/core'
import { Grid } from '@material-ui/core';
import Text from '../../Common/Text';
import StudentsRecords from './StudentsRecords';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
    paperContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(3),
        '&.MuiAccordion-root.Mui-expanded': {
            margin: theme.spacing(2)
        }
    },
    flexcontainer: {
        display: "flex",
        flexDirection: "row",
    },
    block: {
        fontWeight: "900",
        paddingLeft: theme.spacing(1),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    columnContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    noPadding: {
        padding: "0px"
    },
    paddingTop: {
        paddingTop: "10px"
    },
    "MuiAccordion-root": {
        paddingTop: "5px"
    }
}));

const feesHeaders = ['Date', 'Fees Amount', 'Discount Amount', "Paid Fees", 'Remaining Fees'];

const FeesArray = [
    {
        id: 1,
        feesAmount: 50000,
        discountedFees: 2000,
        paidFees: 5000,
        remainingFees: 43000,
        date: "21/10/2020"
    },
    {
        id: 2,
        feesAmount: 50000,
        paidFees: 10000,
        remainingFees: 33000,
        date: "21/12/2020",
        discountedFees: '-'
    },
    {
        id: 3,
        feesAmount: 50000,
        paidFees: 5000,
        remainingFees: 28000,
        date: "21/12/2020",
        discountedFees: '-'
    }
]

const StudentDetails = () => {
    const [studentRecord, setStudentRecord] = useState({});
    const [totalPaid, setTotalPaid] = useState(0)
    const styles = useStyles()
    const params = useParams();
    const { studentId } = params;

    const getStudentDetails = (studentId) => {
        // let studentRecordArray = StudentsRecords.filter((record) => {
        //     return record.id === studentId
        // });
        // setStudentRecord(studentRecordArray[0]);
        let newArray = StudentsRecords.filter(x => x.id === studentId);
        console.log("newArray", newArray);
        setStudentRecord(newArray[0]);
    }
    useEffect(() => {    
        getStudentDetails(studentId)
        const totalPaid = FeesArray.reduce((accumulatedPaid, currentPaid) => {
            let total = accumulatedPaid + currentPaid.paidFees
            return total
        }, 0)
        setTotalPaid(totalPaid)
    }, [studentId])
    return (
        <>
            <Paper className={`${styles.paperContent} `}>
                <Grid container>
                    <Grid item xs={2} className={styles.flexcontainer}>
                        <Text variant="subtitle1" component="subtitle1">
                            FullName: 
                        </Text>
                        <Text variant="subtitle1" component="h6" className={styles.block}>
                            Vipin Pandey
                        </Text>
                    </Grid>
                    <Grid item xs={3} className={styles.flexcontainer}>
                        <Text variant="subtitle1" component="subtitle1">
                            Email: 
                        </Text>
                        <Text variant="subtitle1" component="h6" className={styles.block}>
                            vipinpandey530@gmail.com
                        </Text>
                    </Grid>
                    <Grid item xs={2} className={styles.flexcontainer}>
                        <Text variant="subtitle1" component="subtitle1">
                            Contact: 
                        </Text>
                        <Text variant="subtitle1" component="h6" className={styles.block}>
                            8652521189
                        </Text>
                    </Grid>
                    <Grid item xs={2} className={styles.flexcontainer}>
                        <Text variant="subtitle1" component="subtitle1">
                            Stream: 
                        </Text>
                        <Text variant="subtitle1" component="h6" className={styles.block}>
                            Science
                        </Text>
                    </Grid>
                    <Grid item xs={3} className={styles.flexcontainer}>
                        <Text variant="subtitle1" component="subtitle1">
                            DOB: 
                        </Text>
                        <Text variant="subtitle1" component="h6" className={styles.block}>
                            21-12-1995
                        </Text>
                    </Grid>
                    <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                        <Text variant="subtitle1" component="subtitle1">
                            Address: 
                        </Text>
                        <Text variant="subtitle1" component="h6" className={styles.block}>
                            88/01, Ardeshir dady street, C. P. Tank, Mumbai: 400004
                        </Text>
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={styles.paperContent}>
                <Grid container className={styles.columnContainer}>
                    <Grid item xs={12} >
                        <Text className={`${styles.block} ${styles.noPadding}`}>
                            Parents Details
                        </Text>
                    </Grid>
                    <Grid container >
                        <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Father Name: 
                            </Text>
                            <Text variant="subtitle1" component="h6" className={styles.block}>
                                Rambachan Pandey
                            </Text>
                        </Grid>
                        <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Father Education: 
                            </Text>
                            <Text variant="subtitle1" component="h6" className={styles.block}>
                                HSC
                            </Text>
                        </Grid>
                        <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Father Mobile: 
                            </Text>
                            <Text variant="subtitle1" component="h6" className={styles.block}>
                                9321475789
                            </Text>
                        </Grid>
                    </Grid>
                    <Grid container >
                        <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Mother Name: 
                            </Text>
                            <Text variant="subtitle1" component="h6" className={styles.block}>
                                Satyrupa Pandey
                            </Text>
                        </Grid>
                        <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Mother Education: 
                            </Text>
                            <Text variant="subtitle1" component="h6" className={styles.block}>
                                HSC
                            </Text>
                        </Grid>
                        <Grid item xs={4} className={`${styles.flexcontainer} pt_5`}>
                            <Text variant="subtitle1" component="subtitle1">
                                Father Mobile: 
                            </Text>
                            <Text variant="subtitle1" component="h6" className={styles.block}>
                                9321475789
                            </Text>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
               <Accordion className={`${styles.paperContent} ${styles.noPadding}`}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography className={styles.heading}>Student Education Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container className={styles.columnContainer}>
                            <Grid container>
                                <Grid item xs={6} className={styles.flexcontainer}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        FullName: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        Vipin Rambachan Pandey
                                    </Text>
                                </Grid>
                            </Grid>
                            <hr></hr>
                            <Grid>
                                <Grid container className="padding_top_10">
                                    <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Standard: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            HSC/12th
                                        </Text>
                                    </Grid>
                                    <Grid item xs={6} className={`${styles.flexcontainer} `}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Year: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            2012-2013
                                        </Text>
                                    </Grid>
                                    <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Institute/College Name: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            Elphinstone College
                                        </Text>
                                    </Grid>
                                    <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Seat Number: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            M039153
                                        </Text>
                                    </Grid>
                                    <Grid item xs={12} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1" className={`${styles.block} ${styles.noPadding}`}>
                                            Final Exam Subject & Score Cards 
                                        </Text>
                                    </Grid>
                                </Grid>
                                <Grid container className="ptb_10">
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            English: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            54/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            French: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            46/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            MathMatics & Statistics: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            43/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Physics: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            46/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Chemistry: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            58/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Biology:
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            47/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Environment Education:
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            A
                                        </Text>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr></hr>
                            <Grid container className="padding_top_10">
                                <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Standard: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        SSC
                                    </Text>
                                </Grid>
                                <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Year: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        2010-2011
                                    </Text>
                                </Grid>
                                <Grid item xs={12} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Institute/Name: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        Marwadi Vidyalaya High school
                                    </Text>
                                </Grid>
                                <Grid item xs={12} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1" className={`${styles.block} ${styles.noPadding}`}>
                                        Final Exam Subject & Score Cards 
                                    </Text>
                                </Grid>
                            </Grid>
                            <Grid container className="padding_top_10">
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Hindi: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        86/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        English: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        79/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Marathi: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        70/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        MathMatics: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        131/150
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Science & Technology: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        86/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Social Science: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        81/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Information & Technology:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        A
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Health & Physical Education:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        B
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Socail Service:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        A
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Personality Development:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        A
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Environment Education:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        A
                                    </Text>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={`${styles.paperContent} ${styles.noPadding}`}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    >
                    <Typography className={styles.heading}>Student Education Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container className={styles.columnContainer}>
                            <Grid container>
                                <Grid item xs={6} className={styles.flexcontainer}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        FullName: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        Vipin Rambachan Pandey
                                    </Text>
                                </Grid>
                            </Grid>
                            <hr></hr>
                            <Grid>
                                <Grid container className="padding_top_10">
                                    <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Standard: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            HSC/12th
                                        </Text>
                                    </Grid>
                                    <Grid item xs={6} className={`${styles.flexcontainer} `}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Year: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            2012-2013
                                        </Text>
                                    </Grid>
                                    <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Institute/College Name: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            Elphinstone College
                                        </Text>
                                    </Grid>
                                    <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Seat Number: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            M039153
                                        </Text>
                                    </Grid>
                                    <Grid item xs={12} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1" className={`${styles.block} ${styles.noPadding}`}>
                                            Final Exam Subject & Score Cards 
                                        </Text>
                                    </Grid>
                                </Grid>
                                <Grid container className="ptb_10">
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            English: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            54/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            French: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            46/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            MathMatics & Statistics: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            43/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Physics: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            46/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Chemistry: 
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            58/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Biology:
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            47/100
                                        </Text>
                                    </Grid>
                                    <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                        <Text variant="subtitle1" component="subtitle1">
                                            Environment Education:
                                        </Text>
                                        <Text variant="subtitle1" component="h6" className={styles.block}>
                                            A
                                        </Text>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr></hr>
                            <Grid container className="padding_top_10">
                                <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Standard: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        SSC
                                    </Text>
                                </Grid>
                                <Grid item xs={6} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Year: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        2010-2011
                                    </Text>
                                </Grid>
                                <Grid item xs={12} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Institute/Name: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        Marwadi Vidyalaya High school
                                    </Text>
                                </Grid>
                                <Grid item xs={12} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1" className={`${styles.block} ${styles.noPadding}`}>
                                        Final Exam Subject & Score Cards 
                                    </Text>
                                </Grid>
                            </Grid>
                            <Grid container className="padding_top_10">
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Hindi: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        86/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        English: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        79/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Marathi: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        70/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        MathMatics: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        131/150
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Science & Technology: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        86/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Social Science: 
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        81/100
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Information & Technology:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        A
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Health & Physical Education:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        B
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Socail Service:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        A
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Personality Development:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        A
                                    </Text>
                                </Grid>
                                <Grid item xs={3} className={`${styles.flexcontainer} ${styles.paddingTop}`}>
                                    <Text variant="subtitle1" component="subtitle1">
                                        Environment Education:
                                    </Text>
                                    <Text variant="subtitle1" component="h6" className={styles.block}>
                                        A
                                    </Text>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            <Paper className={`${styles.paperContent} `}>
                <Grid container>
                    <Grid item xs={12} >
                        <Text variant="subtitle1" component="subtitle1">
                            Fee details 
                        </Text>
                    </Grid>
                </Grid>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                feesHeaders.map((header, index) => {
                                    return (
                                        <TableCell key={index}>
                                            {header}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            FeesArray.map(fees => {
                                return (
                                    <TableRow key={fees.id}>
                                        <TableCell>
                                            {fees.date}
                                        </TableCell>
                                        <TableCell>
                                            {fees.feesAmount}
                                        </TableCell>
                                        <TableCell>
                                            {fees.discountedFees}
                                        </TableCell>
                                        <TableCell>
                                            {fees.paidFees}
                                        </TableCell>
                                        <TableCell>
                                            {fees.remainingFees}
                                        </TableCell>
                                    </TableRow>
                                )
                            }) 
                        }
                        <TableRow>
                            <TableCell>
                                
                            </TableCell>
                            <TableCell>
                                
                            </TableCell>
                            <TableCell style={{textAlign: 'right'}}>
                                Total Paid
                            </TableCell>
                            <TableCell>
                                {totalPaid}
                            </TableCell>
                            <TableCell>
                                
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </> 
    )
}

export default StudentDetails;