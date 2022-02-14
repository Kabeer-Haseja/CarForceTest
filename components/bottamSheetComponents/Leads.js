import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView, View, StyleSheet} from 'react-native';
import BottomTabsHeading from './BottomTabsHeading';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {TabBar, TabBarIndicator, TabView} from 'react-native-tab-view';
import {AddAllLeads} from '../../redux/actions/leadActions';
import AllLeads from './AllLeads';
import SellerLeads from './SellerLeads';
import BuyerLeads from './BuyerLeads';


function Leads(props) {
    const header = useSelector(state => state.loginReducer.headers);
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    const initialLayout = {width: Dimensions.get('window').width};
    
    const [routes] = useState([{key: 'All', title: 'All'}, {key: 'Seller', title: 'Seller'}, {
        key: 'Buyer',
        title: 'Buyer',
    }]);
    
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
    const renderIndicator = (props) => <TabBarIndicator {...props} style={[styles.tabBarIndicatorStyle]}/>;
    const renderTabBar = props => (
        <ScrollView
            horizontal={true}
            nestedScrollEnabled={true}
            style={{flexGrow: 0, marginBottom: 12, marginVertical: 10, backgroundColor: '#f2f2f2'}}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            bounces={false}
        >
            <View style={{
                borderBottomColor: '#e6e6e6', borderBottomWidth: 0.5, marginHorizontal: 22, width: '100%',
            }}>
                <TabBar
                    {...props}
                    renderIndicator={renderIndicator}
                    style={[styles.tabBarStyle, {backgroundColor: '#f2f2f2'}]}
                    tabStyle={styles.tabBarTabStyle}
                    labelStyle={[styles.tabBarLabelStyle, {left: 0, paddingLeft: 20}]}
                    activeColor={'black'}
                    inactiveColor={'gray'}
                />
            </View>
        </ScrollView>
    );
    
    useEffect(() => {
        console.log('hello');
        const url = 'https://dev2.empgautos.com/api/crm/crm_leads';
        axios.get(url, {
            headers: header,
        }).then((response) => {
            dispatch(AddAllLeads({...response.data.crm_leads}));
        });
    }, []);
    return (<View style={{backgroundColor: '#f2f2f2', flex: 1}}>
        <BottomTabsHeading
            
            heading={'ALL Leads'}
        />
        <TabView onIndexChange={setIndex}
                 navigationState={{index, routes}}
                 renderScene={renderScene}
                 initialLayout={initialLayout}
                 renderTabBar={renderTabBar}
        
        />
    
    </View>);
}

export default Leads;

const styles = StyleSheet.create({
    tabBarStyle: {
        elevation: 0,
    },
    tabBarIndicatorStyle: {
        backgroundColor: 'black',
        // borderTopLeftRadius: 300,
        // borderTopRightRadius: 200,
        height: 3,
    },
    tabBarLabelStyle: {
        textTransform: 'capitalize',
        //    fontFamily: '',
        left: 20,
    },
    tabBarTabStyle: {
        width: 'auto',
        padding: 0,
        marginRight: 40,
    },
});
