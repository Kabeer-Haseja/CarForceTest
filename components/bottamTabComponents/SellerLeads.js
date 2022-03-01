import {useSelector} from 'react-redux';
import {View} from 'react-native';
import React from 'react';
import FlatListLeads from './FlatListLeads';


function SellerLeads() {
    const leads = useSelector(state => state.leadReducer)
    const seller=leads.AllLeads.filter((item)=>item.category.name==="Seller")
    return (
        <View style={{marginHorizontal:10, flex: 1, backgroundColor: '#f2f2f2',justifyContent:'space-between'}}>
            <FlatListLeads data={seller}/>
        </View>
    );
}
export default SellerLeads
