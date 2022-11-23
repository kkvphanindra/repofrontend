import axios from 'axios';
import {
  GET_ALL_ACTIVITY_BY_USER_ID,
  NEW_ACTIVITY_BY_USER_ID,
  GET_ACTIVITY_DETAILS_BY_ACTIVITY_ID,
  ACTIVITY_SUCCESS,
  ACTIVITY_FAILURE,
  REQ_START,
  GET_ACTIVITY_NAME,
  GET_GROUP_NAME,
  ACTIVITY_NAME,
  GROUP_NAME,
  GET_ALL_USERS_BY_GROUP_ID,
  ENDED_TIME,
  STARTED_TIME,
  DELETE_ACTIVITY,
  USER_STATUS,
} from './actionTypes';

export const req = () => {
  console.log('started activity');
  return {type: REQ_START};
};

export const reqSuccess = data => ({
  type: ACTIVITY_SUCCESS,
  data,
});

export const reqFailure = error => ({
  type: ACTIVITY_FAILURE,
  error: error,
});
export const ActivityByUserId = data => ({
  type: GET_ALL_ACTIVITY_BY_USER_ID,
  data,
});
export const newActivityByUserId = id => ({
  type: NEW_ACTIVITY_BY_USER_ID,
  id,
});
export const getActivityDetailsByactivityId = data => ({
  type: GET_ACTIVITY_DETAILS_BY_ACTIVITY_ID,
  data,
});
export const getActivityName = data => ({
  type: GET_ACTIVITY_NAME,
  data,
});
export const ActivityName = data => ({
  type: ACTIVITY_NAME,
  data,
});
export const getGroupName = data => ({
  type: GET_GROUP_NAME,
  data,
});
export const GroupName = data => ({
  type: GROUP_NAME,
  data,
});
export const getAllUsersByGroupId = data => ({
  type: GET_ALL_USERS_BY_GROUP_ID,
  data,
});
export const startedTime = data => ({
  type: STARTED_TIME,
  data,
});
export const endedTime = data => ({
  type: ENDED_TIME,
  data,
});
export const userStatus = data => ({
  type: USER_STATUS,
  data,
});
export const deleteActivity = data => ({
  type: DELETE_ACTIVITY,
  data,
});
export const getAllActivityByUserId = (today, week, month, year) => {
  return async dispatch => {
    try {
      // console.log("week", today,week,month)
      if (today === true) {
        const response = await axios.get(
          `https://frisles.herokuapp.com/api/activity/user/3ac1df80-5a6e-11ed-a871-7d8265a60df7?today=${today}`,
        );
        if (response.status) {
          dispatch(ActivityByUserId(response.data));
          // console.log("today", response.data)
        }
      } else if (week === true) {
        const response = await axios.get(
          `https://frisles.herokuapp.com/api/activity/user/3ac1df80-5a6e-11ed-a871-7d8265a60df7?week=${week},`,
        );
        if (response) {
          dispatch(ActivityByUserId(response.data));
          // console.log("week", response.data)
        }
      } else if (month === true) {
        const response = await axios.get(
          `https://frisles.herokuapp.com/api/activity/user/3ac1df80-5a6e-11ed-a871-7d8265a60df7?month=${month},`,
        );
        if (response) {
          dispatch(ActivityByUserId(response.data));
          // console.log("month", response.data)
        }
      } else if (year === true) {
        const response = await axios.get(
          `https://frisles.herokuapp.com/api/activity/user/3ac1df80-5a6e-11ed-a871-7d8265a60df7?month=${year},`,
        );
        if (response) {
          dispatch(ActivityByUserId(response.data));
          // console.log("month", response.data)
        }
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.status);
      dispatch(reqFailure(err.message));
    }
  };
};

