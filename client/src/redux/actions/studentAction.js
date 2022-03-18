import * as types from "../types";
import axios from 'axios';
import * as collection from '../../utils/collections'

export const getStudents = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const getData = async() => {
            const response = await axios.get('admin/get-students', {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch students!');
            }
            return response.data
        }

        try {
            const studentData = await getData();
            if(studentData.resultShort === "success") {
                dispatch({
                    type: types.FETCH_STUDENTS,
                    payload: {
                        loading: false,
                        meesage: studentData.resultLong,
                        data: studentData.students,
                        attributes: studentData.attributes,
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENTS_ERROR,
                    payload: {
                        loading: false,
                        meesage: studentData.resultLong,
                        error: true
                    }
                })
            }
        } catch (error) {
            console.log("Error ****", error)
            dispatch({
                type: types.FETCH_STUDENTS_ERROR,
                payload: {
                    loading: false,
                    meesage: "Error fetching students list",
                    error: true
                }
            })
        }
    }
}

export const fetchStudentFormFields = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getData = async() => {
            const response = await axios.get('/admin/get-student-formFields', {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch student form!');
            }
            return response.data
        }

        try {
            const formFieldsData = await getData();
            if(formFieldsData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_STUDENT_FORM,
                    payload: {
                        studentFormFields: formFieldsData.formFields,
                        formDetails: {
                            formName: "Add Student",
                            buttonName: "Submit",
                            editFlag: false
                        },
                        loading: false,
                        message: formFieldsData.resultLong,
                        showForm: true
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENT_FORM_ERROR,
                    payload: {
                        formDetails: {
                            formName: "",
                            buttonName: "",
                            editFlag: false
                        },
                        loading: false,
                        error: false,
                        message: formFieldsData.resultLong
                    }
                })
            }
        } catch (error) {
            console.log("Error while getting student form", error)
            dispatch({
                type: types.FETCH_STUDENT_FORM_ERROR,
                payload: {
                    formDetails: {
                        formName: "",
                        buttonName: "",
                        editFlag: false
                    },
                    loading: false,
                    error: false,
                    message: "Error while getting student form"
                }
            })
        }
    }
}

export const toggleForm = (flag) => {
    return async(dispatch) => {
        dispatch({
            type: types.TOGGLE_FORM,
            payload: flag
        })
    }
}

export const editStudentFormFields = () => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getData = async() => {
            const response = await axios.get('/admin/get-student-formFields', {headers: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch student form!');
            }
            return response.data
        }

        try {
            const formFieldsData = await getData();
            if(formFieldsData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_STUDENT_FORM,
                    payload: {
                        studentFormFields: formFieldsData.formFields,
                        formDetails: {
                            formName: "Update Student",
                            buttonName: "Update",
                            editFlag: true
                        },
                        loading: false,
                        message: formFieldsData.resultLong,
                        showForm: true
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENT_FORM_ERROR,
                    payload: {
                        formDetails: {
                            formName: "",
                            buttonName: "",
                            editFlag: false
                        },
                        loading: false,
                        error: false,
                        message: formFieldsData.resultLong
                    }
                })
            }
        } catch (error) {
            console.log("Error while getting student form", error)
            dispatch({
                type: types.FETCH_STUDENT_FORM_ERROR,
                payload: {
                    formDetails: {
                        formName: "",
                        buttonName: "",
                        editFlag: false
                    },
                    loading: false,
                    error: false,
                    message: "Error while getting student form"
                }
            })
        }
    }
}

export const addStudent = (studentData) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const addData = async() => {
            const response = await axios.post('/admin/add-student', {headers: collection.setHeader(token)}, studentData)
            if(response.statusText !== "OK") {
                throw new Error('Could not add student in the database!');
            }
            return response.data;
        }

        try {
            const addStudentData = await addData();
            if(addStudentData.resultShort === 'success') {
                dispatch({
                    type: types.ADD_STUDENT,
                    payload: {
                        loading: false,
                        error: false,
                        message: addStudentData.resultLong,
                        showForm: false,
                        formDetails: {
                            formName: "",
                            buttonName: "",
                            editFlag: false
                        }
                    }
                })
                getStudents()
            } else {
                dispatch({
                    type: types.ADD_STUDENT_ERROR,
                    payload: {
                        loading: false,
                        error: true,
                        message: addStudentData.resultLong,
                        showForm: true
                    }
                })
            }
        } catch (error) {
            console.log("Error adding student in database", error)
            dispatch({
                type: types.ADD_STUDENT_ERROR,
                payload: {
                    loading: false,
                    error: true,
                    message: "Error adding student in database",
                    showForm: true
                }
            })
        }
    }
}

