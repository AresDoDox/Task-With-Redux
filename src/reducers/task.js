import * as types from './../constants/ActionTypes';

//Khai báo giá trị mặc định
let initialState = {
    id: '',
    name: '',
    status: false
};

//Khởi tạo reducer
let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.EDIT_TASK:
            return action.task;
        default:
            return state;
    }
};

export default myReducer;