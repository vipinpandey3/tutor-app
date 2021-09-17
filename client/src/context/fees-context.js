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

    return (
        <FeesContext.Provider value={{
            fetchFees,
        }}>
            {props.children}
        </FeesContext.Provider>
    )
}