// export const updateStudent = () => {
//     return async(dispatch) => {
//         const updateData = async() => {
//             const response = await axios.post('')
//         }
//     }
// }

export const fetchParentFormFields = (flag) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            flag: flag
        }
        const getData = async() => {
            const response = await axios.post('/admin/get-parent-formFields', {headers: collection.setHeader(token)}, postObj);
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch parent form!');
            }
            return response.data
        }

        try {
            const parentForm = await getData();
            if(parentForm.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_PARENT_FORM,
                    payload: {
                        parentFormFields: parentForm.formFields,
                        loading: false,
                        message: parentForm.resultLong,
                        error: false,
                        showForm: true,
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_PARENT_FORM_ERROR,
                    payload: {
                        loading: false,
                        message: parentForm.resultLong,
                        error: true,
                        showForm: false
                    }
                })
            }
        } catch (error) {
            console.log("Error while fetching parent form", error)
            dispatch({
                type: types.FETCH_PARENT_FORM_ERROR,
                payload: {
                    loading: false,
                    message: "Error while fetching parent form",
                    error: true,
                    showForm: false
                }
            })
        }
    }
}

export const fetchEditParentFormFields = (flag) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const postObj = {
            flag: flag
        }
        const getData = async() => {
            console.log("collection.setHeader(token)", collection.setHeader(token))
            const response = await axios.post('/admin/get-parent-formFields',{headers: collection.setHeader(token)}, postObj);
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch parent form!');
            }
            return response.data
        }

        try {
            const parentForm = await getData();
            if(parentForm.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_EDIT_PARENT_FORM,
                    payload: {
                        parentFormFields: parentForm.formFields,
                        loading: false,
                        message: parentForm.resultLong,
                        error: false,
                        showForm: true,
                        formDetails: {
                            formName: "Update Details",
                            buttonTitle: "Update",
                            editFlag: true
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_EDIT_PARENT_FORM_ERROR,
                    payload: {
                        loading: false,
                        message: parentForm.resultLong,
                        error: true,
                        showForm: false,
                    }
                })
            }
        } catch (error) {
            console.log("Error while fetching parent form", error)
            dispatch({
                type: types.FETCH_EDIT_PARENT_FORM_ERROR,
                payload: {
                    loading: false,
                    message: "Error while fetching parent form",
                    error: true,
                    showForm: false
                }
            })
        }
    }
}

export const fetchStudentDetails = (studentId) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const getData = async() => {
            const response = await axios.get(`/admin/studentDetails/${studentId}`, {header: collection.setHeader(token)})
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch student details!');
            }
            return response.data;
        }

        try {
            const studentDetailsData = await getData();
            if(studentDetailsData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_STUDENTS_DETAILS,
                    payload: {
                        loading: false,
                        message: studentDetailsData.resultLong,
                        error: false,
                        studentDetail: studentDetailsData.studentDetails,
                        parentDetails: studentDetailsData.studentDetails.Parent,
                        educationDetails: studentDetailsData.studentDetails.StudentEducationDetails,
                        studentDetailAttributes: studentDetailsData.studentDetailAttributes,
                        parentDetailsAttributes: studentDetailsData.parentDetailsAttributes,
                        educationDetailsAttributes: studentDetailsData.educationDetailsAttributes
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENTS_DETAILS_ERROR,
                    payload: {
                        loading: false,
                        message: studentDetailsData.resultLong,
                        error: true,
                        
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_STUDENTS_DETAILS_ERROR,
                payload: {
                    loading: false,
                    message: "Error while fetching student details",
                    error: true,
                    showForm: false
                }
            })
        }
    }
}

export const addParentDetails = (parentsValue) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        });
        const addData = async() => {
            const response = await axios.post("/admin/add-parent", {headers: collection.setHeader(token)}, parentsValue);
            if(response.statusText !== 'OK') {
                throw new Error("Error while adding parent Details")
            }
            return response.data
        }

        try {
            const parentData = await addData();
            if(parentData.resultShort === "success") {
                dispatch({
                    type: types.ADD_PARENT_DATA,
                    payload: {
                        showForm: false,
                        error: false,
                        message: parentData.resultLong,
                        loading: false
                    }
                });
                fetchStudentDetails()
            } else {
                dispatch({
                    type: types.ADD_PARENT_DATA_ERROR,
                    payload: {
                        showForm: true,
                        error: true,
                        message: parentData.resultLong,
                        loading: false
                    }
                }) 
            }
        } catch (error) {
            dispatch({
                type: types.ADD_PARENT_DATA_ERROR,
                payload: {
                    showForm: false,
                    error: true,
                    loading: false,
                    message: "Error while adding student Parent"
                }
            })
        }
    }
}

