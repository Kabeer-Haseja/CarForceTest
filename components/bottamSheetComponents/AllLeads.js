import {useSelector} from 'react-redux';
import {FlatList, View} from 'react-native';
import LeadCardItem from './LeadCardItem';
import React from 'react';
import FlatListLeads from './FlatListLeads';

function AllLeads() {
    const leads = useSelector(state => state.leadReducer)
    const allLeads = Object.keys(leads.AllLeads).map(key => leads.AllLeads[key])
    return (
        <View style={{alignItems: 'center', flex: 1, backgroundColor: '#f2f2f2', borderRadius: 5}}>
            <FlatListLeads data={allLeads}/>
            {/*<FlatList data={allLeads}*/}
            {/*          keyExtractor={item => item.toString()}*/}
            {/*          renderItem={({item}) => {*/}
            {/*              return (*/}
            {/*                  <LeadCardItem item={item}/>*/}
            {/*              );*/}
            {/*          }}/>*/}
        
        </View>
    );
}
export default AllLeads
