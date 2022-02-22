import React from 'react';
import {Image, Text, TouchableWithoutFeedback, TouchableWithoutFeedbackComponent, View} from 'react-native';
import {IC_ARROW_DOWN, IC_FILTER} from './Assets/Images';
import {leadFilterAssigneeStyles} from './commanStyleSheet/LeadFilterAssigneeStyles';
import {useNavigation} from '@react-navigation/native';
import {FILTER_SCREEN} from './RouteName';
function Filters(props) {
    const navigation=useNavigation();
    
    return (
        <TouchableWithoutFeedback onPress={()=>{
            navigation.navigate(FILTER_SCREEN)
        }}>
        <View style={leadFilterAssigneeStyles.mainView}>
            <Image
                source={IC_FILTER}  style={leadFilterAssigneeStyles.filterImage}/>
             <Text style={leadFilterAssigneeStyles.text}>Filters</Text>
            <Image source={IC_ARROW_DOWN} style={leadFilterAssigneeStyles.arrowDown}/>
        </View>
        </TouchableWithoutFeedback>
    );
}

export default Filters;
