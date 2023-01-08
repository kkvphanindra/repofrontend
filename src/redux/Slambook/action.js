import {
  REQ, SLAMBOOK_FAILURE, 
  GET_GROUP_FRIENDS_WITH_DETAILS,
  STATE_CLEANUP, 
  GET_SLAMBOOK_BY_USER_ID_RECEIVED, 
  GET_SLAMBOOK_BY_USER_ID_SENT,
  CREATE_SLAMBOOK,
  UPDATE_SLAMBOOK_STATUS,
  FILL_SLAMBOOK
} from './actionTypes';
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
export const slambookCreate = data => {
  return {
    type: CREATE_SLAMBOOK,
    data,
  };
};
export const getAllSlambookSent = data => {
    return {
      type: GET_SLAMBOOK_BY_USER_ID_SENT,
      data,
    };
  };
  export const getGroupsDetails = data => {
    return {
      type: GET_GROUP_FRIENDS_WITH_DETAILS,
      data,
    };
  };
  export const updateStatus = data => {
    return {
      type: UPDATE_SLAMBOOK_STATUS,
      data,
    };
  };
  export const slambookFill = data => {
    return {
      type: FILL_SLAMBOOK,
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

export const getAllGroupFriendsDetails = (id) => {
  return async dispatch => {
    try {
          const response = await axios.get(
            BASE_URL + `/api/slambook/user/${id}/friends`,
          );
          if (response.status) {
            dispatch(getGroupsDetails(response.data));
            // console.log("group friends details",response.data)
          }
        // }
    } catch (err) {
      console.log('Request failed post');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const createSlambook = (id,invitedTo) => {
  return async dispatch => {
    try {
      // console.log("invited",id,invitedTo)
          const response = await axios.post(
            BASE_URL + `/api/slambook/user/${id}`,{
              invitedTo:invitedTo
            }
          );
          if (response.status) {
            dispatch(slambookCreate(response.data));
            // console.log("slambook create",response.data)
          }
        // }
    } catch (err) {
      console.log('Request failed post');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const updateSlambookStatus = (invitedBy,invitedTo,status) => {
  return async dispatch => {
    try {
      // console.log("invited",invitedBy,invitedTo,status)
          const response = await axios.put(
            BASE_URL + `/api/slambook/invitedBy/${invitedBy}/invitedTo/${invitedTo}/fill`,{
              status:status
            }
          );
          if (response.status) {
            dispatch(updateStatus(response.data));
            // console.log("slambook updated",response.data)
          }
        // }
    } catch (err) {
      console.log('Request failed post');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const slambookFillUp = (invitedBy,invitedTo,
  fullName,
  friendsCallme,dob,
  email,
  bestfriend,
  happeistMomentOfLife,
  threePlaceYouWantToSeeBeforeDie) => {
  return async dispatch => {
    try {
      // console.log("slambook fill",invitedBy,invitedTo,fullName,friendsCallme,dob,email,bestfriend,happeistMomentOfLife,threePlaceYouWantToSeeBeforeDie)
          const response = await axios.put(
            BASE_URL + `/api/slambook/invitedBy/${invitedBy}/invitedTo/${invitedTo}/fill`,{
              fullName: fullName,
              friendsCallme: friendsCallme,
              dob: dob,
              email: email,
              bestfriend:bestfriend,
              happeistMomentOfLife: happeistMomentOfLife,
              threePlaceYouWantToSeeBeforeDie: threePlaceYouWantToSeeBeforeDie
            }
          );
          if (response.status) {
            dispatch(slambookFill(response.data));
            // console.log("slambook fill",response.data)
          }
        // }
    } catch (err) {
      console.log('Request failed post');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};