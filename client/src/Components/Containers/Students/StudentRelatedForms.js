import React, { useContext } from 'react';
import { StudentContext } from '../../../context/student-context';
import Form from '../../Common/Form';
import { parentFormInitialValue, parentFormInput } from './StudentsRecords';


export const ParentForms = (props) => {
    const { setShowParentForm, studentId } = props
    const {addParent} = useContext(StudentContext);
    const addParentData = (value) => {
        value.studentId = studentId
        addParent(value)
        setShowParentForm(false)
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
    return (
        <div>

        </div>
    )
}
