import * as types from './../constants/ActionTypes';

let data = JSON.parse(localStorage.getItem('tasks'));
//Khai báo giá trị mặc định
let initialState = data ? data : [];

//Khởi tạo reducer
let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.LIST_ALL:
            return state;
        default:
            return state;
    }
    // return state;
};

export default myReducer;