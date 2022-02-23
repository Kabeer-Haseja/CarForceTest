import React, {useEffect, useState} from 'react';
import {FlatList, Image, RefreshControl, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import LeadCardItem from './LeadCardItem';
import {applyFilters, getLeadsChipStatus, leadAssignee, leadsApi} from '../Network/NetworkBuilder';
import {useDispatch, useSelector} from 'react-redux';
import {
    AddAllLeads,
    AddFilteredPagination,
    AddPagination,
    FilteredLeadData,
    ResetFilters,
} from '../../redux/actions/leadActions';
import Skeleton from './Skeleton';
import Filters from '../Filters';
import {getFieldParams} from '../FiltersPage';
import {IC_CROSS, IC_NAME} from '../Assets/Images';
import Empty from '../FilterComponents/Empty';
import Assignee from '../Assignee';
import LeadType from '../LeadType';
import FastFilters from '../FilterComponents/FastFilters';


function FlatListLeads(props) {
    
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const header = useSelector(state => state.loginReducer.headers);
    const leads = useSelector(state => state.leadReducer);
    const filterReducer = useSelector(state => state.FilteredReducer);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    
    const [assignee, setAssignee] = useState([]);
    const [assigneesList, setAssigneeList] = useState([]);
    
    const[leadChipStatusList,setChipStatusList]=useState([])
    const [leadChipStatus, setLeadChipStatus] = useState([]);
    
    
    const onEndReached = async () => {
        let arr = leads.AllLeads;
        if (Object.keys(filterReducer.FilteredLead).length) {
            let values = await getFieldParams(filterReducer.FilteredLead);
            let response = await applyFilters(header, values, filterReducer.filteredPagination?.next_page);
            if (response?.status) {
                dispatch(AddFilteredPagination(response.data.pagination));
                let update = arr.concat(response.data.crm_leads);
                dispatch(AddAllLeads(update));
                
            } else {
            
            }
            
            
        } else {
            const response = await leadsApi(header, leads.pagination?.next_page);
            if (response?.status) {
                dispatch(AddPagination(response.data.pagination));
                let update = arr.concat(response.data.crm_leads);
                setLoading(false);
                dispatch(AddAllLeads(update));
            } else {
            
            }
            
        }
    };
    
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        setLoading(true);
     
        let arr = [];
        dispatch(AddAllLeads(arr));
        
        let response = await leadsApi(header, 1);
        if (response?.status) {
            let update = arr.concat(response.data.crm_leads);
            dispatch(AddPagination(response.data.pagination));
            dispatch(AddAllLeads(update));
            setAssignee([])
            setLeadChipStatus([])
            dispatch(ResetFilters());
    
            setPage(response.data.pagination.current_page);
            setRefreshing(false);
            setLoading(false);
        } else {
        }
        
    }, [refreshing]);
    
    useEffect(() => {
        onEndReached();
        
    }, [page]);
    useEffect(()=>{
        setAssignee(filterReducer.FilteredLead.assignees)
        setLeadChipStatus(filterReducer.FilteredLead.categories)
    },[filterReducer.FilteredLead])
    async function apiCalls(){
        const response = await leadAssignee(header);
        const leadChipStatus=await getLeadsChipStatus(header)
        setChipStatusList(leadChipStatus.data.categories)
        setAssigneeList(response.data.users);
    
    }
    useEffect(()=>{
        apiCalls()
    },[])
    const filterChips = ({item, index}) => {
        return (
            <View style={styles.mainView}>
                <View style={styles.textView}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Text
                            style={styles.chipsTitle}>
                            {item.name}
                        </Text>
                    </View>
                    <Image
                        source={IC_CROSS}
                        resizeMode={'contain'}
                        style={styles.icCross}>
                    </Image>
                </View>
            
            </View>
        );
    };
    
    function pageCheck() {
        if (Object.keys(filterReducer.FilteredLead).length) {
            if (page < filterReducer.filteredPagination?.total_pages) {
                setPage(filterReducer.filteredPagination?.next_page);
                onEndReached();
            } else {
            }
        } else if (page < leads.pagination.total_pages) {
            setPage(leads.pagination.next_page);
        }
    }
    
    const filteredOptions = (item) => {
        let appliedFilters = [];
        
        Object.keys(item).map((parentItem, index) => {
            let selectedValue;
            if (parentItem === 'refId') {
                selectedValue = {
                    id: Math.random(),
                    type: parentItem,
                    name: item[parentItem],
                    slug: item[parentItem],
                    showRightIcon: true,
                };
                if (selectedValue.name.length > 0) {
                    
                    item !== null && appliedFilters.push(selectedValue);
                }
            } else if (parentItem === 'email_address') {
                
                selectedValue = {
                    id: Math.random(),
                    type: parentItem,
                    name: item[parentItem],
                    slug: item[parentItem],
                    showRightIcon: true,
                };
                if (selectedValue.name.length > 0) {
                    item !== null && appliedFilters.push(selectedValue);
                    
                }
            } else {
                item[parentItem].map((item) => {
                    selectedValue = {
                        id: item.id,
                        type: parentItem,
                        name: item.name ,
                        slug: item.slug,
                        showRightIcon: true,
                    };
                    appliedFilters.push(selectedValue);
                });
            }
            
        });
        return appliedFilters;
    };
    
    async function deleteFilter(item) {
        let filters = filterReducer.FilteredLead;
        filters[item.type] = '';
        dispatch(FilteredLeadData(filters));
        
        const values = await getFieldParams(filters);
        const response = await applyFilters(header, values, 1);
        
        dispatch(AddFilteredPagination(response.data.pagination));
        dispatch(AddAllLeads(response.data.crm_leads));
    }
    
    async function deleteArrayTypeFilter(item) {
        let filters = filterReducer.FilteredLead;
        let filtered = filters[item.type].filter((sd) => sd.name !== item.name);
        filters[item.type] = filtered;
        dispatch(FilteredLeadData(filters));
        
        const values = await getFieldParams(filters);
        const response = await applyFilters(header, values, 1);
        
        dispatch(AddFilteredPagination(response.data.pagination));
        dispatch(AddAllLeads(response.data.crm_leads));
        
    }
    
    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
             <Filters/>
               <FastFilters
                   options={assigneesList}
                   onSelectValue={(selected) => {
                       setAssignee([selected]);
                   }}
                   title={'Assignee'}
                   selectedValue={assignee}
                   image={IC_NAME}/>
               
                <FastFilters
                    options={leadChipStatusList}
                    selectedValue={leadChipStatus}
                    onSelectValue={(chipValue) => {
                        const filtered = leadChipStatus.some((lead) => lead.id === chipValue.id);
                        if (filtered) {
                            let filteredChips = leadChipStatus.filter((lead) => lead.id!== chipValue.id);
                            setLeadChipStatus(filteredChips);
                        } else {
                            setLeadChipStatus((leadChipStatus)=>[...leadChipStatus,chipValue])
                        }
                    }}
                    title={'Lead Type'}
                    image={IC_NAME}/>
                <LeadType/>
            </View>
            
            <View style={{paddingTop:10,paddingBottom:10}}>
                <FlatList
                    horizontal={true}
                    data={filteredOptions(filterReducer.FilteredLead)}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingEnd: props.filterApplied ? 0 : 120}}
                    renderItem={
                        ({item, index}) => {
                            
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        if (item.type === 'refId' || item.type === 'email_address') {
                                            deleteFilter(item);
                                        } else {
                                            deleteArrayTypeFilter(item);
                                        }
                                    }}>
                                    {filterChips({item, index})}
                                </TouchableWithoutFeedback>
                            );
                        }
                    }
                    keyExtractor={(item) => String(item?.id)}
                />
            </View>
            
            
            <FlatList data={props.data}
                      onEndReached={pageCheck}
                      keyExtractor={(item, index) => item.id}
                      onEndReachedThreshold={0.1}
                      refreshControl={
                          <RefreshControl refreshing={refreshing}
                                          onRefresh={onRefresh}
                          />
                      }
                      renderItem={({item}) => {
                          return (
                              <LeadCardItem item={item} key={item.id}/>
                          );
                      }}
                      ListFooterComponent={<Skeleton loading={loading}/>}
                      ListEmptyComponent={<Empty/>}
            />
        </View>
    
    );
}

export default FlatListLeads;
const styles = StyleSheet.create({
    mainView: {
        height: 35,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingRight: 12,
        paddingLeft: 12,
        marginStart: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        
    },
    textView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipsTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
    },
    icCross: {
        height: 13,
        width: 13,
        marginStart: 8,
        tintColor: 'black',
        marginRight: 2,
    },
});
