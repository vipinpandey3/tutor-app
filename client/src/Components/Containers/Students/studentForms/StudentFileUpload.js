/* eslint-disable no-unused-vars */
import { Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useContext, useRef, useState } from 'react'
import { FeesContext } from '../../../../context/fees-context';
import MatButton from '../../../common/Button';

const useStyles = makeStyles((theme) => ({
    paperContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },

}))

const StudentFileUpload = (props) => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const styles = useStyles();
    const {toggleUploadSection, uploadFile} = props;

    const fileInput = useRef(null)    

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

    const hadleStudentForm = (e) => {
        console.log('FileInput', file);
        const formData = new FormData();
        formData.append("file", file);
        // const fileObj = {
        //     fileName: fileName,
        //     fileType
        // }
        formData.append("fileName", fileName);
        formData.append('fileType', 1)

        uploadFile(formData)
        e.preventDefault()
    }

    return (
        <Paper className={styles.paperContent}>
            <Grid container>
                <Grid item xs={6} >
                <TextField style={{ width: "90%" }} variant="outlined"  name="fileInput"  type="file" onChange={saveFile} />
                </Grid>
                <Grid item xs={3}>
                    <MatButton variant="contained" style={{ flex: "1", width: "90%", height: '55px' }} onClick={hadleStudentForm}>Upload File</MatButton>
                </Grid>
                <Grid item xs={3}>
                    <MatButton variant="outlined" style={{ flex: "1", width: "90%", height: '55px' }} onClick={() => toggleUploadSection(false)}>Cancel</MatButton>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default StudentFileUpload;
