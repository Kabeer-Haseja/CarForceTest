import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';

function LeadChip(props) {
    return (
        <View style={{marginHorizontal: 20}}>
            
            <View style={styles.main}>
                <View style={styles.imageView}>
                    <Image
                        resizeMode={'contain'}
                        tintColor={'gray'}
                        style={styles.image}
                        source={props.image}
                    />
                </View>
                
                <View style={styles.textView}>
                    <View>
                        <Text
                            style={styles.leadChipTitle}>{props.title}</Text>
                        <View style={styles.mapView}>
                            {props.options.map((item, index) => {
                                let checkSelectedValue = props.selectedValue.some((selected) => selected.id === item.id);
                                
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        onPress={() => {
                                            props.onSelectValue(item);
                                        }}
                                    >
                                        {checkSelectedValue ?
                                            <View style={styles.selectedChipView}>
                                                <Text style={styles.selectedText}>{item.name}</Text>
                                            </View> :
                                            <View style={styles.unSelectedChipView}>
                                                <Text style={styles.unSelectedText}>{item.name}</Text>
                                            </View>
                                        }
                                    
                                    </TouchableOpacity>
                                );
                            })
                            }
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.horizantalLine}/>
        </View>
    
    );
}

export default LeadChip;

const styles = StyleSheet.create({
    main: {flexDirection: 'row', alignItems: 'center', marginTop: 20, justifyContent: 'space-between'},
    imageView: {
        height: 30,
        width: 30,
        marginEnd: 10,
        borderRadius: 25,
        backgroundColor: '#F8F9FB',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    image: {
        height: 15,
        width: 15,
        tintColor: '#828DA0',
        alignItems: 'center',
    },
    textView: {flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%'},
    selectedChipView: {
        borderRadius: 15,
        padding: 7,
        margin: 3,
        backgroundColor: '#F0F5FC',
        borderWidth: 0.4,
        borderColor: '#ba1f24',
    },
    unSelectedChipView: {borderRadius: 15,
        padding: 7,
        margin: 3,
        backgroundColor: '#F0F5FC',
        borderWidth: 0.4},
    selectedText: {
        color: '#ba1f24',
        fontWeight: 'bold'
    },
    unSelectedText: {
        color: '#575e64'
    },
   
    horizantalLine: {
        height: 1,
        backgroundColor: '#e8e8e8',
        width: '90%',
        marginHorizontal: 38},
    leadChipTitle:{fontSize: 12,
        textTransform: 'capitalize',
        marginVertical: 10},
    mapView:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginRight: 5,
    },
    
});
