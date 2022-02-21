import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios'

const initialState = {
    tutor: {
        tutorRows: [],
        tutorTableAttributes: []
    },
    formDetails: {
        formName: "Add Tutor",
        buttonName: "Submit",
        editFlag: false
    },
    showForm: false,
    tutorFormFields: [],
}

export const tutorSlice = createSlice({
    name: 'tutor',
    initialState: initialState,
    reducers: {
        fetchTutors: (state, action) => {
            state.tutor = {
                tutorRows: action.payload.data,
                tutorTableAttributes: action.payload.tutorTableAttributes
            };
            state.showForm = false;
        },
        addTutor: state => {
            state.showForm = false 
        },
        getFormFields: (state, action) => {
            state.tutorFormFields = action.payload.formFields;
            state.formDetails = {
                formName: action.payload.formName,
                buttonName: action.payload.buttonName,
                editFlag: action.payload.editFlag
            };
            state.showForm = action.payload.showForm
        },
        toggleTutorForm: (state, action) => {
            state.formDetails = {
                formName: action.payload.formName,
                buttonName: action.payload.buttonName,
                editFlag: action.payload.editFlag
            };
            state.showForm = action.payload.showForm
        }
    }
});

export const tutorActions = tutorSlice.actions;

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
                dispatch(tutorActions.fetchTutors({
                    data: tutorData.data,
                    tutorTableAttributes: tutorData.turorTableAtttibutes
                }))
            } else {
                dispatch(tutorActions.fetchTutors({
                    data: [],
                    tutorTableAttributes: []
                }))
            }
        } catch(error) {
            dispatch(tutorActions.fetchTutors({
                data: [],
                tutorTableAttributes: []
            }))
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
            dispatch(tutorActions.getFormFields({
                formFields: tutorFormData.formFields,
                formName: "Add Tutor",
                editFlag: false,
                buttonName: 'Submit',
                showForm: true
            }))
        } catch (error) {
            dispatch(tutorActions.getFormFields({
                formFields: [],
                formName: "",
                editFlag: false,
                buttonName: 'Submit',
                showForm: false
            }))
        }
    }
}

export default tutorSlice.reducer;