const errorsReducer = (state = [],action)=>{
    switch(action.type){
        case "ERRORS":
            return action.payload;
        case "CLEAR_ERROR":
            return [];
        default :
            return state;
    }
}

export default errorsReducer;