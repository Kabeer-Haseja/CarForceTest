import React, {createRef, useEffect} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {IC_ARROW_DOWN} from '../Assets/Images';
import {leadFilterAssigneeStyles} from '../commanStyleSheet/LeadFilterAssigneeStyles';
import {AddAllLeads, AddFilteredPagination, FilteredLeadData} from '../../redux/actions/leadActions';
import {getFieldParams} from '../FiltersPage';
import {applyFilters} from '../Network/NetworkBuilder';
import {useDispatch, useSelector} from 'react-redux';
import CustomActionSheet from './CustomActionSheet';

function FastFilters(props) {
    const filterReducer = useSelector(state => state.FilteredReducer);
    const header = useSelector(state => state.loginReducer.headers);
    
    const bottomSheetRef = createRef();
    const dispatch = useDispatch();
    
    function showBottomSheet() {
        bottomSheetRef.current?.show();
    }
    
    
    
    async function setFilter() {
        
        let filters = filterReducer.FilteredLead;
        if (props.title === 'Assignee') {
            filters['assignees'] = props.selectedValue;
        }
        if (props.title === 'Lead Type') {
            filters['categories'] = props.selectedValue;
        }
        dispatch(FilteredLeadData(filters));
        const values = await getFieldParams(filters);
        const response = await applyFilters(header, values, 1);
        dispatch(AddFilteredPagination(response.data.pagination));
        dispatch(AddAllLeads(response.data.crm_leads));
    }
    
    useEffect(() => {
        setFilter();
        
    }, [props.selectedValue]);
    
    return (
        <View style={{marginHorizontal: 10}}>
            <TouchableOpacity onPress={() => showBottomSheet()
            }>
                <View style={leadFilterAssigneeStyles.mainView}>
                    <Text style={leadFilterAssigneeStyles.text}>{props.title}</Text>
                    <Image source={IC_ARROW_DOWN} style={leadFilterAssigneeStyles.arrowDown}/>
                </View>
            </TouchableOpacity>
            
            <CustomActionSheet bottomSheetRef={bottomSheetRef} options={props.options}
                               selectedValue={props.selectedValue}
                               onSelectValue={props.onSelectValue}
                               onSelectState={props.onSelectState}
                                multi={props.multi}
            />
        </View>
    
    );
}

export default FastFilters;
