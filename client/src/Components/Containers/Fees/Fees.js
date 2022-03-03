/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, makeStyles, Paper } from '@material-ui/core'
import React, { createRef, useContext, useEffect, useState } from 'react'
import Text from '../../Common/Text';
import FeesTable from './FeesTable';
import MatButton from '../../Common/Button';
import FeesForm from './FeesForm';
import { FeesContext } from '../../../context/fees-context';
import FeesFileUpload from './FeesFileUpload';
import {AiOutlineUpload} from 'react-icons/ai'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {
    fetchFeesFormFields, 
    fetchFeesDetails
} from '../../../redux/actions/feesAction';

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
    StudentId: ""
}

const Fees = ({fees: {formDetails, formFields, error, loading, message, feesDetails, showFileImport}, fetchFeesFormFields, fetchFeesDetails}) => {
    const styles = useStyles()
    const [showFeesForm, setShowFeesForm] = useState(false);
    // const [searchValue, setSearchValue] = useState('')
    const searchRef = createRef()
    const [formValue, setFormValue] = useState(initiateFeesFormValue)
    const {fetchFees, addFeesIntoDatabase, searchFees, downloadFeesbyId} = useContext(FeesContext);
    // const [showFileImport, setShowFileImport] = useState(false);

    const getFormFields = () => {
        const postObj = {
            formName: "Add Fees",
            buttonName: "Add",
            editFlag: false
        }
        fetchFeesFormFields(postObj)
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
            // searchFees(searchRef.current.value)
            //     .then(result => {
            //         setFeesDetails({
            //             ...feesDetails,
            //             feesData: result.feesArray
            //         })
            //     })
            //     .catch(err => {
            //         console.log('err', err);
            //     })
        }
    }

    useEffect(() => {
        fetchFeesDetails()
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
        // setShowFileImport(true)
    }

    return (
        <>
            {showFeesForm && <FeesForm formTitle="Fees Details" setShowFeesForm={setShowFeesForm} getFeesFormValue={getFeesFormValue} feesInput={formFields} initiateFeesFormValue={formValue} />}
            {/* {showFileImport && <FeesFileUpload setShowFileImport={setShowFileImport} />} */}
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

Fees.propTypes = {
    fetchFeesFormFields: PropTypes.func.isRequired,
    fetchFeesDetails: PropTypes.func.isRequired,
    fees: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        fees: state.fees
    }
}

export default connect(mapStateToProps, {fetchFeesFormFields, fetchFeesDetails})(Fees)
