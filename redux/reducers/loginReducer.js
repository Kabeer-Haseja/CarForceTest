import {ActionTypes} from '../contants/ActionTypes';

const initialValues={
    lead:[]
}

export const loginReducer=(state=initialValues,{type,payload})=>{
    
    switch (type){
        case ActionTypes.CRM_LEAD:
            return state=payload
        default:
            return state
    }
   
    
}
