import { createContext, useEffect, useState } from "react";


export const StudentContext = createContext();

export const StudentContextPorvider = (props) => {
    const [students, setStudents] = useState([])
    const [studentDetails, setStudeDetails] = useState({
        studentDetail: {},
        parentsDetail: {},
        educationDetails: []
    });
    const [studentParentDetails, setStudeParentDetails] = useState({})

    const addStudent = async (studentData) => {
        console.log('values in context', studentData);
        await fetch("http://localhost:5000/admin/add-student", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "POST",
            body: JSON.stringify(studentData)
        })
    }

    const addParent = async (parentsValue) => {
        const response = await fetch("http://localhost:5000/admin/add-parent", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            method: "POST",
            body: JSON.stringify(parentsValue)
        })

        const res = response.json();
        return res;
    }

    const fetchStudents = async() => {
        const response = await fetch("http://localhost:5000/admin/get-students");
        if(!response.ok) {
            throw new Error("Something went wrong")
        }

        const data = await response.json();
        setStudents(data.students)
    }

    const fetchStudentDetails = async (studentId) => {
        const response = await fetch(`http://localhost:5000/admin/studentDetails/${studentId}`);
        if(!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        setStudeDetails({
            studentDetail: data.studentDetails,
            parentsDetail: data.parentDetails,
            educationDetails: data.educationDetails
        });
    }

    const storStudentEducationDetails = async(values) => {
        const response = await fetch('http://localhost:5000/admin/add-studentEducation-details', {
            headers: {
                'Accept': "application/json",
                "Content-Type": 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(values)
        });

        const res = await response.json();
        return res;
    }

    // useEffect(() => {
    //     fetchStudents().catch(err => console.log(err))
    // }, []) 

    return (
        <StudentContext.Provider value={{
            students,
            studentDetails,
            studentParentDetails,
            addStudent,
            addParent,
            fetchStudents,
            fetchStudentDetails,
            storStudentEducationDetails
        }}>
            {props.children}
        </StudentContext.Provider>
    )
}