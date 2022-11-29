import * as types from "../types";

const dispatchAction = (type, payload = null) => (payload != null ? { type, payload } : { type });

export default function dispatchEngine (axiosData, type, dispatch, errorType) {
    return new Promise(() => {
        if(axiosData && axiosData.resultShort === types.RESULT_SUCCESS) {
            const dispatchPayload = axiosData;
            return dispatch(dispatchAction(type, dispatchPayload))
        } else {
            const dispatchPayload = axiosData;
            // const dispatchObject = dispatchAction(errorType, dispatchPayload);
            return dispatch(dispatchAction(errorType, dispatchPayload))
        }
    })
}

export function addPayload  (axiosData, payloadObj, errorPayload) {
    return new Promise((resolve) => {
        if(axiosData && axiosData.resultShort === types.RESULT_SUCCESS) {
            const dispatchPayload = {
                ...axiosData,
                ...payloadObj
            }
            return resolve(dispatchPayload)
        } else {
            const dispatchPayload = {
                ...axiosData,
                ...errorPayload
            }
            resolve(dispatchPayload)
        }
    })
}