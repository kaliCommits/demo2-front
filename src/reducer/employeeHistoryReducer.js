const initialState = {
    loading:true,
    data:[],
    errors:[]
};


const employeeHistoryReducer = (state=initialState,action)=>{
    switch(action.type){
        case "SALARY_HISTORY_SUCCESS":
            return {
              ...state,
              loading: false,
              data: action.payload,
              errors: [],
            };
        case "SALARY_HISTORY_FAILED":
            return {
              ...state,
              loading: false,
              data: [],
              errors: action.payload,
            };
        default:
            return state;
    }
}

export default employeeHistoryReducer;