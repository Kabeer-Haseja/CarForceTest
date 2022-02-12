import React from 'react';
import {Image, Text, View} from 'react-native';
import {IC_BUYER, IC_MODERATE} from '../Assets/Images';
import moment from 'moment';


function leadIdAndProgress(props) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 20,
            marginTop: 10,
            justifyContent: 'space-between',
            height: 30,
        }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: '#C1C0C0', fontSize: 12}}>
                        Lead ID:
                    </Text>
                    <Text style={{color: '#C1C0C0', fontSize: 12}}>
                        {props.item.id}
                    </Text>
                    <Text style={{marginLeft: 160}}>
                        {props.item.status.name}
                    </Text>
                </View>
            </View>
        </View>
    
    );
}

function leadName(props) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 20,
            justifyContent: 'space-between',
            height: 30,
        }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'black', fontSize: 18}}>
                        {props.item.client.name}
                    </Text>
                </View>
            
            
            </View>
        
        
        </View>
    
    );
}

function moderateAndDate(props) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
            marginRight: 20,
            justifyContent: 'space-between',
            height: 30,
        }}>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={IC_MODERATE} style={{height: 15, width: 15, resizeMode: 'contain'}}/>
                    <Text style={{color: 'black', fontSize: 14}}>
                        {props.item.classification}
                    </Text>
                </View>
                
                <View style={{
                    backgroundColor: 'gray',
                    height: 15,
                    width: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 8,
                }}>
                
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={IC_BUYER} style={{height: 15, width: 15, resizeMode: 'contain', margin: 7}}/>
                    <Text style={{color: 'black', fontSize: 14}}>
                        Buyer:
                    </Text>
                    <Text style={{marginLeft: 60}}>
                        {moment(props.item.client.created_at).format('MM/DD/YYYY')}
                    </Text>
                </View>
            </View>
        </View>
    );
}

function LeadCardItem(props) {
    return (
        <View
            key={props.item.id}
            style={{
                borderRadius: 5,
                backgroundColor: 'white',
                marginBottom: 10,
                borderWidth: 0.5,
                borderColor: 'gray',
                marginHorizontal: 20,
            }}
        >
            {leadIdAndProgress(props)}
            {leadName(props)}
            {moderateAndDate(props)}
        
        </View>
    );
}

export default LeadCardItem;
