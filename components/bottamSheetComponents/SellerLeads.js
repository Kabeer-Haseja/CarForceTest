import {useDispatch, useSelector} from 'react-redux';
import {FlatList, View} from 'react-native';
import LeadCardItem from './LeadCardItem';
import React, {useEffect} from 'react';
import {AddSellerLeads} from '../../redux/actions/leadActions';
import FlatListLeads from './FlatListLeads';


function SellerLeads() {
    const leads = useSelector(state => state.leadReducer)
    const allLeads = Object.keys(leads.AllLeads).map(key => leads.AllLeads[key])
    const seller=allLeads.filter((item)=>item.category.name=="Seller")
    return (
        <View style={{alignItems: 'center', flex: 1, backgroundColor: '#f2f2f2', margin: 5, borderRadius: 5}}>
            <FlatListLeads data={seller}/>
        </View>
    );
}
export default SellerLeads
