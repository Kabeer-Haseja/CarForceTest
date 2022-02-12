import React from 'react';
import {Image, Text, View} from 'react-native';
import {IC_HEADER} from './Assets/Images';

function LogoText(props) {
    let heading = props.heading;
    let subHeading = props.subHeading;
    let subHeading2 = props.subHeading2;
    
    return (
        <View style={{justifyContent: 'center', alignItems: 'flex-start', marginLeft: 16, marginBottom: 20}}>
            <Image source={IC_HEADER} style={{height: 100, width: 220}} resizeMode={'contain'}/>
            <Text style={{
                color: '#002F34',
                paddingTop: 5,
                fontSize: 20,
            }}>{heading}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#969FA0', fontSize: 16}}>
                    {subHeading}
                </Text>
                <Text style={{color: '#3072FF', fontSize: 16}}>
                    {subHeading2}
                </Text>
            </View>
        
        </View>
    );
}

export default LogoText;
