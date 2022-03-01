import React from 'react';
import Form from '../../Common/Form';


export const ParentForms = (props) => {
    const { error, studentId, showForm, formFields, setFormValue, parentFormInitialValue, formDetails, addParentDetails, hideForm} = props
    
    const addParentData = (value, dateValue) => {
        value.studentId = studentId
        addParentDetails(value)
        if(!showForm && error) {
            setFormValue("parentForm");
        }
    }

    const updateParentDetails = (values) => {
        // updateParents(values)
        //     .then(result => {
        //         if(result.resultShort === 'success') {
        //             loadStudentDteails()
        //             setShowParentForm({
        //                 ...showForm,
        //                 parentForms: false
        //             })
        //             setFormDetails({
        //                 title: "Add Parents",
        //                 buttonName: 'Submit',
        //                 editFlag: false
        //             })
        //         } else {
        //             setShowParentForm({
        //                 ...showForm,
        //                 parentForms: false
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         setShowParentForm({
        //             ...showForms,
        //             parentForms: false
        //         })
        //     })
    }

    return (
        <>
            <Form
                formComponent={formFields}
                addValues={addParentData}
                initialFormValues={parentFormInitialValue}
                formDetails={formDetails}
                updateDetails={updateParentDetails}
                resetForm={() => {hideForm("parentFormDetails", false)}}
            />
        </>
    )
}

export const StudentEducationForms = (props) => {
    const { studentId, showForm, error, formFields, formDetails, educationFormIntialValue, hideForm, addStudeEducationDetails, setFormValue, updateEducationDetails} = props;
    const addStudentEducationDetails = (value) => {
        value.studentId = studentId;
        addStudeEducationDetails(value)
        if(!showForm && error) {
            setFormValue("educationDetailsForm");
        }
    };

    const updateDetails = (values) => {
        updateEducationDetails(values)
        // updateStudentEducationDetails(values)
        //     .then(result => {
        //         if(result.resultShort && result.resultShort === 'success') {
        //             console.log("result.resultShort", result.resultShort)
        //             hideForm("educationDetailsForm", false)
        //             loadStudentDteails();
        //             setFormDetails({
        //                 title: "Add Education Details",
        //                 buttonName: "Submit",
        //                 editFlag: false
        //             })
        //         } else {
        //             setShowEdutionForm({
        //                 ...showForms,
        //                 educationDetailsForm: false
        //             })
        //         }
        //     })
        //     .catch(err => {
        //         console.log('err', err);
        //         setShowEdutionForm({
        //             ...showForms,
        //             educationDetailsForm: true
        //         })
        //     });
    }
    
    return (
        <>
            <Form 
                formComponent={formFields}
                initialFormValues={educationFormIntialValue}
                addValues={addStudentEducationDetails}
                updateDetails={updateDetails}
                formDetails={formDetails}
                resetForm={() => {hideForm("educationDetailsForm", false)}}
            />   
        </>
    )
}
