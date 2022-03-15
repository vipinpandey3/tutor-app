import { createContext } from "react";
import axios from "axios"

export const FeesContext = createContext();

export const FeesContextProvider = (props) => {

    const fetchFees = async() => {
        const response = await fetch('http://localhost:5000/admin/getAllFees');
        if(!response.ok) {
            throw new Error('Something went wrong');   
        }
        const data = await response.json();
        return data;
    }

    const fetchFeesFormFields = async() => {
        const response = await fetch('http://localhost:5000/admin/getFeesFormFields');
        if(!response.ok) {
            throw new Error('Something went wrong');
        }

        const data = await response.json();
        return data;
    }

    const addFeesIntoDatabase = async (feesValue) => {
        try {
            return await axios.post('http://localhost:5000/admin/add-feesDetails', feesValue)
                .then(res => {
                    if(res.data.resultShort && res.data.resultShort === 'success') {
                        return res.data
                    }
                })
        } catch(error) {
            console.log('Error while adding fees', error);
        }
    }

    const searchFees = async(searchParams) => {
        try {
            return await axios.get(`http://localhost:5000/faculty/searchFees/${searchParams}`)
            .then(res => {
                if(res.data.resultShort && res.data.resultShort === 'success') {
                    return res.data
                }
            })
        } catch(error) {
            console.log('Error while fetching fees', error)
        }
    }

    const downloadFeesbyId = async(uuid) => {
        const response = await fetch(`http://localhost:5000/faculty/downloadFeesReciept/${uuid}`, {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
            responseType: 'arraybuffer'
          });
        if(!response.ok) {
            throw new Error('something went wrong')
        }
        
        // console.log('response', response);
        const res = await response.blob();
        return res;
    }

    const uploadFile = async(data) => {
        try {
            return await axios.post('http://localhost:5000/faculty/uploadFile', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(result => {
                console.log('Result')
            } )
        } catch(error) {
            console.log('Error', error)
        }
    }

    return (
        <FeesContext.Provider value={{
            fetchFees,
            fetchFeesFormFields,
            addFeesIntoDatabase,
            searchFees,
            downloadFeesbyId,
            uploadFile
        }}>
            {props.children}
        </FeesContext.Provider>
    )
}