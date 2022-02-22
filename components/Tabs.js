import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DASHBOARD_SCREEN, INVENTORY_SCREEN, LEADS_SCREEN, MORE_SCREEN, TASKS_SCREEN} from './RouteName';
import {Image, Text, View} from 'react-native';
import {IC_DASHBOARD, IC_INVENTORY, IC_LEADS, IC_MORE, IC_TASKS} from './Assets/Images';
import Leads from './bottamTabComponents/Leads';
import Dashboard from './bottamTabComponents/Dashboard';
import Tasks from './bottamTabComponents/Tasks';
import Inventory from './bottamTabComponents/Inventory';
import More from './bottamTabComponents/More';

const Tab = createBottomTabNavigator();

function tabOptions(focused, name, image) {
    return (
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={image} style={{
                resizeMode: 'contain',
                height: 25,
                width: 25,
                tintColor: focused ? '#ba1f25' : '#6a7583',
            }}/>
            <Text style={{fontSize:12,fontWeight:"300",color:focused? "#ba1f25":'black'}}>{name}</Text>
        </View>
    
    );
}

function Tabs(props) {
    
    return (
        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            headerShown:false
        }}>
            <Tab.Screen name={LEADS_SCREEN} component={Leads} options={{
                tabBarIcon: ({focused}) => (
                    tabOptions(focused, LEADS_SCREEN, IC_LEADS)),
            }}/>
    
            <Tab.Screen name={DASHBOARD_SCREEN} component={Dashboard} options={{
                tabBarIcon: ({focused}) => (
                    tabOptions(focused, DASHBOARD_SCREEN, IC_DASHBOARD)),
            }}/>
            <Tab.Screen name={TASKS_SCREEN} component={Tasks} options={{
                tabBarIcon: ({focused}) => (
                    tabOptions(focused, TASKS_SCREEN, IC_TASKS)),
            }}/>
            <Tab.Screen name={INVENTORY_SCREEN} component={Inventory} options={{
                tabBarIcon: ({focused}) => (
                    tabOptions(focused, INVENTORY_SCREEN, IC_INVENTORY)),
            }}/>
            <Tab.Screen name={MORE_SCREEN} component={More} options={{
                tabBarIcon: ({focused}) => (
                    tabOptions(focused, MORE_SCREEN, IC_MORE)),
            }}/>
        
        </Tab.Navigator>
    );
}

export default Tabs;
