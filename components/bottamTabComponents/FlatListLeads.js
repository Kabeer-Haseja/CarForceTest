import React, {useEffect, useState} from 'react';
import {FlatList, RefreshControl, Text, View} from 'react-native';
import LeadCardItem from './LeadCardItem';
import {leadsApi} from '../Network/NetworkBuilder';
import {useDispatch, useSelector} from 'react-redux';
import {AddAllLeads, AddPagination} from '../../redux/actions/leadActions';
import Skeleton from './Skeleton';
import Filters from '../Filters';
import Assignee from '../Assignee';
import LeadType from '../LeadType';


function FlatListLeads(props) {
    
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = React.useState(false);
    const header = useSelector(state => state.loginReducer.headers);
    const leads = useSelector(state => state.leadReducer);
    const [page, setPage] = useState(0);
    
    const onEndReached = async () => {
        let arr = leads.AllLeads;
        const response = await leadsApi(header, leads.pagination?.next_page);
        if (response?.status) {
            dispatch(AddPagination(response.data.pagination));
            let update = arr.concat(response.data.crm_leads);
            dispatch(AddAllLeads(update));
        } else {
        
        }
    };
    
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        let arr = [];
        dispatch(AddAllLeads(arr))
        let response = await leadsApi(header, 1);
        if (response?.status) {
            let update = arr.concat(response.data.crm_leads);
            dispatch(AddPagination(response.data.pagination));
            dispatch(AddAllLeads(update));
            setPage(1)
            setRefreshing(false);
        } else {
        }
        
    }, [refreshing]);
    
    useEffect(() => {
        onEndReached();
        
    }, [page]);
    
    function pageCheck() {
        if (page < leads.pagination.total_pages)
        {
            setPage(leads.pagination.next_page);
        }
    }
    
    return (
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
               <Filters/>
                <Assignee/>
                <LeadType/>
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
                  ListEmptyComponent={<Skeleton/>}
                  ListFooterComponent={<Skeleton/>}
        />
    </View>

);
}

export default FlatListLeads;
