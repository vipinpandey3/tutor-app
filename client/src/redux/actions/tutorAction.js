import * as types from '../types';
import axios from 'axios'

export const getTutors = () => {
    return async (dispatch) => {
        const getData = async() => {
            const response = await axios.get('/admin/get-teachers')
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch tutor data!');
            }
            return response.data
        }

        try {
            const tutorData = await getData();
            if(tutorData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_TUTORS,
                    payload: {
                        data: tutorData.data,
                        tutorTableAttributes: tutorData.turorTableAtttibutes
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_TUTORS_ERROR,
                    payload: {
                        data: tutorData.data,
                        tutorTableAttributes: tutorData.turorTableAtttibutes
                    }
                })
            }
        } catch(error) {
            dispatch({
                type: types.FETCH_TUTORS_ERROR,
                payload: {
                    data: [],
                    tutorTableAttributes: []
                }
            })
        }
    }
}

export const getTutorForm = () => {
    return async (dispatch) => {
        const getData = async() => {
            const response = await axios.get('/admin/get-tutor-formFields');
            if(response.statusText !== "OK") {
                throw new Error('Could not fetch tutor data!');
            }
            return response.data
        }

        try {
            const tutorFormData = await getData();
            if(tutorFormData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_TUTOR_FORM,
                    payload: {
                        formFields: tutorFormData.formFields,
                        formName: "Add Tutor",
                        editFlag: false,
                        buttonName: 'Submit',
                        showForm: true
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_TUTOR_FORM,
                    payload: {
                        formFields: [],
                        formName: "Add Tutor",
                        editFlag: false,
                        buttonName: 'Submit',
                        showForm: false
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_TUTOR_FORM_ERROR,
                payload: {
                    formFields: [],
                    formName: "",
                    editFlag: false,
                    buttonName: 'Submit',
                    showForm: false
                }
            })
        }
    }
}

export const toggleForm = (formValue) => {
    return async (dispatch) => {
        dispatch({
            type: types.TOGGLE_FORM,
            payload: {
                showForm: formValue.showFlag,
                formName: formValue.formName,
                editFlag: formValue.editFlag,
                buttonName: formValue.buttonName,
            }
        })
    }
}

export const fetchTutorDetails = (teacherId) => {
    return async(dispatch) => {
        const getData = async() => {
            const response = await axios.get(`/admin/teachersDetails/${teacherId}`);
            if(response.statusText !== 'OK') {
                throw new Error('Could not fetch tutor details!');
            }
            return response.data
        }

        try {
            const tutorDetailsData = await getData();
            if(tutorDetailsData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_TUTOR_DETAIL,
                    payload: {
                        tutorData: tutorDetailsData.data,
                        tutorDetailsAttributes: tutorDetailsData.attributes,
                        educationDetails: tutorDetailsData.data.TutorEducationDetails,
                        educationAttributes: tutorDetailsData.educationAttributes
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_TUTOR_DETAIL,
                    payload: {
                        tutorData: {},
                        tutorDetailsAttributes: [],
                        educationDetails: [],
                        educationAttrbutes: []
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.FETCH_TUTOR_DETAIL_ERROR,
                payload: {
                    tutorData: {},
                    tutorDetailsAttributes: [],
                    educationDetails: [],
                    educationAttrbutes: []
                }
            })
        }
    }
}

export const fetchTutorEducationFormFields = (postObj) => {
    return async(dispatch) => {
        const getData = async() => {
            const response = await axios.get('/admin/getTutorFormFields');
            if(response.statusText !== 'OK') {
                throw new Error('Could not fetch tutor Education form fields!');
            }
            return response.data
        };

        try {
            const formFielData = await getData();
            if(formFielData.resultShort === 'success') {
                dispatch({
                    type: types.FETCH_TUTOR_EDUCATION_FORMFIELD,
                    payload: {
                        formFields: formFielData.formFields,
                        title: postObj.title,
                        buttonName: postObj.buttonName,
                        editFlag: postObj.editFlag,
                        showForm: true
                    }
                })
            } else {
                dispatch({
                    type: types.FETCH_TUTOR_EDUCATION_FORMFIELD,
                    payload: {
                        formFields: [],
                        title: postObj.title,
                        buttonName: postObj.buttonName,
                        editFlag: postObj.editFlag,
                        showForm: true
                    }
                })
            }
        } catch (error) {
            console.log('Error', error)
            dispatch({
                type: types.FETCH_TUTOR_EDUCATION_FORMFIELD_ERROR,
                payload: {
                    formFields: [],
                    title: "Add Education",
                    buttonName: "submit",
                    editFlag: false,
                    showForm: false
                }
            })
        }
    }
}

export const addTeacherEducationDetails = (values) => {
    return async (dispatch) => {
        const addData = async () => {
            const response = await axios.post('/admin/addTutorEducation', values)
            if(response.statusText !== "OK") {
                throw new Error('Could not add tutor education data!');
            } 
            return response.data;
        }

        try {
            const educationData = await addData();
            if(educationData.resultShort === 'success') {
                dispatch({
                    type: types.ADD_TEACHER_EDUCATION_DETAILS,
                    payload: {
                         title: "Add Education",
                         buttonName: "submit",
                         editFlag: false,
                         showForm: false,
                         educationFormFields: []
                    }
                })
            } else {
                dispatch({
                    type: types.ADD_TEACHER_EDUCATION_DETAILS,
                    payload: {
                         title: "Add Education",
                         buttonName: "submit",
                         editFlag: false,
                         showForm: true
                    }
                })
            }
        } catch (error) {
           dispatch({
               type: types.ADD_TEACHER_EDUCATION_DETAILS_ERROR,
               payload: {
                    title: "Add Education",
                    buttonName: "submit",
                    editFlag: false,
                    showForm: false
               }
           }) 
        }
    }
}

export const updateTutorEducationDetail = (values) => {
    return async(dispatch) => {
        const updateData = async() => {
            const response = await axios.post('/admin/updateTutorEducation', values)
            if(response.statusText !== 'OK') {
                throw new Error('Could not update tutor education!');
            }
            return response.data
        }

        try {
            const educationData = await updateData();
            if(educationData.resultShort === 'success') {
                dispatch({
                    type: types.UPDATE_TEACHER_EDUCATION_DETAILS,
                    payload: {
                         title: "Add Education",
                         buttonName: "submit",
                         editFlag: false,
                         showForm: false,
                    }
                })
            } else {
                dispatch({
                    type: types.UPDATE_TEACHER_EDUCATION_DETAILS,
                    payload: {
                         title: "Update Education",
                         buttonName: "Update",
                         editFlag: true,
                         showForm: true
                    }
                })
            }
        } catch (error) {
            dispatch({
                type: types.UPDATE_TEACHER_EDUCATION_DETAILS_ERROR,
                payload: {
                     title: "Add Education",
                     buttonName: "submit",
                     editFlag: false,
                     showForm: false
                }
            })
        }
    }
}