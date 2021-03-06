//import các reducers
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import task from './task';
import filterTasks from './filterTasks';
import search from './search';
import sort from './sort'

//import combine
import { combineReducers } from 'redux';

//combine các reducers
const myReducers = combineReducers({
    // reducers
    tasks,
    isDisplayForm,
    task,
    filterTasks,
    search,
    sort
});

export default myReducers;