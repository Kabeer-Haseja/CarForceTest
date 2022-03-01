import React, {useState} from 'react';
import {Dimensions, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TabBar, TabBarIndicator, TabView} from 'react-native-tab-view';

function CustomTabView(props) {
    
    const initialLayout = {width: Dimensions.get('window').width};
    const [index, setIndex] = useState(0);
    const [routes]=useState(props.routes)
    
    const renderIndicator = (props) => <TabBarIndicator {...props} style={[styles.tabBarIndicatorStyle,props.tabBarIndicatorStyle]}/>;
    
    const renderTabBar = props => (
        <ScrollView
            horizontal={true}
            nestedScrollEnabled={true}
            style={styles.tabBarScrollStyle}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            bounces={false}
        >
            <View style={styles.tabBarMainView}>
                <TabBar
                    {...props}
                    renderIndicator={renderIndicator}
                    style={[styles.tabBarStyle, {backgroundColor: '#fff'}]}
                    tabStyle={styles.tabBarTabStyle}
                    
                    labelStyle={[styles.tabBarLabelStyle, {left: 20, paddingLeft: 10,}]}
                    activeColor={'black'}
                    inactiveColor={'gray'}
                />
            </View>
        </ScrollView>
    );
    return (
            <TabView onIndexChange={setIndex}
                     navigationState={{index,routes}}
                     renderScene={props.renderScene}
                     initialLayout={initialLayout}
                     renderTabBar={renderTabBar}
            />

    );
}

export default CustomTabView;
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
    tabBarScrollStyle:{flexGrow: 0, marginBottom: 10,  backgroundColor: '#fff'},
    tabBarMainView:{
        borderBottomColor: '#e6e6e6', borderBottomWidth: 0.5, marginHorizontal: 22,flexDirection:'row',
    }
});
