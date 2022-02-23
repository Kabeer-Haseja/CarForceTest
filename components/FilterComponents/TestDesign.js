import React from 'react';
import {Image, Text, View} from 'react-native';
import {IC_LEAD_CATEGORY} from '../Assets/Images';

function TestDesign(props) {
    return (
        <View style={{paddingHorizontal:15}}>
            <View style={{flexDirection:'row'}}>
                <View style={{width:"10%"}}>
                <Image source={IC_LEAD_CATEGORY} style={{width:20,height:20,resizeMode:'contain'}}/>
                </View>
                <View style={{width:"90%",justifyContent:'space-between',flexDirection:'row'}}>
                    <Text>hello</Text>
                    <Image source={IC_LEAD_CATEGORY} style={{width:20,height:20,resizeMode:'contain'}}/>

                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View style={{width:"10%"}}>
                </View>
                <View style={{width:"90%",justifyContent:'space-between',flexDirection:'row'}}>
                    <Text>hello</Text>
             
                </View>
                
            </View>
        </View>
    );
}

export default TestDesign;
