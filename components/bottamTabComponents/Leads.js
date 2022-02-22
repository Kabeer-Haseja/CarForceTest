import React, {useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import BottomTabsHeading from './BottomTabsHeading';
import {TabBar, TabBarIndicator, TabView} from 'react-native-tab-view';
import AllLeads from './AllLeads';
import SellerLeads from './SellerLeads';
import BuyerLeads from './BuyerLeads';


function Leads(props) {
    const initialLayout = {width: Dimensions.get('window').width};
    const [index, setIndex] = useState(0);
    
    
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
                    labelStyle={[styles.tabBarLabelStyle, {left: 0, paddingLeft: 5,}]}
                    activeColor={'black'}
                    inactiveColor={'gray'}
                />
            </View>
        </ScrollView>
    );
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor: '#f2f2f2', flex: 1}}>
                <BottomTabsHeading
                    heading={'All Leads'}
                />
                <TabView onIndexChange={setIndex}
                         navigationState={{index, routes}}
                         renderScene={renderScene}
                         initialLayout={initialLayout}
                         renderTabBar={renderTabBar}
                />
            </View>
        </SafeAreaView>
    );
}

export default Leads;

const styles = StyleSheet.create({
    tabBarStyle: {
        elevation: 0,
    },
    tabBarIndicatorStyle: {
        backgroundColor: 'black',
        height: 3,
        
    },
    tabBarLabelStyle: {
        textTransform: 'capitalize',
        left: 20,
    },
    tabBarTabStyle: {
        width: 'auto',
        padding: 0,
        marginRight: 40,
    },
});
