import React from 'react';
import {Image, Text, View} from 'react-native';
import {IC_RIGHT} from '../Assets/Images';

function DatePicker(props) {
    return(
            <View style={{marginHorizontal:10}}>
        
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
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
                        <View style={{alignItems:'center',justifyContent:'center'}}>
                            <Text style={{fontSize:14,marginVertical:10,alignItems:'center',justifyContent:'center'}}>{props.title}</Text>
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
                <View style={{height:1,backgroundColor:'#e8e8e8',width:"90%",marginHorizontal:38}}/>
    
            </View>
       
    );
}

export default DatePicker;
