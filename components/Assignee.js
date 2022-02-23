import React, {createRef, useEffect, useState} from 'react';
import {FlatList, Image, ScrollView, Text, TouchableOpacity, View,StyleSheet} from 'react-native';
import {IC_ARROW_DOWN, IC_CHECK, IC_LEAD_SOURCE} from './Assets/Images';
import {leadFilterAssigneeStyles} from './commanStyleSheet/LeadFilterAssigneeStyles';
import ActionSheet from 'react-native-actions-sheet';
import {applyFilters, getLeadSources, leadAssignee} from './Network/NetworkBuilder';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheet from './FilterComponents/BottomSheet';
import {AddAllLeads, AddFilteredPagination, FilteredLeadData} from '../redux/actions/leadActions';
import {getFieldParams} from './FiltersPage';

function Assignee(props) {
    const header = useSelector(state => state.loginReducer.headers);
    const dispatch=useDispatch()
    const [assignee, setAssignee] = useState([]);
    const [assigneesList, setAssigneeList] = useState([]);
    
    const bottomSheetRef = createRef();
    
    function showBottomSheet() {
        getLeadSourceApiCall()
        bottomSheetRef.current?.show();
    }
    
   async function getLeadSourceApiCall() {
       const response = await leadAssignee(header);
       setAssigneeList(response.data.users);
    
    
   }
    
    
    const filters=useSelector(state => state.FilteredReducer)
    async function setFilter(item) {
        
        
        let filterObj={
            assignees:item,
        }
        console.log("item",props.selected)
        console
        // dispatch(FilteredLeadData(filterObj))
        //
        // const values=  await getFieldParams(filterObj)
        // const response= await applyFilters(header,values,1)
        //
        // dispatch(AddFilteredPagination(response.data.pagination))
        // dispatch(AddAllLeads(response.data.crm_leads)) //
        //
       
        // const values=  await getFieldParams(filterObj)
        // const response= await applyFilters(header,values,1)
        //
        // dispatch(AddFilteredPagination(response.data.pagination))
        // dispatch(AddAllLeads(response.data.crm_leads))
        //
    
    }
    
    return (
        <View>
        <TouchableOpacity onPress={()=>showBottomSheet()
        }>
        <View style={leadFilterAssigneeStyles.mainView}>
            <Text style={leadFilterAssigneeStyles.text}>Assignee</Text>
            <Image source={IC_ARROW_DOWN} style={leadFilterAssigneeStyles.arrowDown}/>
        </View>
        </TouchableOpacity>
    
            <ActionSheet ref={bottomSheetRef}>
        <ScrollView style={{}}>
            <FlatList data={assigneesList}
                      keyExtractor={(item) => item.id}
                      renderItem={({item,index}) => {
                          let checkSelectedValue
                          if(assignee.length>0) {
                             checkSelectedValue = assignee?.some((selected) => selected.id === item.id);
                          }
    
                        
    
                          return (
                              <View>
                                  <TouchableOpacity
                                      key={index}
                                      onPress={() => {
                                          console.log(item)
                                          setAssigneeList([item])
                                     //     props.onSelectValue(item);
                                          setFilter(assignee)
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
                                      <View style={{width: '100%', height: 1, backgroundColor: '#e8e8e8'}}></View>
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

export default Assignee;

const styles=StyleSheet.create({
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
    }
})
