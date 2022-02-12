import React from 'react';
import {Image, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {IC_HIDE, IC_UN_HIDE} from '../Assets/Images';

function InputField(props) {
    return (
        <View style={{
            margin: 12,
            height: 60,
            borderRadius: 10,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: 'gray',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'white',
        }}>
            <TextInput onChangeText={props.formik.handleChange(props.value)}
                       secureTextEntry={props.secureTestEntry} placeholder={props.placeHolder}
                       style={{margin: 5, borderColor: 'gray', borderRadius: 1, width: '100%', height: 48}}/>
            {props.value=="password" &&
                <TouchableWithoutFeedback onPress={()=>
                    props.setHide(!props.secureTestEntry)}>
                    <Image source={props.secureTestEntry?IC_UN_HIDE:IC_HIDE}
                           style={{
                               height: 30,
                               width: 30,
                               resizeMode: 'contain',
                               position: 'absolute',
                               marginStart: 330,
                           }}/>
                </TouchableWithoutFeedback>
            }
        
        </View>
    );
}

export default InputField;
