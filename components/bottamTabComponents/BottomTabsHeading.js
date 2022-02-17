import React from 'react';
import {Text, View} from 'react-native';

function BottomTabsHeading(props) {
    return (
        <View style={{margin:12 }}>
        <Text style={{fontSize:20,fontWeight:'700'}}>
            {props.heading}
        </Text>
        </View>
    );
}

export default BottomTabsHeading;
