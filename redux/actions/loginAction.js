import {ActionTypes} from '../contants/ActionTypes';

export const AddLead=(lead)=>{
    return {
        type: ActionTypes.CRM_LEAD,
        payload:lead
    }
}
