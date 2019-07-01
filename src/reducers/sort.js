import * as types from './../constants/ActionTypes';

//Khai báo giá trị mặc định
let initialState = {
    sortBy: 'name',
    sortValue: 1
};

//Khởi tạo reducer
let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SORT:
            return {
                sortBy: action.sortObj.sortBy,
                sortValue: action.sortObj.sortValue
            };
        default:
            return state;
    }
};

export default myReducer;