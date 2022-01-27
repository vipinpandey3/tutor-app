import { Accordion, Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

const data = [
  { name: "Page A", uv: 400, pv: 2400, amt: 2000 },
  { name: "Page ", uv: 600, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 800, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 700, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 430, pv: 2400, amt: 2400 },
  { name: "Page A", uv: 40, pv: 2400, amt: 2400 },
];

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
        padding: theme.spacing(3)
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row'
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
    }
  return (
    <>
        <Paper className={styles.paperContent}>
            <Grid container className={styles.rowContainer}>
                <Grid item xs={6}>
                    <LineChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                        <Tooltip />
                    </LineChart>
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
        <Accordion expanded={expanded === "studentAttendence"} onChange={handleChange}>

        </Accordion>
    </>
  );
};

export default Dashboard;
