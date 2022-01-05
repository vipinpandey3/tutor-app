import React, { useContext } from 'react';
import { StudentContext } from '../../../context/student-context';
import Form from '../../Common/Form';
import { studentEducationForms, studentEducationInitialValue } from './StudentsRecords';


export const ParentForms = (props) => {
    const { setShowParentForm, studentId, showForms, formFields, loadStudentDteails, parentFormInitialValue, formDetails, setFormDetails } = props
    const {addParent, updateParents} = useContext(StudentContext);
    
    const addParentData = (value, dateValue) => {
        console.log('DateValue', dateValue)
        value.studentId = studentId
        addParent(value)
            .then(result => {
                if(result.resultShort === 'success') {
                    loadStudentDteails()
                    setShowParentForm({
                        ...showForms,
                        parentForms: false
                    })
                } else {
                    setShowParentForm({
                        ...showForms,
                        parentForms: false
                    })
                }
            })
            .catch(error => {
                console.log('Error whiel adding Parents', error)
                setShowParentForm({
                    ...showForms,
                    parentForms: false
                })
            })
    }

    const updateParentDetails = (values) => {
        updateParents(values)
            .then(result => {
                if(result.resultShort === 'success') {
                    loadStudentDteails()
                    setShowParentForm({
                        ...showForms,
                        parentForms: false
                    })
                    setFormDetails({
                        title: "Add Parents",
                        buttonName: 'Submit',
                        editFlag: false
                    })
                } else {
                    setShowParentForm({
                        ...showForms,
                        parentForms: false
                    })
                }
            })
            .catch(error => {
                setShowParentForm({
                    ...showForms,
                    parentForms: false
                })
            })
    }

    return (
        <>
            <Form
                formComponent={formFields}
                addValues={addParentData}
                initialFormValues={parentFormInitialValue}
                formDetails={formDetails}
                updateDetails={updateParentDetails}
            />
        </>
    )
}

export const StudentEducationForms = (props) => {
    const {setShowEdutionForm, studentId, showForms, formFields, formDetails, setFormDetails, educationFormIntialValue, loadStudentDteails} = props;
    const { storStudentEducationDetails, updateStudentEducationDetails } = useContext(StudentContext)
    const addStudentEducationDetails = (value) => {
        value.studentId = studentId;
        storStudentEducationDetails(value)
            .then(result => {
                if(result.resultShort === 'success') {
                    setShowEdutionForm({
                        ...showForms,
                        educationDetailsForm: false
                    })
                    loadStudentDteails();
                    setFormDetails({
                        title: "Add Education Details",
                        buttonName: "Submit",
                        editFlag: false
                    })
                } else {
                    setShowEdutionForm({
                        ...showForms,
                        educationDetailsForm: false
                    })
                }
            })
            .catch(err => {
                console.log('err', err);
                setShowEdutionForm({
                    ...showForms,
                    educationDetailsForm: true
                })
            });
    };

    const updateEducationDetails = (values) => {
        updateStudentEducationDetails(values)
            .then(result => {
                if(result.resultShort && result.resultShort === 'success') {
                    console.log("result.resultShort", result.resultShort)
                    setShowEdutionForm({
                        ...showForms,
                        educationDetailsForm: false
                    });
                    loadStudentDteails();
                    setFormDetails({
                        title: "Add Education Details",
                        buttonName: "Submit",
                        editFlag: false
                    })
                } else {
                    setShowEdutionForm({
                        ...showForms,
                        educationDetailsForm: false
                    })
                }
            })
            .catch(err => {
                console.log('err', err);
                setShowEdutionForm({
                    ...showForms,
                    educationDetailsForm: true
                })
            });
    }
    
    return (
        <>
            <Form 
                formComponent={formFields}
                initialFormValues={educationFormIntialValue}
                addValues={addStudentEducationDetails}
                updateDetails={updateEducationDetails}
                formDetails={formDetails}
            />   
        </>
    )
}
