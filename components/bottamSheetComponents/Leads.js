import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import BottomTabsHeading from './BottomTabsHeading';
import LeadCardItem from './LeadCardItem';
import axios from 'axios';
import {useSelector} from 'react-redux';

function Leads(props) {
    const [lead, setLead] = useState([]);
    const header = useSelector(state => state.loginReducer.headers);
    
    useEffect(() => {
        console.log();
        const url = 'https://dev2.empgautos.com/api/crm/crm_leads';
        axios.get(url, {
            
            headers: header,
        }).then((response) => {
            setLead(response.data.crm_leads);
        }, );
    },[])
    return (
        <View style={{backgroundColor: 'white', flex: 1}}>
            <View style={{alignItems: 'flex-start', flex: 1, backgroundColor: '#f2f2f2', margin: 10, borderRadius: 5}}>
                <BottomTabsHeading
                    heading={'ALL Leads'}
                />
                <FlatList data={lead}
                          keyExtractor={item => item.toString()}
                          renderItem={({item}) => {
                              return (
                                  <LeadCardItem item={item}/>
                              );
                          }}/>
            
            </View>
        </View>
    );
}

export default Leads;
