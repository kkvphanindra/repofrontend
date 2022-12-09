import {
  REQ,
  REQ_SUCCESS,
  SET_NEW_AUTH_TOKEN,
  REQ_FAILURE,
  REQ_TOKEN,
  LOGOUT,
} from './actionTypes';
import axios from 'axios';
import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const req = (
  coverPicture,
  dob,
  name,
  gender,
  occupation,
  phone,
  profilePicture,
  userId,
) => ({
  type: REQ_SUCCESS,
  coverPicture,
  dob,
  name,
  gender,
  occupation,
  phone,
  profilePicture,
  userId,
});

export const reqToken = data => ({
  type: REQ_TOKEN,
  data,
});

export const reqFailure = error => ({
  type: REQ_FAILURE,
  error: error,
});

export const login = number => {
  return async dispatch => {
    // dispatch(reqActivityLoading());
    console.log('login', number);
    try {
      const response = await axios.post(BASE_URL + `/api/user/number/details`, {
        number: number,
      });
      console.log(response.data);
      if (response) {
        console.log('COMPLETE RESPONSE DATA:', response.data[0].name);
        const userData = JSON.stringify({
          coverPicture: response.data[0].coverPicture,
          dob: response.data[0].dob,
          name: response.data[0].name,
          gender: response.data[0].gender,
          occupation: response.data[0].occupation,
          phone: response.data[0].phone,
          profilePicture: response.data[0].profilePicture,
          userId: response.data[0].userId,
        });
        await AsyncStorage.setItem('frislesAuthData', userData);
        console.log('Saved data to async storage!', userData);
        dispatch(
          req(
            response.data[0].coverPicture,
            response.data[0].dob,
            response.data[0].name,
            response.data[0].gender,
            response.data[0].occupation,
            response.data[0].phone,
            response.data[0].profilePicture,
            response.data[0].userId,
          ),
        );
      }
    } catch (err) {
      console.log('Request failed');
      console.log(err.response.status, err.message);
      dispatch(reqFailure(err.response.status));
    }
  };
};

export const tokenRetriever = () => {
  console.log('login works567');
  return async dispatch => {
    console.log('login works123');
    // dispatch(req());
    try {
      const userData = await AsyncStorage.getItem('frislesAuthData');
      const loggedData = userData != null ? JSON.parse(userData) : null;
      console.log('login works 2', userData);
      console.log('login works', loggedData);
      if (loggedData != null) {
        dispatch(
          req(
            loggedData.coverPicture,
            loggedData.dob,
            loggedData.name,
            loggedData.gender,
            loggedData.occupation,
            loggedData.phone,
            loggedData.profilePicture,
            loggedData.userId,
          ),
        );
      } else {
        //? LOGGING USER OUT.
        console.log('token retriever error 1: ');

        dispatch(logout());
        dispatch(reqFailure(''));
      }
    } catch (err) {
      //? ERROR RETRIEVING ASYNC STORAGE DATA.
      console.log('token retriever error: ', err.message);
      //? here, the loginFailure action sets the loading to false automatically.
      dispatch(logUserOut());
      dispatch(reqFailure(''));
    }
  };
};

export const logout = () => ({type: LOGOUT});
