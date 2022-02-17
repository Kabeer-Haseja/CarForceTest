import React, {useEffect} from 'react';
import Tabs from './Tabs';
import {leadsApi} from './Network/NetworkBuilder';
import {AddAllLeads, AddPagination} from '../redux/actions/leadActions';
import {useDispatch, useSelector} from 'react-redux';

function MainPage(props) {
    const header = useSelector(state => state.loginReducer.headers);
    const dispatch = useDispatch();
    
 async   function fetchData(){
        const response =  await leadsApi(header,1)
        if(response.status)
        {
            dispatch(AddPagination(response.data.pagination))
            dispatch(AddAllLeads(response.data.crm_leads))
        }
        else{
        }
    
    }
    useEffect(  () => {
        fetchData()
    }, []);
    
    return (
        
            <Tabs />
       );
}

export default MainPage;
