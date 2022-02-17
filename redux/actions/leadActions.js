import {ActionTypes} from '../contants/ActionTypes';

export const AddAllLeads=(AllLeads)=>{
    return{
        type :ActionTypes.ALL_LEAD,
        payload:AllLeads
    }
    
}
export const AddSellerLeads=(SellerLeads)=>{
    return{
        type :ActionTypes.SELLER_LEAD,
        payload:SellerLeads
    }
    
}
export const AddPagination=(pagination)=>{
    return{
        type:ActionTypes.PAGINATION,
        payload:pagination
    }
}

