/* eslint-disable no-unused-vars */
import { Grid, makeStyles, Paper, TextField } from '@material-ui/core'
import React, { useContext, useRef, useState } from 'react'
import { FeesContext } from '../../../context/fees-context';
import MatButton from '../../Common/Button';

const useStyles = makeStyles((theme) => ({
    paperContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },

}))

const FeesFileUpload = (props) => {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const styles = useStyles();
    const {toggleUploadSection, uploadFile} = props;

    const fileInput = useRef(null)    

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

    const hadleFeesForm = (e) => {
        console.log('FileInput', file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        uploadFile(formData)
        e.preventDefault()
    }

    return (
        <Paper className={styles.paperContent}>
            <Grid>
                {/* <form onSubmit={hadleFeesForm} style={{display: "flex"}}> */}
                    <Grid item xs={6} >
                        {/* <input type="file" onChange={saveFile} className="fileInput" /> */}
                    {/* <input type="file" ref={fileInput} /> */}
                    <TextField style={{ width: "90%" }} variant="outlined"  name="fileInput"  type="file" onChange={saveFile} />
                    </Grid>
                    <Grid item xs={3}>
                        <MatButton variant="contained" style={{ flex: "1", width: "90%" }} onClick={hadleFeesForm}>Upload File</MatButton>
                    </Grid>
                    <Grid item xs={3}>
                        <MatButton variant="contained" style={{ flex: "1", width: "90%" }} onClick={() => toggleUploadSection(false)}>Cancel</MatButton>
                    </Grid>
                {/* </form> */}
            </Grid>
        </Paper>
    )
}

export default FeesFileUpload;
