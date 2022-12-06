import {
    REQ,
    REQ_SUCCESS,
    SET_NEW_AUTH_TOKEN,
    REQ_FAILURE,
    LOGOUT,
  } from './actionTypes';
  import axios from 'axios';
  
  export const req = (data) => ({
    type: REQ_SUCCESS,
    data
  });

  export const reqFailure = (error) => ({
    type: REQ_FAILURE,
    error: error
  });
  
  export const login = (number) => {
    return async (dispatch) => {
        // dispatch(reqActivityLoading());
        console.log("login",number)
        try {
            const response = await axios.post(
                `https://frisles.herokuapp.com/api/user/number/details`,
                {
                    number: number
                }
            )
            console.log(response.data)
            if (response.headers.error) {
                console.log(response.headers.error);
            }
            else if (response) {
                console.log('COMPLETE RESPONSE DATA:', response.data)
                // dispatch(reqActivityLoading());
                // console.log("add post like",response)
                dispatch(req(response.data));
            }
            else {
                dispatch(reqFailure('Some Error Occured'));
            }
        }
        catch (err) {
            console.log("Request failed");
            console.log(err.message)
            dispatch(reqFailure(err.message));
        }
    };
}

  export const logout = () => ({type: LOGOUT});