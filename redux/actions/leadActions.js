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
export const FilteredLeadData=(filtered)=>{
    return{
        type:ActionTypes.FILTERED_LEAD_DATA,
        payload:filtered
    }
}
export const AddFilteredPagination=(pagination)=>{
    return{
        type:ActionTypes.FILTERED_PAGINATION,
        payload:pagination
    }
}
export const ResetFilters=()=>{
    return{
        type:ActionTypes.RESET_FILTERS
    }
}


