import React from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './BottomSheet';
import {IC_CHECK} from '../Assets/Images';

function CustomActionSheet(props) {
    function checkSingleOrMultipleFilters(selected)
    {
        if (props.multi) {
            const filtered = props.selectedValue.some((lead) => lead.id === selected.id);
            if (filtered) {
                let filteredLeads = props.selectedValue.filter((lead) => lead.id !== selected.id);
                props.onSelectState(filteredLeads);
            } else {
                let temp = [...props.selectedValue];
                temp.push(selected);
                props.onSelectState(temp);
            }
        }
        else {
            props.onSelectState([selected]);
        }
    }
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
                                                  checkSingleOrMultipleFilters(item)
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
