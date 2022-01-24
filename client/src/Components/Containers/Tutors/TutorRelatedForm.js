import React, {useContext} from 'react'
import Form from '../../Common/Form'
import { TutorContext } from '../../../context/tutor-context'

export const EducationForm = (props) => {
    const {formFields, educationInitialValue, formDetails, setIntialValue, fetchTutorDetails, tutorId, toggleFormDetails, hideForm} = props
    const {addTutorEducation, updateTutorEducationDetail} = useContext(TutorContext)

    const addEducationDetails = (values) => {
        values.TutorId = tutorId;
        console.log("Values", values)
        addTutorEducation(values)
            .then(result => {
                if(result.resultShort === 'success') {
                    toggleFormDetails(false, {
                        title: "Add Education",
                        buttonName: 'Submit',
                        editFlag: false
                    })
                    fetchTutorDetails()
                    setIntialValue()
                } else {
                    toggleFormDetails(true, {
                        title: "Add Education",
                        buttonName: 'Submit',
                        editFlag: false
                    })
                }
            })
            .catch(error => {
                toggleFormDetails(false, {
                    title: "Add Education",
                    buttonName: 'Submit',
                    editFlag: false
                })
            })
    }

    
    
    const updateEducationDetails = (values) => {
        updateTutorEducationDetail(values)
            .then(result => {
                if(result.resultShort && result.resultShort === 'success') {
                    toggleFormDetails(false, {
                        title: "Add Education",
                        buttonName: 'Submit',
                        editFlag: false
                    });
                    fetchTutorDetails()
                    setIntialValue()
                } else {
                    toggleFormDetails(true, {
                        title: "Add Education",
                        buttonName: 'Submit',
                        editFlag: false
                    })
                }
            })
            .catch(error => {
                toggleFormDetails(false, {
                    title: "Add Education",
                    buttonName: 'Submit',
                    editFlag: false
                })
            })
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
