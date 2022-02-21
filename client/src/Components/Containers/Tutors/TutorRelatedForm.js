import React from 'react'
import Form from '../../Common/Form'
import {addTeacherEducationDetails, updateTutorEducationDetail} from '../../../redux/actions/tutorAction';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const EducationForm = (props) => {
    const {formFields, 
        educationInitialValue, 
        formDetails,
        fetchTutorDetails, 
        tutorId, 
        hideForm,
        addTeacherEducationDetails,
        updateTutorEducationDetail
    } = props

    const addEducationDetails = (values) => {
        values.TutorId = tutorId;
        console.log("Values", values)
        addTeacherEducationDetails(values)
        fetchTutorDetails();
    }
    
    const updateEducationDetails = (values) => {
        updateTutorEducationDetail(values);
        fetchTutorDetails();
    }

    return (
        <Form
            formComponent={formFields}
            addValues={addEducationDetails}
            initialFormValues={educationInitialValue}
            formDetails={formDetails}
            updateDetails={updateEducationDetails}
            resetForm={hideForm}
        />
    )
}

EducationForm.propTypes = {
    addTeacherEducationDetails: PropTypes.func.isRequired,
    updateTutorEducationDetail: PropTypes.func.isRequired
}

export default connect(null, {addTeacherEducationDetails, updateTutorEducationDetail})(EducationForm)
