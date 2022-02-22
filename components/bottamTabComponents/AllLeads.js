import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Text, View} from 'react-native';
import LeadCardItem from './LeadCardItem';
import React, {useEffect, useState} from 'react';
import FlatListLeads from './FlatListLeads';
import {leadsApi} from '../Network/NetworkBuilder';
import {AddAllLeads, AddPagination} from '../../redux/actions/leadActions';

function AllLeads() {
    const leads = useSelector(state => state.leadReducer);
    
    
    return (
        <View style={{marginHorizontal:10, flex: 1, backgroundColor: '#f2f2f2', borderRadius: 5,justifyContent:'space-between'}}>
            <FlatListLeads data={leads.AllLeads}/>
         
        </View>
    );
}
export default AllLeads
