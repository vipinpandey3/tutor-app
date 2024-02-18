import React, { useState } from 'react';
import { makeStyles, Grid } from "@material-ui/core";
import Select from '../../../common/Select'
import DatePicker from '../../../common/DatePicker';
import CMTimePicker from '../../../common/TimePicker';

const useStyles = makeStyles((theme) => ({
    paperConent: {
      padding: theme.spacing(1),
      margin: theme.spacing(1.5),
      "&.MuiAccordion-root.Mui-expanded": {
        margin: theme.spacing(2),
      },
      backgroundColor: "rgb(103 105 132)"
    },
    contentMargin: {
      margin: "10px 0",
      '& .MuiFormControl-root': {
        width: '90% !important'
      }
    },
    title: {
      color: "black",
      fontSize: "24px",
      fontWeight: "900"
    }
  }));

function InputGenerator({ inputSets, setInputSets, subjects }) {
    const styles = useStyles()
    // Function to handle input change
    const handleInputChange = (index, event) => {
        console.log("Event", event);
        const { name, value } = event.target;
        const newInputSets = [...inputSets];
        newInputSets[index][name] = value;
        setInputSets(newInputSets);
    };

    const handltTimeInputChange = (index, event) => {
        const newInputSets = [...inputSets];
        console.log("Event", event)
        newInputSets[index]["timeStart"] = event;
        setInputSets(newInputSets);
    }

    return (
        <div>
            {inputSets.map((inputSet, index) => (
              <Grid container id={index}>
                <Grid  item xs={3} className={styles.contentMargin}>
                    <Select style={{ width: "90%" }} value={inputSet.subject} options={subjects} onChange={(e) => handleInputChange(index, e)} name="subject" labe="subjects"  />
                </Grid>
                <Grid  item xs={3} className={styles.contentMargin}>
                    <DatePicker style={{ width: "90%" }} name="examDate" value={inputSet.examDate} onChange={(e) => handleInputChange(index, e)} label="Exam Date" />
                </Grid>
                <Grid  item xs={3} className={styles.contentMargin}>
                    <CMTimePicker style={{ width: '90%' }} value={inputSet.timeStart} name="timeStart" label="Exam Start Time" onChange={(event) => handltTimeInputChange(index, event)} />
                </Grid>
              </Grid>
            ))}
        </div>
    );
}

export default InputGenerator;