import * as types from './../constants/ActionTypes';

//Khai báo giá trị mặc định
let initialState = '';

//Khởi tạo reducer
let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SEARCH:
            return action.keyword;
        default:
            return state;
    }
};

export default myReducer;