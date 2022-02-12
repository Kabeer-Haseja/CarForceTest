import React from 'react';
import {Button, View} from 'react-native';

function ButtonComponent(props) {
    return (
        <View style={{
            margin: 12,
            height: 40,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderColor: 'gray',
            flexDirection: 'row',
            paddingHorizontal: 70,
            backgroundColor: '#0e53e5',
        }}>
            <Button color={'white'} onPress={props.formik.handleSubmit} title={props.title}/>
        </View>
    );
}

export default ButtonComponent;
