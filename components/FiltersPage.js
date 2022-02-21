import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, TouchableWithoutFeedback, View,StyleSheet} from 'react-native';
import {IC_CALENDER, IC_EMAIL, IC_LEAD_CATEGORY, IC_LEAD_SOURCE, IC_LEAD_TYPE, IC_NAME} from './Assets/Images';
import BottomSheet from './FilterComponents/BottomSheet';
import DatePicker from './FilterComponents/DatePicker';
import LeadChip from './FilterComponents/LeadChip';
import {
    applyFilters,
    getLeadCategoryTypes,
    getLeadsChipStatus,
    getLeadSources,
    leadAssignee,
} from './Network/NetworkBuilder';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {AddAllLeads, AddFilteredPagination, FilteredLeadData} from '../redux/actions/leadActions';
import FormInput from './FilterComponents/FormInput';

export async  function getFieldParams(values){
    let query = ""
    let categories = values?.categories
    let categoryTypes = values?.categoryTypes
    let assignees = values?.assignees
    let leadSources = values?.leadSources
    let refId = values?.refId
    
    let email = values?.email_address
    if(refId!==""){
        query = query + "f[reference_number]=" + refId + "&"
    }
    if(email!==""){
        query = query + "f[client.email]=" + email + "&"
    }
    if (categories && categories.length > 0) {
        categories.map((item) => {
            query = query + "f[category.slug][]=" + item.slug + "&"
        })
    }
    if (assignees && assignees.length > 0) {
        assignees.map((item) => {
            query = query + "f[assignee.id][]=" + item.id + "&"
        })
        
    }
    if(leadSources && leadSources.length>0)
    {
        leadSources.map((item) => {
            query = query+ "f[lead_source.id][]=" + item.id + "&"
        })
    }
    if (categoryTypes && categoryTypes.length > 0) {
        categoryTypes.map((item) => {
            query = query + "f[category_type.id][]=" + item.id + "&"
        })
    }
    
    
    if(query!=="")
    {
        return "&"+query;
    }
    
}


