import * as types from './../constants/ActionTypes';

//Khai báo giá trị mặc định
let initialState = {
    name: '',
    status: -1
};

//Khởi tạo reducer
let myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FILTER_TABLE:
            return {
                name: action.filterObj.name,
                status: parseInt(action.filterObj.status,10)
            };
        default:
            return state;
    }
};

export default myReducer;