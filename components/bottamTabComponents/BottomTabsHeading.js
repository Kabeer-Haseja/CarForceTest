import React from 'react';
import {Text, View} from 'react-native';

function BottomTabsHeading(props) {
    return (
        <View style={{backgroundColor:'#fff' }}>
        <Text style={{fontSize:20,fontWeight:'700',paddingLeft:15,marginTop:10}}>
            {props.heading}
        </Text>
        </View>
    );
}

export default BottomTabsHeading;