function FiltersPage(props) {
    const navigation=useNavigation()
    const dispatch=useDispatch()
    
    
    
    const [leadRefId, setLeadRefId] = useState('');
    const [leadClientEmail, setLeadClientEmail] = useState('');
    const [assignee, setAssignee] = useState([]);
    const [leadSource, setLeadSource] = useState([]);
    const [createdAt, setCreatedAt] = useState('date');
    const [leadChipStatus, setLeadChipStatus] = useState([]);
    const [leadCategory, setLeadCategory] = useState([]);
    
    const header = useSelector(state => state.loginReducer.headers);
    const filteredObject=useSelector(state => state.FilteredReducer)
    
    
    const [assigneesList, setAssigneeList] = useState([]);
    const [leadSourceList, setLeadSourceList] = useState([]);
    const [leadCategoryList,setLeadCategoryList]=useState([])
    const[leadChipStatusList,setChipStatusList]=useState([])
    
    async function getLeadAssignee() {
        const response = await leadAssignee(header);
        const leadSources = await getLeadSources(header);
        const leadCategory = await getLeadCategoryTypes(header);
        const leadChipStatus=await getLeadsChipStatus(header)
        
        setChipStatusList(leadChipStatus.data.categories)
        setAssigneeList(response.data.users);
        setLeadSourceList(leadSources.data.lead_sources);
        setLeadCategoryList(leadCategory.data.category_types)
        
    }
    
    
    useEffect(() => {
        getLeadAssignee();
        if(Object.keys(filteredObject.FilteredLead).length)
        {
     
            setLeadChipStatus(filteredObject.FilteredLead.categories)
            setLeadRefId(filteredObject.FilteredLead.refId)
            setLeadCategory(filteredObject.FilteredLead.categoryTypes)
            setAssignee(filteredObject.FilteredLead.assignees)
            setLeadSource(filteredObject.FilteredLead.leadSources)
            setLeadClientEmail(filteredObject.FilteredLead.email_address)
          
    
        }
    }, []);
    
    
    function l_RefId() {
        return (
            <View style={{marginHorizontal: 20}}>
                <FormInput
                    value={leadRefId}
                    title={'LEAD_REF_ID'}
                    keyboardType={'numeric'}
                    placeholder={'LeadRefId'}
                    image={IC_LEAD_CATEGORY}
                    onChangeText={(text) => {
                        setLeadRefId(text);
                    }}
                />
            
            
            </View>
        );
    }
    
    function l_ClientEmail() {
        return (
            <View style={{marginHorizontal: 20}}>
                <FormInput
                    value={leadClientEmail}
                    title={'LEAD_CLIENT_EMAIL'}
                    placeholder={'LEAD_CLIENT_EMAIL'}
                    image={IC_EMAIL}
                    onChangeText={(text) => {
                        setLeadClientEmail(text);
                    }}
                />
            </View>
        );
    }
    
    
    function l_LeadAssignee() {
        return (
            <BottomSheet
                options={assigneesList}
                onSelectValue={(selected) => {
                    setAssignee([selected]);
                }}
                title={'Assignee'}
                selectedValue={assignee}
                image={IC_NAME}
            />
        );
    }
    
    function l_leadSource() {
        return (
            <BottomSheet
                options={leadSourceList}
                onSelectValue={(selected) => {
                    const filtered = leadSource.some((lead) => lead.id === selected.id);
                    if (filtered) {
                        let filteredLeads = leadSource.filter((lead) => lead.id !== selected.id);
                        setLeadSource(filteredLeads);
                    } else {
                        setLeadSource((leadSource) => [...leadSource, selected]);
                    }
                }}
                title={'Lead Source'}
                multi={true}
                selectedValue={leadSource}
                image={IC_LEAD_SOURCE}/>
        
        );
    }
    
    function l_LeadDate() {
        return (
            <DatePicker
                title={'created At'}
                selectedValue={createdAt}
                onSelectValue={(date) => {
                    setCreatedAt(date);
                }}
                image={IC_CALENDER}
            />
        );
    }
    
    function l_leadChip() {
        return (
            <LeadChip
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
                image={IC_LEAD_TYPE}
            />
        );
    }
    function l_leadCategory() {
        return (
            <BottomSheet
                options={leadCategoryList}
                onSelectValue={(selected) => {
                    const filtered = leadCategory.some((lead) => lead.id === selected.id);
                    if (filtered) {
                        let filteredLeads = leadCategory.filter((lead) => lead.id !== selected.id);
                        setLeadCategory(filteredLeads);
                    } else {
                        setLeadCategory((leadCategory)=>[...leadCategory,selected])
                    } }}
                multi={true}
                title={'Lead Category'}
                selectedValue={leadCategory}
                image={IC_LEAD_CATEGORY}/>
        
        
        );
    }
    
   async function filterButtonHandler() {
        let filterObj={
            refId:leadRefId,
            email_address:leadClientEmail,
            assignees:assignee,
            leadSources:leadSource,
            categories:leadChipStatus,
            categoryTypes:leadCategory
            
        }
        dispatch(FilteredLeadData(filterObj))
       
       const values=  await getFieldParams(filterObj)
       const response= await applyFilters(header,values,1)
      
       dispatch(AddFilteredPagination(response.data.pagination))
       dispatch(AddAllLeads(response.data.crm_leads))
     
       navigation.goBack()
       
    }
    
    function l_buttons() {
        return (
            <View style={styles.mainViewButton}>
                <TouchableWithoutFeedback>
                    <View style={styles.cancelView}>
                        <Text>Cancel</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{
                   
                    filterButtonHandler()
                }
                }>
                    <View style={styles.applyButtonView}>
                        <Text style={{color: 'white'}}>Apply Filters</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        
        );
    }
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <View>
                <View style={styles.filtersPageView}>
                    <Text style={styles.filterPageHeading}>Filters Page</Text>
                </View>
                {l_RefId()}
                {l_ClientEmail()}
                {l_LeadAssignee()}
                {l_leadSource()}
                {l_LeadDate()}
                {l_leadChip()}
                {l_leadCategory()}
                {l_buttons()}
            </View>
        
        </SafeAreaView>
    );
}

export default FiltersPage;

const styles=StyleSheet.create({
    mainViewButton:{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'},
    cancelView:{
        backgroundColor: '#fff',
        width: '45%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    applyButtonView:{
        backgroundColor: '#ba1f24',
        marginTop: 10,
        width: '40%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    filtersPageView:{flexDirection: 'row', margin: 10, alignItems: 'center'},
    filterPageHeading:{
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
})
