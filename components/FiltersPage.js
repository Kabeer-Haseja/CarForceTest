import React, {useState} from 'react';
import {Image, SafeAreaView, Text, TextInput, View} from 'react-native';
import {IC_ASSIGNEE, IC_CALENDER, IC_EMAIL, IC_LEAD_CATEGORY, IC_LEAD_SOURCE, IC_NAME} from './Assets/Images';
import BottomSheet from './BottamSheetComponents/BottomSheet';
import DatePicker from './BottamSheetComponents/DatePicker';
import LeadChip from './BottamSheetComponents/LeadChip';

function FormInput(props){
            return(
                <View style={{flexDirection:'row',alignItems:'center',marginTop:20}}>
                <View style={{ height: 30,
                    width: 30,
                    marginEnd: 10,
                    borderRadius: 25,
                    backgroundColor: '#F8F9FB',
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",}}>
                    <Image
                        resizeMode={"contain"}
                        tintColor={'gray'}
                        style={{
                            height: 15,
                            width: 15,
                            tintColor: '#828DA0',
                            alignItems:'center'
                        }}
                        source={props.image}
                    />
                </View>
                    
                    <View style={{width:"90%"}}>
                        <Text style={{fontSize:12,textTransform:'capitalize',marginVertical:10}}>{props.title}</Text>
                        <TextInput value={props.value} placeholder={props.placeholder} onChangeText={props.onChangeText} textAlignVertical={'top'}
                                   style={{padding:0,borderBottomWidth:0.2,paddingBottom:10}}/>
                    </View>
                </View>
            )

}
function FiltersPage(props) {
    const [leadRefId, setLeadRefId] = useState("")
    const [leadClientEmail, setLeadClientEmail] = useState("")
    const [assignee,setAssignee]=useState("Kabeer")
    const [leadSource,setLeadSource]=useState(["ss","dd"])
    const [createdAt, setCreatedAt] = useState("date")
    
    function l_RefId(){
        return(
            <View style={{marginHorizontal:20}}>
                <FormInput
                    value={leadRefId}
                    title={"LEAD_REF_ID"}
                    keyboardType={"numeric"}
                    placeholder={"LeadRefId"}
                    image={IC_LEAD_CATEGORY}
                    onChangeText={(text) => {
                        setLeadRefId(text)
                    }}
                />
           
             
            </View>
        )
    }
    function l_ClientEmail(){
        return(
            <View style={{marginHorizontal:20}}>
                <FormInput
                    value={leadClientEmail}
                    title={"LEAD_CLIENT_EMAIL"}
                    placeholder={"LEAD_CLIENT_EMAIL"}
                    image={IC_EMAIL}
                    onChangeText={(text) => {
                        setLeadClientEmail(text)
                    }}
                />
    
            </View>
        )
    }
    
    function l_LeadAssignee() {
        return (
            <BottomSheet
                options="['x','y','z']"
                onSelectValue={(selected)=>{setAssignee(selected)}}
                title={"Assignee"}
                selectedValue={assignee}
                image={IC_NAME}
            />
        )
    }
    
    function l_leadSource() {
        return (
            <BottomSheet
                options="['leadSource','y','z']"
                onSelectValue={(selected)=>{setLeadSource(selected)}}
                title={"Lead Source"}
                multi={true}
                selectedValue={leadSource}
                image={IC_LEAD_SOURCE}/>
          
        )
    }
    
    function l_LeadDate() {
        return(
            <DatePicker
            title={"created At"}
            selectedValue={createdAt}
            onSelectValue={(date)=>{setCreatedAt(date)}}
            image={IC_CALENDER}
            />
        )
    }
    
    function l_leadChip() {
        return(
            <LeadChip
                options="['Seller','Buyer']"/>
        )
    }
    
    return (
        <SafeAreaView style={{flex:1,}}>
            <View>
            <View style={{flexDirection:'row',margin:10,alignItems:'center'}}>
                <Text style={{color:'black',fontSize:16,fontWeight:'bold',paddingHorizontal:10,paddingVertical:20}}>Filters Page</Text>
              </View>
                {l_RefId()}
                {l_ClientEmail()}
                {l_LeadAssignee()}
                {l_leadSource()}
                {l_LeadDate()}
                {l_leadChip()}
            </View>
         
        </SafeAreaView>
    );
}

export default FiltersPage;