export const fetchStudentEducationFormfields = (editObj) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState();
        console.log(token);
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const getData = async() => {
            const response = await axios.get('/admin/get-education-formFields',{headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch education form!');
            }
            return response.data
        };

        try {
            const educationFormFieldData = await getData()
            console.log("educationFormFieldData", educationFormFieldData)
            if(educationFormFieldData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_EDUCATION_FORM,
                    payload: {
                        loading: false,
                        message: educationFormFieldData.resultLong,
                        error: false,
                        showForm: true,
                        formFields: {
                            educationFormFields: educationFormFieldData.formFields
                        },
                        formDetails: {
                            formName: editObj.formName,
                            buttonTitle: editObj.buttonTitle,
                            editFlag: editObj.editFlag
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_EDUCATION_FORM_ERROR,
                    payload: {
                        error: true,
                        loading: false,
                        message: "Error while fetching Education formfields",
                        showForm: false
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_EDUCATION_FORM_ERROR,
                payload: {
                    error: true,
                    loading: false,
                    message: "Error while fetching Education formfields",
                    showForm: false
                }
            })
        }
    }
}

export const addStudeEducationDetails = (values) => {
    return async(dispatch, getState) => {
        const {auth: {token}} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })

        const addData = async() => {
            const response = await axios.post('/admin/add-studentEducation-details',{headers: collection.setHeader(token)}, values);
            if(response.statusText !== "OK") {
                throw new Error('Could not add student education details!');
            }
            return response.data;
        };

        try {
            const educationData = await addData();
            if(educationData.resultShort === 'success') {
                dispatch({
                    type: types.ADD_STUDENT_EDUCATION_DATA,
                    payload: {
                        showForm: false,
                        message: educationData.resultLong,
                        error: false,
                        formDetails: {
                            formName: "",
                            buttonTitle: "",
                            editFlag: false
                        }
                    }
                })
                fetchStudentDetails();
            } else {
                dispatch({
                    type: types.ADD_STUDENT_EDUCATION_DATA_ERROR,
                    payload: {
                        loading: false,
                        message: educationData.resultLong,
                        error: true,
                        showForm: true
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.ADD_STUDENT_EDUCATION_DATA_ERROR,
                payload: {
                    loading: false,
                    message: "Error while fetching student education details",
                    error: true,
                    showForm: false
                }
            })
        }
    }
};

export const updateEducationDetails = (values) => {
    return async(dispatch, getState) => {
        const {auth: [token]} = getState
        const updateData = async () => {
            const response = await axios.post('/admin/update-education-details',{headers: collection.setHeader(token)}, values)
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch fees details!');
            }
            return response.data
        }

        try {
            const updatedData = await updateData();
            if(updatedData.resultShort === 'success') {
                dispatch({
                    type: types.UPDATE_STUDENT_EDUCATION_DETAILS,
                    payload: {
                        showForm: false,
                        error: false,
                        message: updatedData.resultLong,
                        loading: false,
                        formDetails: {
                            formName: "",
                            buttonTitle: "",
                            editFlag: false
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.UPDATE_STUDENT_EDUCATION_DETAILS_ERROR,
                    payload: {
                        showForm: true,
                        error: true,
                        message: updatedData.resultLong,
                        loading: false
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.UPDATE_STUDENT_EDUCATION_DETAILS_ERROR,
                payload: {
                    showForm: true,
                    error: true,
                    message: error,
                    loading: false
                }
            })
        }
    }
}

export const fetchStudentFeesDetails = (studentId) => {
    return async(dispatch, getState) => {
        const {auth: token} = getState()
        dispatch({
            type: types.SET_LOADING,
            payload: {
                loading: true
            }
        })
        const getData = async() => {
            const response = await axios.get(`/admin/getFeesDetailsById/${studentId}`, {headers: collection.setHeader(token)});
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch fees details!');
            }
            return response.data
        }
        
        try {
            const feesData = await getData();
            if(feesData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_STUDENT_FEES_DATA,
                    payload: {
                        error: false, 
                        loading: false,
                        message: feesData.resultLong,
                        feesDetails: {
                            feesTableHeaders: feesData.header,
                            feesDetailsRow: feesData.fees,
                        }
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_STUDENT_FEES_DATA_ERROR,
                    payload: {
                        error: true, 
                        loading: false,
                        message: feesData.resultLong
                    }
                })
            }
        } catch (error) {
            console.log("Error while fetching fees", error)
            dispatch({
                type: types.FETCH_STUDENT_FEES_DATA_ERROR,
                payload: {
                    error: true, 
                    loading: false,
                    message: "Error while fetching fees for student with Id: " + studentId
                }
            })
        }
    }
}

// const setLoading = () => {
//     return dispatch => {
//         dispatch({
//             type: types.SET_LOADING,
//             payload
//         })
//     }
// }