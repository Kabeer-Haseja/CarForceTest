import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {IC_BUYER, IC_MODERATE, IC_SELLER} from '../Assets/Images';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {LEAD_DETAIL_SCREEN} from '../RouteName';


function leadIdAndProgress(props) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 15,
            marginTop: 10,
            marginRight:10,
            justifyContent: 'space-between',
        }}>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color: '#C1C0C0', fontSize: 12}}>
                        Lead ID: {props.item.id}</Text>
                    </View>
    
    
            <View style={{ backgroundColor: '#e2fbff',paddingVertical:5,paddingHorizontal:8 ,borderRadius:20,alignItems:'center'}}>
                    <Text style={{color: '#288dbc' }}>
                        {props.item.status.name}
                    </Text>
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
            
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                       <Image source={IC_MODERATE} style={{height: 15, width: 15, resizeMode: 'contain'}}/>
                  
                    <Text style={{color: '#7b7b7b', fontSize: 14}}>
                        {props.item.classification}
                    </Text>
                
                <View style={{
                    backgroundColor: 'gray',
                    height: 15,
                    width: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 8,
                }}>
                
                </View>
                
                    {props.item.category.name==="Buyer"?  <Image source={IC_BUYER} style={{height: 15, width: 15, resizeMode: 'contain', margin: 7}}/>
                    :<Image source={IC_SELLER} style={{height: 15, width: 15, resizeMode: 'contain', margin: 7}}/>}
                    <Text style={{color: '#7b7b7b', fontSize: 14}}>
                        {props.item.category.name}
                    </Text>
                    
                
            </View>
            <View>
                <Text style={{marginLeft: 80,color:'#848c98',fontSize:13}}>
                    {moment(props.item.created_at).format('D MMM YYYY')}
                </Text>

            </View>
        </View>
    );
}

function LeadCardItem(props) {
    const navigation=useNavigation();
    
    return (
        <TouchableOpacity onPress={()=>{
            navigation.navigate(LEAD_DETAIL_SCREEN, props.item)
        }}>
        <View
            style={{
                borderRadius: 5,
                backgroundColor: 'white',
                marginBottom: 8,
                borderWidth: 0.5,
                borderColor: 'white',
            }}
        >
            {leadIdAndProgress(props)}
            {leadName(props)}
            {moderateAndDate(props)}
        
        </View>
        </TouchableOpacity>
    );
}

export default LeadCardItem;
