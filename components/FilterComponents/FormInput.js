import React from 'react';
import {Image, Text, TextInput, View,StyleSheet} from 'react-native';

function FormInput(props) {
    
    return (
        <View style={styles.main}>
            <View style={styles.textView}>
                <Image
                    resizeMode={'contain'}
                    tintColor={'gray'}
                    style={styles.image}
                    source={props.image}
                />
            </View>
            
            <View style={{width: '90%'}}>
                <Text style={styles.textStyle}>{props.title}</Text>
                <TextInput value={props.value} placeholder={props.placeholder} onChangeText={props.onChangeText}
                           textAlignVertical={'top'}
                           style={styles.textInputField}/>
            </View>
        </View>
    );
    
}

export default FormInput;

const styles=StyleSheet.create({
    main:{flexDirection: 'row', alignItems: 'center', marginTop: 10},
    textView:{
        height: 30,
        width: 30,
        marginEnd: 10,
        borderRadius: 25,
        backgroundColor: '#F8F9FB',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    image:{
        height: 15,
        width: 15,
        tintColor: '#828DA0',
        alignItems: 'center',
    },
    textStyle:{fontSize: 14, textTransform: 'capitalize', marginVertical: 10},
    textInputField:{padding: 0, borderBottomWidth: 1, paddingBottom: 10,   borderColor: '#e8e8e8',
    }
    
})
