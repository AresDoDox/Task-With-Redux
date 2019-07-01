import * as types from './../constants/ActionTypes';

//Khai báo giá trị mặc định
let initialState = false;

//Khởi tạo reducer
let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.TOGGLE_FORM:
            state = !state;
            return state;
        case types.CLOSE_FORM:
            state = false;
            return state;
        case types.OPEN_FORM:
            state = true;
            return state;
        default:
            return state;
    }
    // return state;
};

export default myReducer;