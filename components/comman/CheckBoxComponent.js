import React from 'react';
import {Text, View} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

function CheckBoxComponent(props) {
    return (
        <View style={{
            alignItems: 'center',
            marginBottom: 20,
            flexDirection: 'row',
            
        }}>
            <CheckBox
                boxType={'square'}
                tintColor={'"#A7A7A7"'}
                onCheckColor={'white'}
                onFillColor={'#3072FF'}
                onTintColor={'#3072FF'}
                animationDuration={0.2}
                disabled={false}
                tintColors={{true: '#3072FF', false: '#828DA0'}}
                style={{height: 20, width: 20, margin: 12}}
            >
            
            </CheckBox>
            <Text style={{ fontSize: 12}}>{props.value}</Text>
        </View>
    
    );
}

export default CheckBoxComponent;
