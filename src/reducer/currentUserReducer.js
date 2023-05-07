const initialState = {
  data: {},
  loading: true,
  errors: [],
};

const currentUserReducer = (state=initialState,action) =>{
    switch(action.type){
        case "CURRENT_USER_SUCCESS":
            return {...state,data:action.payload,loading:false,errors:[]};
        case "CURRENT_USER_FAILED":
            return {...state,data:{},loading:false,errors:action.payload};
        default:
            return state;
    }
}

export default currentUserReducer;