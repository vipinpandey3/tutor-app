import React, { useContext } from 'react';
import { StudentContext } from '../../../context/student-context';
import Form from '../../Common/Form';
import { parentFormInitialValue, parentFormInput, studentEducationForms, studentEducationInitialValue } from './StudentsRecords';


export const ParentForms = (props) => {
    const { setShowParentForm, studentId, showForms } = props
    const {addParent} = useContext(StudentContext);
    const addParentData = (value) => {
        value.studentId = studentId
        addParent(value)
        setShowParentForm({
            ...showForms,
            parentForms: false
        })
    }
    return (
        <>
            <Form
                formComponent={parentFormInput}
                addValues={addParentData}
                initialFormValues={parentFormInitialValue}
            />
        </>
    )
}

export const StudentEducationForms = (props) => {
    const {setShowEdutionForm, studentId, showForms} = props;
    const { storStudentEducationDetails } = useContext(StudentContext)

    const addStudentEducationDetails = (value) => {
        value.studentId = studentId;
        storStudentEducationDetails(value)
            // .then(value => {
            //     console.log('values', value);
            // })
            .cacth(err => {
                console.log('err', err);
            });
        setShowEdutionForm({
            ...showForms,
            educationDetailsForm: false
        });
    };
    return (
        <>
            <Form 
                formComponent={studentEducationForms}
                initialFormValues={studentEducationInitialValue}
                addValue={addStudentEducationDetails}
            />   
        </>
    )
}
