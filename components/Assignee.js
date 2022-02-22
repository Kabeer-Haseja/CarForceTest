import React from 'react';
import {Image, Text, View} from 'react-native';
import {IC_ARROW_DOWN} from './Assets/Images';
import {leadFilterAssigneeStyles} from './commanStyleSheet/LeadFilterAssigneeStyles';

function Assignee(props) {
    return (
        <View style={leadFilterAssigneeStyles.mainView}>
            <Text style={leadFilterAssigneeStyles.text}>Assignee</Text>
            <Image source={IC_ARROW_DOWN} style={leadFilterAssigneeStyles.arrowDown}/>
        </View>
    );
}

export default Assignee;
