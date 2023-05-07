const initialState = {
    loading:true,
    data:[],
    errors:[]
};

const employeeReducer = (state = initialState,action) =>{
    switch(action.type){
        case "EMP_CREATE_SUCCESS":
            return {...state,loading:false,data:action.payload,errors:[]};
        case "EMP_ALL_SUCCESS":
            return {...state,loading:false,data:action.payload,errors:[]};
        case "EMP_SINGLE_SUCCESS":
            return {...state,loading:false,data:action.payload,errors:[]};
        case "EMP_FAILED":
            return {...state,loading:false,data:[],errors:action.payload}
        default:
            return state;
    }
}


export default employeeReducer;