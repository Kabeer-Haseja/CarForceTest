import {useDispatch, useSelector} from 'react-redux';
import {FlatList, View} from 'react-native';
import LeadCardItem from './LeadCardItem';
import React, {useEffect} from 'react';
import FlatListLeads from './FlatListLeads';


function BuyerLeads() {
    const leads = useSelector(state => state.leadReducer);
    const allLeads = Object.keys(leads.AllLeads).map(key => leads.AllLeads[key]);
    const buyerLeads = allLeads.filter((item) => item.category.name == 'Buyer');
    
    
    return (
        <View style={{alignItems: 'center', flex: 1, backgroundColor: '#f2f2f2', margin: 5, borderRadius: 5}}>
          <FlatListLeads data={buyerLeads}/>
        </View>
    );
}

export default BuyerLeads;
