import axios from 'axios';
import {BASE_URL} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ENABLED,
  GET_ALL_NOTIFICATION_SETTINGS,
  GET_ALL_PRIVACY_SETTINGS,
  POST_NOTIFICATION_SELECTED,
  POST_PRIVACY_SELECTED,
  REQ_FAILURE,
  STATE_CLEANUP,
} from './actionTypes';

export const stateCleanUp = () => ({
  type: STATE_CLEANUP,
});
export const enable = () => ({
  type: ENABLED,
});
export const privacySetting = data => ({
  type: GET_ALL_PRIVACY_SETTINGS,
  data,
});

export const privacySettingSelect = data => ({
  type: POST_PRIVACY_SELECTED,
  data,
});
export const notificationSetting = data => ({
  type: GET_ALL_NOTIFICATION_SETTINGS,
  data,
});

export const notificationSettingSelect = data => ({
  type: POST_NOTIFICATION_SELECTED,
  data,
});

export const reqFailure = error => ({
  type: REQ_FAILURE,
  error: error,
});

export const getAllNotificationSetting = id => {
  return async dispatch => {
    try {
      console.log('id', id);
      const response = await axios.get(
        BASE_URL + `/api/notification/user/${id}`,
      );
      if (response.status) {
        dispatch(notificationSetting(response.data));
        // console.log("by", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
export const getAllPrivacySetting = id => {
  return async dispatch => {
    try {
      console.log('id', id);
      const response = await axios.get(
        BASE_URL + `/api/privacyAndSecurity/user/${id}`,
      );
      if (response.status) {
        dispatch(privacySetting(response.data));
        // console.log("by", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};

export const selectedPrivacySetting = (id, psId, psItemId, isEnabled) => {
  return async dispatch => {
    try {
      console.log('selecting privacy', id, psId, psItemId, isEnabled);
      const response = await axios.post(
        BASE_URL + `/api/privacyAndSecurity/user/${id}`,
        {
          psId: psId,
          psItemId: psItemId,
          isEnabled: isEnabled,
        },
      );
      if (response.status) {
        dispatch(privacySettingSelect(response.data));
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
export const selectedNotificationSetting = (id,notificationId, isEnabled) => {
  return async dispatch => {
    try {
      console.log('notification action selecting', id,notificationId, isEnabled);
      const response = await axios.post(
        BASE_URL + `/api/notification/user/${id}`,
        {
         notificationId: notificationId,
          isEnabled: isEnabled,
        },
      );
      if (response.status) {
        dispatch(notificationSettingSelect(response.data));
        console.log("selected notification", response.data)
      }
    } catch (err) {
      console.log('REQUEST FAILED');
      console.log(err.message);
      dispatch(reqFailure(err.message));
    }
  };
};
