import axios from 'axios';
import {BASE_URL} from '@env';
import {REQ, REQ_FAILURE, REQ_SUCCESS} from './actionTypes';

export const req = data => ({
  type: REQ,
  data,
});

export const reqSucess = data => ({
  type: REQ_SUCCESS,
  data,
});

export const reqFailure = error => ({
  type: REQ_FAILURE,
  error: error,
});

export const location = (id, lat, long) => {
    return async dispatch => {
        console.log("lat long", lat, long)
      try {
        const response = await axios.post(
          BASE_URL+`/api/user/${id}/nearest/users`,
          {
            latitude: lat,
            longitude: long
        }
        );
        if (response.status) {
          dispatch(reqSucess(response.data));
          console.log("location action", response.data)
        }
      } catch (err) {
        console.log('REQUEST FAILED');
        console.log(err.response.data.message);
        dispatch(reqFailure(err.message));
      }
    };
  };
