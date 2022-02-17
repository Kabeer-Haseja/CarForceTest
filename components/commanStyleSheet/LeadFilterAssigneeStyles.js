import {StyleSheet} from 'react-native';

export const leadFilterAssigneeStyles=StyleSheet.create({

    mainView:{
    backgroundColor:'white',borderRadius:10, paddingLeft:10,paddingRight:10,
    height:40,alignItems:'center',flexDirection:'row', marginBottom:5,  elevation: 2,
    justifyContent:'space-between',
},
filterImage:{
    height:20,width:20,marginEnd:10, resizeMode:'contain',tintColor:'black'
},
    text:{fontSize:14,   color: "#000"},
    arrowDown:{height:12,width:12,resizeMode:'contain',marginStart:5,},

})
