import { combineReducers } from 'redux';
import postReducer from './Post/reducer';
import chatReducer from './Chat/reducer';
import messageReducer from './Message/reducer';
import authReducer from './auth/reducer'
import activityReducer from './activity/reducer'
import notificationReducer from './Notifications/reducer';

const rootReducer = combineReducers({
  authState: authReducer,
  activityState: activityReducer,
  postState: postReducer,
  chatState: chatReducer,
  messageState: messageReducer,
  notificationState: notificationReducer
});

export default rootReducer;