import { createContext } from "react";

export const FeesContext = createContext();

export const FeesContextProvider = (props) => {

    const fetchFees = async() => {
        const response = await fetch('http://localhost:5000/admin//getAllFees');
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
        console.log('value', feesValue);
        const response = fetch('http://localhost:5000/admin/add-feesDetails', {
            headers: {
                'Accept': "application/json",
                "Content-Type": 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(feesValue)
        });
        if(!response.ok) {
            throw new Error('something went wrong')       
        }
        const res = response.json();
        return res;
    }

    const searchFees = async(searchParams) => {
        const response = await fetch(`http://localhost:5000/faculty/searchFees/${searchParams}`);
        if(!response.ok) {
            throw new Error('something went wrong')
        }
        const res = await response.json();
        return res
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

    return (
        <FeesContext.Provider value={{
            fetchFees,
            fetchFeesFormFields,
            addFeesIntoDatabase,
            searchFees,
            downloadFeesbyId
        }}>
            {props.children}
        </FeesContext.Provider>
    )
}