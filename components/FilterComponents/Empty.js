import React from 'react';
import {Text, View} from 'react-native';

function Empty(props) {
    const {loading, data} = props;
    return (
        <View style={{justifyContent:'center',alignItems:'center'}}>
            {!loading && !data.length &&
                <Text>Empty</Text>
            }
        </View>
    );
}

export default Empty;
