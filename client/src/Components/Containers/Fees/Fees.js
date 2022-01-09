import { Grid, makeStyles, Paper, TextField, Toolbar } from '@material-ui/core'
import React, { createRef, useContext, useEffect, useState } from 'react'
import Text from '../../Common/Text';
import FeesTable from './FeesTable';
import Button from '../../Common/Button'
import MatButton from '../../Common/Button';
import FeesForm from './FeesForm';
import Input from '../../Common/Input';
import { FeesContext } from '../../../context/fees-context';
import { saveAs } from 'file-saver'
import FeesFileUpload from './FeesFileUpload';
import {AiOutlineUpload} from 'react-icons/ai'

const useStyles = makeStyles((theme) => ({
    paperContent: {
        margin: theme.spacing(4),
        padding: theme.spacing(3)
    },
    seachInput: {
        // padding: "5px 10px",
        // height: "20px",
        // marginTop: "10px"
    }
}))

const initiateFeesFormValue = {
    date: new Date().toISOString().slice(0, 10),
    feesAmount: "",
    paidAmount: "",
    discount: "",
    balance: "",
    academicYear: "",
    reamarks: "",
    studentId: ""
}

const Fees = () => {
    const styles = useStyles()
    const [showFeesForm, setShowFeesForm] = useState(false);
    // const [searchValue, setSearchValue] = useState('')
    const searchRef = createRef()
    const [formValue, setFormValue] = useState(initiateFeesFormValue)
    const {fetchFees, fetchFeesFormFields, addFeesIntoDatabase, searchFees, downloadFeesbyId} = useContext(FeesContext);
    const [formFields, setFormFields] = useState([])
    const [feesDetails, setFeesDetails] = useState({
        attributes: [],
        feesData: []
    });
    const [fileInput, setFileInput] = useState(null);
    const [showFileImport, setShowFileImport] = useState(false);

    const getFormFields = () => {
        fetchFeesFormFields()
            .then(result => {
                setFormFields(result.formFields)
            })
            .catch(err => {
                console.log('Err', err)
            })
    }

    const hadleFeesForm = () => {
        getFormFields();
        setShowFeesForm(true);
    }

    const getFeesFormValue = (value) => {
        value.balance = parseInt(value.feesAmount) - (parseInt(value.paidAmount) + parseInt(value.discount));
        addFeesIntoDatabase(value)
            .then(result => {
                if(result && result.resultShort === "success") {
                    setShowFeesForm(false);
                } else {
                    setShowFeesForm(true);
                }
            })
            .catch((err) => {
                console.log("Error while adding Fees", err)
            })
    }

    const searchPaidFees = (event) => {
        if (event.code === 'Enter') {
            searchFees(searchRef.current.value)
                .then(result => {
                    setFeesDetails({
                        ...feesDetails,
                        feesData: result.feesArray
                    })
                })
                .catch(err => {
                    console.log('err', err);
                })
        }
    }

    // useEffect(() => {
    //     // console.log("value, ", typeof(parseInt(searchValue)));
    //     // if(searchValue) {
    //     //     const newData = feesData.filter(data => {
    //     //         console.log('Log', data);
    //     //         if(parseInt(searchValue) === parseInt(data.studentId) || data.studentName.includes(searchValue) ) {
    //     //             return data
    //     //         }
    //     //     })
    //     //     setFeesPaidData(newData)
    //     // } else {
    //     //     setFeesPaidData(feesData)
    //     // }
    // }, [searchRef]);

    useEffect(() => {
        fetchFees()
            .then(result => {
                setFeesDetails({
                    attributes: result.feeAttributes,
                    feesData: result.feesDetails
                })
            })
            .catch(err => {
                console.log('err', err)
            })
    }, [])

    const downloadReciept = (data) => {
        downloadFeesbyId(data.uuid)
            .then(result => {
                const url = window.URL.createObjectURL(
                    new Blob([result]),
                  );
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute(
                    'download',
                    `FileName.pdf`,
                  );
                  document.body.appendChild(link);
                  link.click();
                  link.parentNode.removeChild(link);
            })
            .catch((error) => {
                console.log('err in file', error)
            })
    }

    const editFees = (data) => {
        setShowFeesForm(true);
        setFormValue(data);
    };

    const deleteFees = (data) => {
        console.log('deleteFees')
    }

    const handleUpload = () => {
        setShowFileImport(true)
    }

    return (
        <>
            {showFeesForm && <FeesForm formTitle="Fees Details" setShowFeesForm={setShowFeesForm} getFeesFormValue={getFeesFormValue} feesInput={formFields} initiateFeesFormValue={formValue} />}
            {showFileImport && <FeesFileUpload setShowFileImport={setShowFileImport} />}
            <Paper className={styles.paperContent}>
                <Grid container>
                    <Grid item xs={3}>
                        <Text variable="subtitle1" component="subtitle1">Fees</Text>
                    </Grid>
                    <Grid item sm></Grid>
                    <Grid item xs={3}>
                            <input  onKeyDown={searchPaidFees} className="searchInput" ref={searchRef} name="paidFees" placeholder="Search"  />
                    </Grid>
                    <Grid item xs={3}>
                    <MatButton onClick={handleUpload} variant="contained" startIcon={<AiOutlineUpload />} style={{ flex: "1", width: "80%" }}>Fees</MatButton>
                    </Grid>
                    <Grid item xs={2}>
                        <MatButton onClick={hadleFeesForm} variant="contained" style={{ flex: "1", width: "90%" }}>Fees</MatButton>
                    </Grid>
                <FeesTable downloadReciept={downloadReciept} deleteFees={deleteFees} editFees={editFees} feesTableHeader={feesDetails.attributes ? feesDetails.attributes : [] } FeesData={feesDetails.feesData ? feesDetails.feesData : []} />
                </Grid>
            </Paper>
        </>
    )
}

export default Fees
