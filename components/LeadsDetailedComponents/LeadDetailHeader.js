import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IC_ARROW_LEFT, IC_CALL, IC_EDIT} from '../Assets/Images';
import {useNavigation} from '@react-navigation/native';

function LeadDetailHeader(props) {
    const navigation=useNavigation();
    const cardItem=props.cardItem;
    return (
        <View style={styles.headerMainView}>
        
            <View style={{flexDirection:'row',alignItems:'center',}}>
                <View style={{paddingHorizontal:7}}>
                    <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={IC_ARROW_LEFT} style={{width:15,height:15,resizeMode:'contain'}}/>
                    </TouchableOpacity>
                </View>
                
                <View>
                    <View style={styles.headerClientView}>
                        <Text style={styles.clientName}>{cardItem.client.name}</Text>
                        <Image source={IC_CALL} style={styles.callImageIcon}/>
                    </View>
                    <Text style={styles.refIdText}>RefId:{cardItem.client.reference_number}</Text>
                </View>
        
            </View>
        
            <View style={{flexDirection:'row',alignItems:'center',}}>
                <View style={styles.headerStatusMainView}>
                    <Text  style={styles.headerStatus}>
                        {cardItem.status.name}
                    </Text>
                </View>
                
                <View style={{marginHorizontal:15,justifyContent:'space-between'}}>
                    <Image source={IC_EDIT} style={styles.editImage}/>
                </View>
   
            </View>
   
        </View>

    );
}

export default LeadDetailHeader;
const styles=StyleSheet.create({
    headerMainView:{flexDirection:'row',justifyContent:'space-between',margin:10},
    headerClientView:{flexDirection:'row',alignItems:'center',justifyContent:'center',},
    clientName:{fontSize:20,fontWeight:'bold',color:'#040404',maxWidth:130,},
    refIdText:{color:'#b0b0b0',fontSize:12,fontWeight:'500'},
    callImageIcon:{width:30,height:30,resizeMode:'contain',tintColor:'#040404'},
    headerStatus:{color: '#2e90cc', padding:10,alignItems:'center' ,fontSize:14,fontWeight:'400' },
    editImage:{width:16,height:16,resizeMode:'contain',tintColor:'#040404'},
    headerStatusMainView:{ backgroundColor: '#e8f8fd',borderRadius:25, }
})
