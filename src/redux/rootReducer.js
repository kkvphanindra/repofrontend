import { combineReducers } from 'redux';
import postReducer from './Post/reducer';
import chatReducer from './Chat/reducer';
import messageReducer from './Message/reducer';

const rootReducer = combineReducers({
  postState: postReducer,
  chatState: chatReducer,
  messageState: messageReducer,
});

export default rootReducer;