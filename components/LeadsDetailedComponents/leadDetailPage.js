import React from 'react';
import {SafeAreaView} from 'react-native';
import LeadDetailHeader from './LeadDetailHeader';
import CustomTabView from '../CustomTabView';
import LeadDetail from './LeadDetail';
import LeadTask from './LeadTask';
import Chatters from './Chatters';

function LeadDetailPage(props) {
    const cardItem = props.route.params;
    const renderScene = ({route}) => {
        switch (route.key) {
            case 'first':
                return <LeadDetail cardItem={cardItem}/>;
            case 'second':
                return <LeadTask cardItem={cardItem}/>;
            case 'third':
                return <Chatters cardItem={cardItem}/>;
        }
        
    };
    const routes = [
        {key: 'first', title: 'Detail'},
        {key: 'second', title: 'Tasks'},
        {key: 'third', title: 'Chatter'},
        {key: 'forth', title: 'Attachment'},
    
    ];
    
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
            <LeadDetailHeader cardItem={cardItem}/>
            <CustomTabView routes={routes} renderScene={renderScene}
                           labelStyle={{left: 0, paddingRight: 5}}
                           tabBarIndicatorStyle={{borderTopLeftRadius: 0, borderTopRightRadius: 0, height: 3, left: 0}}
            />
        </SafeAreaView>
    );
}

export default LeadDetailPage;