export const newActivity = data => {
  return async dispatch => {
    dispatch(req());
    // console.log(accessToken)
    // console.log("product actions", _id)
    try {
      const response = await axios.post(
        // STOREURL +
        `http://byit-be-store.herokuapp.com/api/product`,
        {
          startDate: data.startDate,
          endDate: data.endDate,
          startTime: data.startTime,
          endTime: data.endTime,
          activityName: data.activityName,
          assignTo: data.assignTo,
          groupName: data.groupName,
          users: data.users,
          message: data.message,
        },
        // {
        //     headers: { Authorization: 'Bearer ' + accessToken },
        // },
      );
      console.log(response.data);
      if (response) {
        // console.log('COMPLETE RESPONSE DATA:', response.data)
        console.log('else if', response.data);
        dispatch(newActivityByUserId(response.data));
      }
    } catch (err) {
      console.log('Request failed');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const activityByActivityId = id => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `https://frisles.herokuapp.com/api/activity/${id}`,
      );
      if (response.status) {
        dispatch(getActivityDetailsByactivityId(response.data));
        // console.log("today", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.data.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const activityName = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `https://frisles.herokuapp.com/api/activity-type`,
      );
      if (response.status) {
        dispatch(getActivityName(response.data));
        dispatch(ActivityName(response.data));
        // console.log("activityName", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const groupName = () => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `https://frisles.herokuapp.com/api/chat/group`,
      );
      if (response.status) {
        dispatch(getGroupName(response.data));
        dispatch(GroupName(response.data));
        // console.log("GroupName", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const UsersByGroupId = id => {
  return async dispatch => {
    try {
      const response = await axios.get(
        `https://frisles.herokuapp.com/api/chat/${id}/user`,
      );
      if (response.status) {
        dispatch(getAllUsersByGroupId(response.data));
        // dispatch(GroupName(response.data));
        // console.log("GroupName", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const startTime = (startTime, activityId, startId) => {
  return async dispatch => {
    dispatch(req());
    console.log('endTime activity action', startTime, activityId, startId);
    // console.log("product actions", _id)
    try {
      const response = await axios.post(
        // STOREURL +
        `https://frisles.herokuapp.com/api/activity/${activityId}/user/${startId}`,
        {
          startedTime: startTime,
        },
      );
      console.log(response.data);
      if (response) {
        // console.log('COMPLETE RESPONSE DATA:', response.data)
        console.log('else if', response.data.message);
        dispatch(startedTime(response.data.message));
      }
    } catch (err) {
      console.log('Request failed');
      console.log(err.response.data.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const endTime = (endTime, activityId, endId) => {
  return async dispatch => {
    dispatch(req());
    console.log('endTime activity action', endTime, activityId, endId);
    // console.log("product actions", _id)
    try {
      const response = await axios.put(
        // STOREURL +
        `https://frisles.herokuapp.com/api/activity/${activityId}/user/${endId}`,
        {
          endedTime: endTime,
        },
      );
      console.log(response.data);
      if (response) {
        // console.log('COMPLETE RESPONSE DATA:', response.data)
        console.log('else if', response.data);
        dispatch(endedTime(response.data));
      }
    } catch (err) {
      console.log('Request failed');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const deleteActivityByActivityId = (status,activityId) => {
  return async dispatch => {
    dispatch(req());
    console.log('delete activity',activityId)
    try {
      const response = await axios.put(
        `https://frisles.herokuapp.com/api/activity/${activityId}`,
        {
          isActive: status
        }
      );
      if (response) {
        console.log('else if', response.data);
        dispatch(deleteActivity(response.data.message));
        // dispatch(reqSuccessGetProducts(response.data))
        // console.log("351 product reducer", response.data, response.status)
      }
    } catch (err) {
      console.log('Request failed');
      console.log(err.response.data.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const userStatusByactivityId = (status, activityId, userId) => {
  return async dispatch => {
    dispatch(req());
    console.log('user status activity action', status, activityId, userId);
    // console.log("product actions", _id)
    try {
      const response = await axios.put(
        // STOREURL +
        `https://frisles.herokuapp.com/api/activityAndUserStatus/activity/${activityId}/user/${userId}`,
        {
          status: status,
        },
      );
      console.log(response.data);
      if (response) {
        // console.log('COMPLETE RESPONSE DATA:', response.data)
        console.log('else if', response.data);
        dispatch(userStatus(response.data));
      }
    } catch (err) {
      console.log('Request failed');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
