/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, makeStyles, Paper } from '@material-ui/core'
import React, { createRef, useEffect, useState } from 'react'
import Text from '../../Common/Text';
import FeesTable from './FeesTable';
import MatButton from '../../Common/Button';
import FeesForm from './FeesForm';
import FeesFileUpload from './FeesFileUpload';
import {AiOutlineUpload} from 'react-icons/ai'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {
    fetchFeesFormFields, 
    fetchFeesDetails,
    addFeesDetails,
    toggleUploadSection,
    uploadFile,
    searchFees,
    downloadFeesbyId,
    toggleForm
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

const Fees = ({fees: {formDetails, formFields, error, loading, message, showForm, feesDetails, showFileImport}, searchFees, uploadFile, addFeesDetails, fetchFeesFormFields, fetchFeesDetails, toggleUploadSection, downloadFeesbyId, toggleForm}) => {
    const styles = useStyles()
    const searchRef = createRef()
    const [formValue, setFormValue] = useState(initiateFeesFormValue)

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
    }

    const getFeesFormValue = (value) => {
        value.balance = parseInt(value.feesAmount) - (parseInt(value.paidAmount) + parseInt(value.discount));
        addFeesDetails(value)
    }

    const searchPaidFees = (event) => {
        if (event.code === 'Enter') {
            if(searchRef.current.value !== "") {
                searchFees(searchRef.current.value)
            } else {
                fetchFeesDetails()
            }
        }
    }

    useEffect(() => {
        fetchFeesDetails()
    }, [])

    const downloadReciept = (data) => {
        downloadFeesbyId(data.uuid)
    }

    const editFees = (data) => {
        console.log("Data", data);
        const postObj = {
            formName: "Update Fees",
            buttonName: "Update",
            editFlag: true
        }
        setFormValue(data);
        fetchFeesFormFields(postObj)
    };

    const deleteFees = (data) => {
        console.log('deleteFees')
    }

    const handleUpload = () => {
        toggleUploadSection(true)
    }

    return (
        <>
            {showForm && <FeesForm formDetails={formDetails} toggleForm={toggleForm} getFeesFormValue={getFeesFormValue} feesInput={formFields} initiateFeesFormValue={formValue} />}
            {showFileImport && <FeesFileUpload toggleUploadSection={toggleUploadSection} uploadFile={uploadFile} />}
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
                        <MatButton onClick={hadleFeesForm} variant="contained" style={{ flex: "1", width: "90%" }}>Add Fees</MatButton>
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
    fees: PropTypes.object.isRequired,
    addFeesDetails: PropTypes.func.isRequired,
    toggleUploadSection: PropTypes.func.isRequired,
    uploadFile: PropTypes.func.isRequired,
    searchFees: PropTypes.func.isRequired,
    downloadFeesbyId: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        fees: state.fees
    }
}

export default connect(mapStateToProps, {toggleForm, downloadFeesbyId, searchFees, uploadFile, fetchFeesFormFields, fetchFeesDetails, addFeesDetails, toggleUploadSection})(Fees)
