import {useDispatch, useSelector} from 'react-redux';
import {FlatList, View} from 'react-native';
import LeadCardItem from './LeadCardItem';
import React, {useEffect} from 'react';
import FlatListLeads from './FlatListLeads';


function BuyerLeads() {
    const leads = useSelector(state => state.leadReducer);
    const buyerLeads = leads.AllLeads.filter((item) => item.category.name == 'Buyer');
    
    
    return (
        <View style={{marginHorizontal:10, flex: 1, backgroundColor: '#f2f2f2', justifyContent:'space-between'}}>
        <FlatListLeads data={buyerLeads}/>
        </View>
    );
}

export default BuyerLeads;
