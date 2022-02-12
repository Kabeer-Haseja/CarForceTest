import {ActionTypes} from '../contants/ActionTypes';

const initialValues={
    AllLeads:[],
    SellerLeads:[],
    BuyerLeads:[]
}

export const leadReducer=(state=initialValues,{type,payload})=>{
    
    switch (type){
        case ActionTypes.ALL_LEAD:
            return {...state,AllLeads:{...payload}}
        case ActionTypes.SELLER_LEAD:
            return {...state,SellerLeads:{...payload}}
        
        default:
            return state
      }
    
    
}
