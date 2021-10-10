import { createContext } from "react";
import axios from 'axios';

export const FeesContext = createContext();


export const FeesContextProvider = (props) => {
  const reqHeader = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiJDJhJDA4JHR2YXlaWGU5SDFvZTNlTWdQZy5MTWVURlZsS0FMTnZWcFF6SVdOTDV3d2F2Zy9NeDBVc3hDIiwiaWF0IjoxNjMzODQ5MDI2LCJleHAiOjE2MzM4NTI2MjZ9.Hn1pUMjkcnQwR30niuIFYw5b9MIFKrcCnHz5nWhyurk",
      Accept: "appplication/json",
    },
  };
  const fetchFees = async () => {
    try {
      return await axios.get("/admin/getAllFees", reqHeader)
        .then(res => {
          // console.log("res", res.data);
          return res.data
        })
    } catch(err) {
      console.log('Error', err)
    }
  };

  const fetchFeesFormFields = async () => {
    try {

      return await axios.get(
        "/admin/getFeesFormFields",
        reqHeader
      )
      .then(res => {
        return res.data
      });
    } catch (error) {
      console.log('error', error);
    }
  };

  const addFeesIntoDatabase = async (feesValue) => {
    try {

      return await axios.post('/admin/add-feesDetails', feesValue, reqHeader)
          .then(response => {
            return response.data
          })
    } catch (error) {
      console.log('Error', error)
    }
  };

  const searchFees = async (searchParams) => {
    try {
      return await axios.get(`http://localhost:5000/faculty/searchFees/${searchParams}`, reqHeader)
                      .then((response) => {
                        return response.data;
                      });
    } catch(error) {
      console.log('Error', error)
    }
  };

  const downloadFeesbyId = async (uuid) => {
    try{
      return axios.get(`/faculty/downloadFeesReciept/${uuid}`,  {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoiJDJhJDA4JHR2YXlaWGU5SDFvZTNlTWdQZy5MTWVURlZsS0FMTnZWcFF6SVdOTDV3d2F2Zy9NeDBVc3hDIiwiaWF0IjoxNjMzODAwMzgzLCJleHAiOjE2MzM4MDM5ODN9.1Wwo_vtPRqYfZCm7-pQoUCrwgvKLPy7CqbyTC9-N3FU",
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer",
      })
      .then(response => {
        return response.data
      })
          // const response = await fetch(
    //   `http://localhost:5000/faculty/downloadFeesReciept/${uuid}`,
      // {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   responseType: "arraybuffer",
      // }
    // );
    // if (!response.ok) {
    //   throw new Error("something went wrong");
    // }

    // // console.log('response', response);
    // const res = await response.blob();
    // return res;
    }catch(error) {
      console.log('Error', error);
    }
  };

  return (
    <FeesContext.Provider
      value={{
        fetchFees,
        fetchFeesFormFields,
        addFeesIntoDatabase,
        searchFees,
        downloadFeesbyId,
      }}
    >
      {props.children}
    </FeesContext.Provider>
  );
};
