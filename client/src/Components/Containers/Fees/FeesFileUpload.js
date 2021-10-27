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
    const {setShowFileImport} = props
    const {uploadFile} = useContext(FeesContext);
    // const [fileInput, setFileInput] = useState(null);

    const fileInput = useRef(null)    

    // const handleFileInput = (e) => {
    //     setFileInput(e.target)
    // }

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

    const hadleFeesForm = (e) => {
        // console.log('FileInput', fileInput.current.files[0]);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        uploadFile(formData)
        e.preventDefault()
    }

    return (
        <Paper className={styles.paperContent}>
            <Grid container>
                <form onSubmit={hadleFeesForm}>
                    <Grid item xs={6}>
                        <input type="file" onChange={saveFile} />
                    {/* <input type="file" ref={fileInput} /> */}
                    {/* <TextField style={{ width: "90%" }} variant="outlined"  name="fileInput" value={fileInput} type="file" onChange={handleFileInput} /> */}
                    </Grid>
                    <Grid item xs={6}>
                        <button>Submit</button>
                        {/* <MatButton variant="contained" style={{ flex: "1", width: "90%" }}>Upload File</MatButton> */}
                    </Grid>
                </form>
            </Grid>
        </Paper>
    )
}

export default FeesFileUpload;