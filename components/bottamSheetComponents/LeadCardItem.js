import React from 'react';
import {Image, Text, View} from 'react-native';
import {IC_BUYER, IC_MODERATE, IC_SELLER} from '../Assets/Images';
import moment from 'moment';


function leadIdAndProgress(props) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 20,
         //   marginRight: 20,
            marginTop: 10,
            justifyContent: 'space-between',
      //      height: 30,
        }}>
            {/*<View style={{flexDirection: 'row', justifyContent:'space-between',alignItems:'center'}}>*/}
                <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
                    <Text style={{color: '#C1C0C0', fontSize: 12}}>
                        Lead ID: {props.item.id}</Text>
                    </View>
    
    
            <View style={{ marginLeft:140,backgroundColor: '#e2fbff',paddingVertical:5,paddingHorizontal:8 ,borderRadius:20,flexDirection:'row',justifyContent:'center',alignItems:'flex-end'}}>
                    <Text style={{color: '#288dbc' }}>
                        {props.item.status.name}
                    </Text>
                </View>
            {/*</View>*/}
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
                    <Text style={{color: 'black', fontSize: 20,fontWeight:'bold'}}>
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
                    <Text style={{color: '#7b7b7b', fontSize: 14}}>
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
                    {props.item.category.name=="Buyer"?  <Image source={IC_BUYER} style={{height: 15, width: 15, resizeMode: 'contain', margin: 7}}/>
                    :<Image source={IC_SELLER} style={{height: 15, width: 15, resizeMode: 'contain', margin: 7}}/>}
                    <Text style={{color: '#7b7b7b', fontSize: 14}}>
                        {props.item.category.name}
                    </Text>
                    <Text style={{marginLeft: 60}}>
                        {moment(props.item.created_at).format('D MMM YYYY')}
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
                marginBottom: 8,
                borderWidth: 0.5,
                
                borderColor: 'white',
                alignItems:'flex-start',
                justifyContent:'center'
            }}
        >
            {leadIdAndProgress(props)}
            {leadName(props)}
            {moderateAndDate(props)}
        
        </View>
    );
}

export default LeadCardItem;
