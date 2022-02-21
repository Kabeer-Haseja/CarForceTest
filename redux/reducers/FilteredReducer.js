import {ActionTypes} from '../contants/ActionTypes';

const initialValues={
    FilteredLead:{},
    filteredPagination:{}
}

export const FilteredReducer=(state=initialValues,{type,payload})=>{
    
    switch (type){
        case ActionTypes.FILTERED_LEAD_DATA:
            return {...state,FilteredLead:payload}
        case ActionTypes.FILTERED_LEAD_DATA:
            return {...state,FilteredLead:payload}
        case ActionTypes.FILTERED_PAGINATION:{
            return {...state,filteredPagination:payload}
        }
        case ActionTypes.RESET_FILTERS:{
            return state=initialValues
        }
    
        default:
            return state
    }
    
    
}
