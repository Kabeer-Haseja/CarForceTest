import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import {FILTER_SCREEN, HOME_SCREEN, LEADS_SCREEN, MAIN_SCREEN, TABS_SCREEN} from './components/RouteName';
import MainPage from './components/MainPage';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider, useSelector} from 'react-redux';
import {persistor, store} from './store';
import {PersistGate} from 'redux-persist/integration/react';
import Leads from './components/bottamTabComponents/Leads';
import Tabs from './components/Tabs';
import Filters from './components/Filters';
import FiltersPage from './components/FiltersPage';

function App(props) {
    const Stack = createNativeStackNavigator();
    
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{headerShown: false}}
                    >
                        <Stack.Screen name={HOME_SCREEN} component={Home}/>
                        <Stack.Screen name={MAIN_SCREEN} component={MainPage}/>
                        
                        <Stack.Screen name={LEADS_SCREEN} component={Leads}/>
                        <Stack.Screen name={FILTER_SCREEN} component={FiltersPage}/>
                    
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

export default App;
