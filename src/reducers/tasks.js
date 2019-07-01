import * as types from './../constants/ActionTypes';
import randomstring from 'randomstring';

let data = JSON.parse(localStorage.getItem('tasks'));
//Khai báo giá trị mặc định
let initialState = data ? data : [];

// Các hàm
//---Tìm index
let  findIndex = (tasks, id) => {
    let result = -1;
    tasks.forEach( (task,index) => {
      if(task.id === id){
        return result = index; 
      }
    });
    return result;
}

let id ='';
let index = -1;


//Khởi tạo reducer
let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LIST_ALL:
            return state;
        case types.SAVE_TASK:
            // Thêm task mới vào data  
            var task = {
                id: action.task.id,
                name: action.task.name,
                status: action.task.status === true ? true : false
            }
            if(!task.id){
                task.id = randomstring.generate(5);
                state.push(task);
            }else{
                index = findIndex(state, task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        case types.UPDATE_STATUS_TASK:
            id = action.id;
            index = findIndex(state, id);
            if( index !== -1){
                state[index] = {
                    ...state[index],
                    status: !state[index].status 
                }
            }
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state];
        case types.DELETE_TASK:
            id = action.id;
            index = findIndex(state, id);
            state.splice(index, 1)
            localStorage.setItem('tasks',JSON.stringify(state));
            return [...state]
        default:
            return state;
    }
    // return state;
};

export default myReducer;