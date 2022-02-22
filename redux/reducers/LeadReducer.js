import {ActionTypes} from '../contants/ActionTypes';

const initialValues={
    AllLeads:[],
    SellerLeads:[],
    BuyerLeads:[],
    pagination:{},
    FilteredLead:{}
}

export const leadReducer=(state=initialValues,{type,payload})=>{
    
    switch (type){
        
        case ActionTypes.ALL_LEAD:
            return {...state,AllLeads:payload}
        case ActionTypes.PAGINATION:
            return {...state,pagination:payload}
        case ActionTypes.FILTERED_LEAD_DATA:
            return {...state,FilteredLead:payload}
        
    
    
        default:
            return state
      }
    
    
}
