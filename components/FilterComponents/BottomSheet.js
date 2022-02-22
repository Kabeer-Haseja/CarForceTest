import React, {createRef} from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {IC_CHECK, IC_RIGHT} from '../Assets/Images';
import ActionSheet from 'react-native-actions-sheet';

function BottomSheet(props) {
    const bottomSheetRef = createRef();
    
    function showBottomSheet() {
        bottomSheetRef.current?.show();
    }
    
    return (
        
        
        <View style={{marginHorizontal: 20}}>
            <TouchableWithoutFeedback onPress={() => showBottomSheet()}>
                <View>
                    <View style={styles.main}>
                        <View style={styles.imageView}>
                            <Image
                                resizeMode={'contain'}
                                tintColor={'gray'}
                                style={styles.imageStyle}
                                source={props.image}
                            />
                        </View>
                        
                        <View style={styles.textView}>
                            <View>
                                <Text style={styles.textTitle}>{props.title}</Text>
                                {props.multi ?
                                    props.selectedValue.map((item) => {
                                        return (
                                            <Text style={{fontWeight:'bold',}}>{item.name}</Text>
                                        );
                                    })
                                    :
                                    <Text style={styles.textTitleOr}>{props.selectedValue[0]?.name}</Text>
                                }
                            </View>
                  
                            <Image
                                resizeMode={'contain'}
                                tintColor={'gray'}
                                style={styles.checkImage}
                                source={IC_RIGHT}
                            />
                        </View>
                    
                    </View>
                    <View style={styles.horizantilLineView}/>
                </View>
            </TouchableWithoutFeedback>
            
            <ActionSheet ref={bottomSheetRef}>
                <ScrollView style={{}}>
                    <FlatList data={props.options}
                              keyExtractor={(item) => item.id}
                              renderItem={({item,index}) => {
                                  let checkSelectedValue = props.selectedValue.some((selected) => selected.id === item.id);
                                  return (
                                      <View>
                                          <TouchableOpacity
                                              key={index}
                                              onPress={() => {
                                                  props.onSelectValue(item);
                                              }
                                              }>
                                              <View style={styles.renderView}>
                                                  <Text style={{fontSize: 14, color: 'black'}}>
                                                      {item.name}
                                                  </Text>
                                                  {(checkSelectedValue) &&
                                                      <Image source={IC_CHECK} style={styles.icCheckImage}/>
                                                  }
                                              </View>
                                              <View style={styles.lineView}></View>
                                          </TouchableOpacity>
                                      </View>
                                  );
                              }
                              }/>
                </ScrollView>
            </ActionSheet>
        
        
        </View>
    
    );
}

export default BottomSheet;
const styles = StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'space-between',
    },
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
    imageStyle: {
        height: 15,
        width: 15,
        tintColor: '#828DA0',
        alignItems: 'center',
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    textTitle: {
        fontSize: 12,
        textTransform: 'capitalize',
        marginVertical: 10,
    },
    textTitleOr: {
        padding: 0,
        borderBottomWidth: 0.2,
        paddingBottom: 10,
        fontWeight:'bold'
    },
    checkImage: {
        height: 12,
        width: 12,
        tintColor: 'black',
        alignItems: 'center',
    },
    horizantilLineView: {height: 1,
        backgroundColor: '#e8e8e8',
        width: '90%',
        marginHorizontal: 38},
    renderView: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center', padding: 15,
    },
    icCheckImage: {
        height: 12,
        width: 12,
        tintColor: 'red',
        resizeMode: 'contain',
    },
    lineView: {width: '100%', height: 1, backgroundColor: '#e8e8e8'},
});
