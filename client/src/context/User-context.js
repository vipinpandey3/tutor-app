import {createContext} from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserContextProvide = (props) => {
    const reqHeader = {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiJDJhJDA4JHR2YXlaWGU5SDFvZTNlTWdQZy5MTWVURlZsS0FMTnZWcFF6SVdOTDV3d2F2Zy9NeDBVc3hDIiwiaWF0IjoxNjMzODQ5MDI2LCJleHAiOjE2MzM4NTI2MjZ9.Hn1pUMjkcnQwR30niuIFYw5b9MIFKrcCnHz5nWhyurk",
          Accept: "appplication/json",
        },
    };

    const createUser = async(userValues) => {
        try {
            return await axios.post('/admin/add-user', userValues)
                            .then(response => {
                                return response.data
                            })
        } catch (error) {
            console.log('Error', error)
        }
    }

    const getUsers = async() => {
        try {
            return await axios.get("/admin/get-users")
                        .then((response) => {
                            return response.data
                        })
        } catch (error) {
            console.log("Error", error);
        }
    }

    const searchUser = async(searchParams) => {
        try {
            return await axios.get(`/admin/searchUser/${searchParams}`)
                            .then((response) => {
                                return response.data
                            })
        } catch(error) {
            console.log('Error', error)
        }
    }

    const getUserFormFields = async() => {
        try {
            return await axios.get('/admin/get-userFormFields')
                            .then((response) => {
                                return response.data
                            })
        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <UserContext.Provider value={{
            getUsers,
            searchUser,
            getUserFormFields,
            createUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}