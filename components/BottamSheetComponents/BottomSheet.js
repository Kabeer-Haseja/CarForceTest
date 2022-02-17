import React from 'react';
import {Image, Text, TextInput, View} from 'react-native';
import {IC_RIGHT} from '../Assets/Images';

function BottomSheet(props) {
    return (
        <View style={{marginHorizontal:20}}>
    
        <View style={{flexDirection:'row',alignItems:'center',marginTop:20,justifyContent:'space-between'}}>
            <View style={{ height: 30,
                width: 30,
                marginEnd: 10,
                borderRadius: 25,
                backgroundColor: '#F8F9FB',
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",}}>
                <Image
                    resizeMode={"contain"}
                    tintColor={'gray'}
                    style={{
                        height: 15,
                        width: 15,
                        tintColor: '#828DA0',
                        alignItems:'center'
                    }}
                    source={props.image}
                />
            </View>
        
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:"90%"}}>
                <View>
                <Text style={{fontSize:12,textTransform:'capitalize',marginVertical:10}}>{props.title}</Text>
                <Text
                    style={{padding:0,borderBottomWidth:0.2,paddingBottom:10}}>{props.selectedValue}</Text>
                </View>
    
                <Image
                    resizeMode={"contain"}
                    tintColor={'gray'}
                    style={{
                        height: 12,
                        width: 12,
                        tintColor: 'black',
                        alignItems:'center'
                    }}
                    source={IC_RIGHT}
                />
            </View>
      
        </View>
            <View style={{height:1,backgroundColor:'gray',width:"90%",marginHorizontal:38}}/>

        </View>
    );
}

export default BottomSheet;
