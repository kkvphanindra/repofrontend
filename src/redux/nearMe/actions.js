import axios from 'axios';
import {BASE_URL} from '@env';
import {REQ, REQ_FAILURE, SUCCESS} from './actionTypes';

export const req = () => ({
  type: REQ,
});

export const reqSucess = data => ({
  type: SUCCESS,
  data,
});

export const reqFailure = error => ({
  type: REQ_FAILURE,
  error: error,
});

export const location = (id, lat, long) => {
    return async dispatch => {
        // console.log("lat long", lat, long,id)
      try {
        const response = await axios.post(
          BASE_URL+`/api/user/${id}/nearest/users`,
          {
            latitude: lat,
            longitude: long
        }
        );
        if (response.status==200) {
          dispatch(reqSucess(response.data));
          // console.log("location action", response.data)
        }
      } catch (err) {
        console.log('REQUEST FAILED location action');
        console.log(err.message);
        dispatch(reqFailure(err.message));
      }
    };
  };
