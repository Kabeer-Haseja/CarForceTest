import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './BottomSheet';
import {IC_CHECK} from '../Assets/Images';

function CustomActionSheet(props) {
    return (
        <ActionSheet ref={props.bottomSheetRef}>
            <ScrollView>
                <FlatList data={props.options}
                          keyExtractor={(item) => item?.id}
                          renderItem={({item,index}) => {
                              let checkSelectedValue = props.selectedValue.some((selected) => selected.id === item.id);
                              return (
                                  <View key={item?.id + index}>
                                      <TouchableOpacity
                                          onPress={() => {
                                                  props.checkSingleOrMultipleFilters(item)
                                          }
                                          }>
                                          <View style={styles.renderView}>
                                              <Text style={{fontSize: 16, color: 'black'}}>
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

    );
}

export default CustomActionSheet;
