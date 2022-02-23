import React, {createRef, useEffect} from 'react';
import {FlatList, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {IC_ARROW_DOWN, IC_CHECK, IC_RIGHT} from '../Assets/Images';
import ActionSheet from 'react-native-actions-sheet';
import {leadFilterAssigneeStyles} from '../commanStyleSheet/LeadFilterAssigneeStyles';
import {styles} from './BottomSheet';
import {AddAllLeads, AddFilteredPagination, FilteredLeadData} from '../../redux/actions/leadActions';
import {getFieldParams} from '../FiltersPage';
import {applyFilters} from '../Network/NetworkBuilder';
import {useDispatch, useSelector} from 'react-redux';
import assignee from '../Assignee';

function FastFilters(props) {
    const filterReducer=useSelector(state => state.FilteredReducer)
    const header = useSelector(state => state.loginReducer.headers);
    
    const bottomSheetRef = createRef();
    const dispatch=useDispatch()
    function showBottomSheet() {
        
        bottomSheetRef.current?.show();
    }
    
    
    async function setFilter(item) {
    
        let filters = filterReducer.FilteredLead;
        if(props.title==='Assignee')
        {
            filters['assignees']=props.selectedValue
    
        }
        if(props.title==='Lead Type'){
            console.log(filters['categories'])
            filters['categories']=props.selectedValue
        }
        
         dispatch(FilteredLeadData(filters))
         const values=  await getFieldParams(filters)
         const response= await applyFilters(header,values,1)
         dispatch(AddFilteredPagination(response.data.pagination))
         dispatch(AddAllLeads(response.data.crm_leads))
        
    }
    useEffect(()=>{
        setFilter()
    
    },[props.selectedValue])
   
    return (
        <View style={{marginHorizontal: 10}}>
            <TouchableOpacity onPress={()=>showBottomSheet()
            }>
                <View style={leadFilterAssigneeStyles.mainView}>
                    <Text style={leadFilterAssigneeStyles.text}>{props.title}</Text>
                    <Image source={IC_ARROW_DOWN} style={leadFilterAssigneeStyles.arrowDown}/>
                </View>
            </TouchableOpacity>
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
export default FastFilters;
