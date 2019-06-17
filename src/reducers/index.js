//import các reducers
import tasks from './tasks';

//import combine
import { combineReducers } from 'redux';

const myReducers = combineReducers({
    // reducers
    tasks
});

export default myReducers;