import React, {useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import BottomTabsHeading from './BottomTabsHeading';
import {TabBar, TabBarIndicator, TabView} from 'react-native-tab-view';
import AllLeads from './AllLeads';
import SellerLeads from './SellerLeads';
import BuyerLeads from './BuyerLeads';
import CustomTabView from '../CustomTabView';


function Leads(props) {
    
    
    // const [routes] = useState([
    //     {key: 'All', title: 'All'},
    //     {key: 'Seller', title: 'Seller'},
    //     {key: 'Buyer', title: 'Buyer',}
    // ]);
    //
    const renderScene = ({route}) => {
        switch (route.key) {
            case 'All':
                return <AllLeads/>;
            case 'Seller':
                return <SellerLeads/>;
            case 'Buyer':
                return <BuyerLeads/>;
        }
        
    };
    const routes = [
        {key: 'All', title: 'All'},
        {key: 'Seller', title: 'Seller'},
        {key: 'Buyer', title: 'Buyer',}
    ];
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
                <BottomTabsHeading
                    heading={'All Leads'}
                />
                <CustomTabView routes={routes} renderScene={renderScene} />
            </View>
        </SafeAreaView>
    );
}

export default Leads;

