import {REQ, SLAMBOOK_FAILURE, GET_SLAMBOOK_BY_USER_ID,STATE_CLEANUP, GET_SLAMBOOK_BY_USER_ID_RECEIVED, GET_SLAMBOOK_BY_USER_ID_SENT} from './actionTypes';
import axios from 'axios';
import {BASE_URL} from '@env';

export const req = () => {
  console.log('started');
  return {
    type: REQ,
  };
};
export const stateCleanup = () => ({
    type: STATE_CLEANUP,
});
export const getAllSlambookReceived = data => {
  return {
    type: GET_SLAMBOOK_BY_USER_ID_RECEIVED,
    data,
  };
};
export const getAllSlambookSent = data => {
    return {
      type: GET_SLAMBOOK_BY_USER_ID_SENT,
      data,
    };
  };
export const reqFailure = error => {
  // console.log('error');
  return {
    type: SLAMBOOK_FAILURE,
    error: error,
  };
};

export const getAllSlambookByUserId = (id,received,sent) => {
  return async dispatch => {
    // dispatch(reqStartNewPost());
    try {
      // console.log("post id user",id)
      if(received==true){
          const response = await axios.get(
            BASE_URL + `/api/slambook/user/${id}?received=true`,
          );
          if (response.status) {
            dispatch(getAllSlambookReceived(response.data));
            // console.log("received",response.data)
          }
      }else if(sent==true){
        const response = await axios.get(
            BASE_URL + `/api/slambook/user/${id}?sent=true`,
          );
          if (response.status) {
            dispatch(getAllSlambookSent(response.data));
            // console.log("sent",response.data)
          }
      }
    } catch (err) {
      // console.log("cool")
      console.log('Request failed post');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
