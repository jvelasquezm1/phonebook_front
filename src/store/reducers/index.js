import { combineReducers } from 'redux';
import entriesReducer from './entries.reducers';

export default combineReducers({
  entries: entriesReducer,
});
