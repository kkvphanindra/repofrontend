import axios from 'axios';
import {
  STATE_CLEANUP,
  GET_ALL_ACTIVITY_BY_USER_ID,
  NEW_ACTIVITY_BY_USER_ID,
  POST_ACTIVITY_BY_USER_ID,
  GET_ACTIVITY_DETAILS_BY_ACTIVITY_ID,
  ACTIVITY_SUCCESS,
  ACTIVITY_FAILURE,
  REQ_START,
  GET_ACTIVITY_NAME,
  GET_GROUP_NAME,
  ACTIVITY_NAME,
  ACTIVITY_TYPE_NAME,
  GROUP_NAME,
  GET_ALL_USERS_BY_GROUP_ID,
  ENDED_TIME,
  STARTED_TIME,
  DELETE_ACTIVITY,
  USER_STATUS,
  SELECTED_USERS,
  ACTIVITY_TYPE,
} from './actionTypes';
import { BASE_URL } from '@env'

export const req = () => {
  console.log('started activity');
  return {type: REQ_START};
};
export const stateCleanUp = () => ({
  type:STATE_CLEANUP,
});
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
export const activityType = data => ({
  type: ACTIVITY_TYPE,
  data,
});
export const newActivityByUserId = id => ({
  type: NEW_ACTIVITY_BY_USER_ID,
  id,
});
export const postActivityByUserId = data => ({
  type: POST_ACTIVITY_BY_USER_ID,
  data,
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
export const ActivityTypeName = data => ({
  type: ACTIVITY_TYPE_NAME,
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
export const selectedUsers = data => ({
  type: SELECTED_USERS,
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
export const getAllActivityByUserId = (id,today, week, month, year) => {
  return async dispatch => {
    try {
      // //////console.log("week", today,week,month)
      if (today === true) {
        const response = await axios.get(
          BASE_URL+
          `/api/activity/user/${id}?today=${today}`,
        );
        if (response.status) {
          dispatch(stateCleanUp())
          dispatch(ActivityByUserId(response.data));
          console.log("today")
        }
      } else if (week === true) {
        const response = await axios.get(
          BASE_URL+
          `/api/activity/user/${id}?week=${week},`,
        );
        if (response) {
          dispatch(stateCleanUp())
          dispatch(ActivityByUserId(response.data));
          console.log("week")
        }
      } else if (month === true) {
        const response = await axios.get(
          BASE_URL+`/api/activity/user/${id}?month=${month},`,
        );
        if (response) {
          dispatch(stateCleanUp())
          dispatch(ActivityByUserId(response.data));
          console.log("month")
        }
      } else if (year === true) {
        const response = await axios.get(
          BASE_URL+`/api/activity/user/${id}?year=${year},`,
        );
        if (response) {
          dispatch(stateCleanUp())
          dispatch(ActivityByUserId(response.data));
          console.log("year")
        }
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
export const newActivity = (id,startDate,endDate,startTime,endTime,activityName,groupName,groupId, message, users,location) => {
  return async dispatch => {
    dispatch(req());
    // ////////console.log("product actions", _id)
    console.log('new activity', id,startDate,endDate,startTime,endTime,activityName,groupName,message, users,location);
    try {
      users.push(id)
      const response = await axios.post(
        // STOREURL +
        BASE_URL+`/api/activity`,
        {
          startDate:startDate ,
          endDate:endDate,
          startTime: startTime,
          endTime: endTime,
          activityName: activityName,
          assignTo: null,
          groupName: groupName,
          groupId:groupId,
          users:users,
          location: location,
          message:message,
          createdBy: id
        },
      );
      console.log(response.data);
      if (response) {
        // console.log('COMPLETE RESPONSE DATA:', response.data)
        console.log('post activity', response.data);
        dispatch(postActivityByUserId(response.data));
        dispatch(stateCleanUp())
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
        BASE_URL+`/api/activity/${id}`,
      );
      if (response.status) {
        dispatch(getActivityDetailsByactivityId(response.data));
        // ////////console.log("today", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.response.data.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const getActivityType = id => {
  return async dispatch => {
    try {
      const response = await axios.get(
        BASE_URL+`/api/activityTypes`,
      );
      if (response.status) {
        dispatch(activityType(response.data));
        dispatch(ActivityTypeName(response.data));
        ////////console.log("activity Type", response.data)
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
        BASE_URL+`/api/activity-type`,
      );
      if (response.status) {
        dispatch(getActivityName(response.data));
        dispatch(ActivityName(response.data));
        // ////////console.log("activityName", response.data)
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
        BASE_URL+`/api/chat/group`,
      );
      if (response.status) {
        dispatch(getGroupName(response.data));
        dispatch(GroupName(response.data));
        // ////////console.log("GroupName", response.data)
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
        BASE_URL+`/api/chat/${id}/user`,
      );
      if (response.status) {
        dispatch(getAllUsersByGroupId(response.data));
        // dispatch(GroupName(response.data));
        // ////////console.log("GroupName", response.data)
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
    // ////////console.log("product actions", _id)
    try {
      const response = await axios.post(
        // STOREURL +
        BASE_URL+`/api/activity/${activityId}/user/${startId}`,
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
    // ////////console.log("product actions", _id)
    try {
      const response = await axios.put(
        // STOREURL +
        BASE_URL+`/api/activity/${activityId}/user/${endId}`,
        {
          endedTime: endTime,
        },
      );
      console.log(response.data);
      if (response) {
        // console.log('COMPLETE RESPONSE DATA:', response.data)
        console.log('else if', response.data);
        dispatch(endedTime(response.data));
        dispatch(getAllActivityByUserId())
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
        BASE_URL+`/api/activity/${activityId}`,
        {
          isActive: status
        }
      );
      if (response) {
        console.log('else if', response.data);
        dispatch(deleteActivity(response.data.message));
        // dispatch(reqSuccessGetProducts(response.data))
        // ////////console.log("351 product reducer", response.data, response.status)
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
    // ////////console.log("product actions", _id)
    try {
      const response = await axios.put(
        BASE_URL +
        `/api/activityAndUserStatus/activity/${activityId}/user/${userId}`,
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
