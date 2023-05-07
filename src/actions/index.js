import {apiReq} from "../api";
import {CURRENT_USER_SUCCESS,
  CURRENT_USER_FAILED,
  EMP_CREATE_SUCCESS,
  EMP_SINGLE_SUCCESS,
  EMP_ALL_SUCCESS,
  EMP_FAILED,
  SALARY_HISTORY_SUCCESS,
  SALARY_HISTORY_FAILED
} from "../actionNames";

export const signinAction = ({name,password,type,navigate})=>{
    return async(dispatch,getState)=>{
        try{
           const {data} =  await apiReq.post(`/signin?m=${type}`,{name,password});
           dispatch({ type: CURRENT_USER_SUCCESS, payload: data });
           navigate("/dash/admin");
        }catch(e){
            console.log("error",e);
            dispatch({ type: CURRENT_USER_FAILED, payload: e.response.data });
        }        
    }
}

export const empSignUpAction = ({name,password,email,phone,category,salary,navigate})=>{
    return async(dispatch,getState)=>{
        try{
           const {data} =  await apiReq.post(`/employee`,{name,password,email,phone,category,salary:parseInt(salary)});
           dispatch({type:EMP_CREATE_SUCCESS,payload:data});
           navigate("/dash/admin");
        }catch(e){
            console.log("error",e);
            dispatch({type:EMP_FAILED,payload:e.response.data})
        }        
    }
}

export const empAllAction = ()=>{
    return async(dispatch,getState)=>{
        try{
           const {data} =  await apiReq.get(`/employee`);
           console.log("emp all",data);
           dispatch({type:EMP_ALL_SUCCESS,payload:data});
        }catch(e){
            console.log("error",e);
            dispatch({type:EMP_FAILED,payload:e.response.data})
        }        
    }
}

export const empSingleAction = (id) => {
  // console.log(id);
  return async (dispatch, getState) => {
    try {
      const { data } = await apiReq.get(`/employee/${parseInt(id)}`);
      dispatch({ type: EMP_SINGLE_SUCCESS, payload: data });
    } catch (e) {
      console.log("error", e);
      dispatch({ type: EMP_FAILED, payload: e.response.data });
    }
  };
};

export const empUpdateAction = ({id,name,email,phone,category,navigate}) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await apiReq.put(`/employee/${id}`,{name,email,phone,category});
      console.log(data);
      navigate("/dash/admin");
    } catch (e) {
      console.log("error", e);
      dispatch({ type: EMP_FAILED, payload: e.response.data });
    }
  };
};

export const empSalaryUpdate = ({id,salary,navigate})=>{
  return async (dispatch, getState) => {
    console.log(id);
    try {
      const { data } = await apiReq.put(`/employee/${id}/salary`, {
       employee_id:id,
       salary
      });
      navigate("/dash/admin");
    } catch (e) {
      console.log("error", e);
      dispatch({ type: EMP_FAILED, payload: e.response.data });
    }
  };
}

export const empSalaryHistory = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await apiReq.get(`/employee/${id}/salary/history`);
      console.log(data);
      dispatch({type:SALARY_HISTORY_SUCCESS,payload:data})
    } catch (e) {
      console.log("error", e);
      dispatch({ type: SALARY_HISTORY_FAILED, payload: e.response.data });
    }
  };
};

export const currentUserAction = ()=>{
    return async(dispatch,getState)=>{
        try{
           const {data} =  await apiReq.get(`/currentuser`);
           dispatch({ type: CURRENT_USER_SUCCESS, payload: data });
        }catch(e){
            console.log("error",e);
            dispatch({ type: CURRENT_USER_FAILED, payload: e.response.data });
        }        
    }
}

export const signOutAction = (navigate)=>{
  return async (dispatch, getState) => {
    try {
      const { data } = await apiReq.post(`/signout`);
      console.log(data);
      dispatch({ type: CURRENT_USER_SUCCESS, payload: data });
      navigate("/");
    } catch (e) {
      console.log("error", e);
      dispatch({ type: CURRENT_USER_FAILED, payload: null });
    }
  };
}

export const clearErrorAction = ()=>{
    return (dispatch,getState)=>{
        dispatch({type:"CLEAR_ERROR"});
    }
}