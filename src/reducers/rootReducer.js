import { combineReducers } from 'redux';
import hackerReducers from './hackerReducers';
 

const rootReducer = combineReducers({
    hackerReducers: hackerReducers
});

export default rootReducer;
