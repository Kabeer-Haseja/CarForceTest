import React from 'react';
import {FlatList} from 'react-native';
import LeadCardItem from './LeadCardItem';

function FlatListLeads(props) {
    return (
        <FlatList data={props.data}
                  keyExtractor={item => item.toString()}
                  renderItem={({item}) => {
                      return (
                          <LeadCardItem item={item}/>
                      );
                  }}/>
    );
}

export default FlatListLeads;
