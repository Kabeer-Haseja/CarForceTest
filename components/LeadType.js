import React from 'react';
import {Image, Text, View} from 'react-native';
import {IC_ARROW_DOWN, IC_FILTER} from './Assets/Images';
import {leadFilterAssigneeStyles} from './commanStyleSheet/LeadFilterAssigneeStyles';

function LeadType(props) {
    return (
        <View style={leadFilterAssigneeStyles.mainView}>
            <Text style={leadFilterAssigneeStyles.text}>LeadType</Text>
            <Image source={IC_ARROW_DOWN} style={leadFilterAssigneeStyles.arrowDown}/>
        </View>

    );
}
export default LeadType;
