import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import {
  Cell,
  Pie,
  PieChart,
} from "recharts";
import { Grid, Paper, makeStyles } from "@material-ui/core";
import React, { useState } from "react";

import Chart from './ChartsComponents/LineChart.js'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StudentAttendence from "./StudentAttendence/StudentAttendence";
import TutorAttendence from "./TutorAttendence/TutorAttendence";

const data01 = [
  {
    name: "Hindi",
    value: 86,
  },
  {
    name: "English",
    value: 79,
  },
  {
    name: "Marathi",
    value: 70,
  },
  {
    name: "Mathmatics",
    value: 131,
  },
  {
    name: "Social Science",
    value: 81,
  },
  {
    name: "Science & Technology",
    value: 86,
  },
];
const data02 = [
  {
    name: "English",
    value: 54,
  },
  {
    name: "French",
    value: 46,
  },
  {
    name: "Mathmatics & Statistics",
    value: 43,
  },
  {
    name: "Physics",
    value: 46,
  },
  {
    name: "Chemistry",
    value: 58,
  },
  {
    name: "Biology",
    value: 47,
  },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const useStyles = makeStyles((theme) => ({
    paperContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        "&.MuiAccordion-root.Mui-expanded": {
          margin: '41px',
        }
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    noPadding: {
      padding: "0px",
    },
    "MuiAccordion-root": {
      paddingTop: "5px",
    },
    pieChartContainer: {
        height: '200px',
        width: '100%',
        'recharts-surface': {
            paddingTop: '-20px',
            '& .recharts-layer': {
                
            },
            '& .recharts-pie': {
                // position: 'absolute',
                // top: '',
            }
        }
    }
})) 

const Dashboard = () => {
    const styles = useStyles();
    const [expanded, setExpanded] = useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
  return (
    <>
        <Paper className={styles.paperContent}>
            <Grid container className={styles.rowContainer}>
                <Grid item xs={6}>
                  <Chart />
                </Grid>
                <Grid item xs={6}>
                    <PieChart width={400} height={400}  className={styles.pieChartContainer} >
                        <Pie data={data01} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8">
                            {data01.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Pie data={data02} dataKey="value" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label>
                            {data02.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </Grid>
            </Grid>
        </Paper>
        <Accordion className={`${styles.paperContent} ${styles.noPadding}`} expanded={expanded === "studentAttendence"} onChange={handleChange('studentAttendence')}>
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            aria-controls="studentAttendencebh-content"
            id="studentAttendencebh-header"
          >
            <Typography sx={{width: '33%', flexShrink: 0 }}>
              Student Attendence
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <StudentAttendence />
          </AccordionDetails>
        </Accordion>
        <Accordion  className={`${styles.paperContent} ${styles.noPadding}`} expanded={expanded === 'tutorAttendence'} onChange={handleChange('tutorAttendence')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="tutorAttendencebh-content"
            id="tutorAttendencebh-header"
          >
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              Tutor Attendence
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TutorAttendence />
          </AccordionDetails>
        </Accordion>
    </>
  );
};

export default Dashboard;