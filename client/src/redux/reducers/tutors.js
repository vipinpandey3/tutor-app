import {GET_TUTORS_SUCCESS} from '../types'

const initialStaes = {
    loading: false,
    tutors: [],
    tutorAttributes: [],
    message: null,
    showTutorForm: false,
    tutorFormFields: []
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state= initialStaes, action) {
    const {type, payload} = action
    switch (type) {
        case GET_TUTORS_SUCCESS:
            return {
                ...state,
                tutors: payload.data.tutors,
                tutorAttributes: payload.data.attributes
            }

        default: 
            return state
    }
}