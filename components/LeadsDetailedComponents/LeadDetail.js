import React, {createRef, useEffect, useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
    IC_BUYER,
    IC_CALENDER,
    IC_CALL,
    IC_CHANGE_ASSIGNEE,
    IC_DISPOSITION,
    IC_DROPDOWN,
    IC_HOT,
    IC_LEAD_CATEGORY,
    IC_LEAD_PERSON,
    IC_LEAD_SOURCE_DETAILPAGE,
    IC_MODERATE,
    IC_SELLER,
} from '../Assets/Images';
import UserAvatar from 'react-native-user-avatar';
import CustomActionSheet from '../FilterComponents/CustomActionSheet';
import {changeAssignee, getLeadDetail, leadAssignee} from '../Network/NetworkBuilder';
import {useSelector} from 'react-redux';
import moment from 'moment';

function LeadDetail(props) {
    const cardItem = props.cardItem;
    
    function showBottomSheet(reference) {
        reference.current?.show();
    }
    
    const header = useSelector(state => state.loginReducer.headers);
    
    const [assigneesList, setAssigneeList] = useState([]);
    const [assignees, setAssignee] = useState([]);
    const [leadDetail, setLeadDetail] = useState([]);
    const [leadClassification, setLeadClassification] = useState([]);
    
    async function getAssigneesAndLeadDetail() {
        const response = await leadAssignee(header);
        setAssigneeList(response.data.users);
        const response1 = await getLeadDetail(header, cardItem?.id);
        setLeadDetail(response1.data);
   
        let tempClassifier = {
            id: Math.random(),
            type: 'classification',
            name: response1.data.crm_lead?.classification,
        };
        setLeadClassification([tempClassifier]);
        setAssignee([response1.data.crm_lead?.assignee]);
        
    }
    
    useEffect(() => {
        getAssigneesAndLeadDetail();
        
        
    }, []);
    useEffect(() => {
       updateAssignee();
    }, [assignees]);

    async function updateAssignee() {
      
        const response = await changeAssignee(header, assignees[0]?.id, leadDetail.crm_lead?.id);
        
    }
    
    function noAssigneeView() {
        return (
            <View style={{margin: 6}}>
                <TouchableOpacity>
                    <View style={styles.noAssigneeMainView}>
                        <View style={styles.noAssigneeImageView}>
                            <Image source={IC_CHANGE_ASSIGNEE}
                                   style={styles.noAssigneeViewImage}/>
                        </View>
                        <View style={{paddingLeft: 7}}>
                            <Text style={{color: '#83868c'}}> NO Assignee</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.noAssigneeViewBottomLine}>
                </View>
            </View>
        
        
        );
    }
    function assigneeExistView() {
        const bottomSheetRef = createRef();
        
        return (
            <View style={styles.assigneeExistMainView}>
                <TouchableOpacity onPress={() => {
                    showBottomSheet(bottomSheetRef);
                }
                }>
                    <View style={styles.assigneeExistMainRow}>
                        <UserAvatar size={33} name={cardItem.assignee.name?.charAt(0)?.toUpperCase()}/>
                        <View style={{paddingLeft: 7}}>
                            <Text style={styles.assignedToTextStyle}>Assigned To</Text>
                            <View style={styles.assigneeName}>
                                <Text style={{color: '#040404',fontSize:15}}>{assignees[0]?.name} </Text>
                                <Image source={IC_DROPDOWN} style={{width: 10, height: 10, resizeMode: 'contain',tintColor:'black'}}/>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
              
                <CustomActionSheet bottomSheetRef={bottomSheetRef} options={assigneesList}
                                   selectedValue={assignees}
                                   onSelectState={setAssignee}
                                   multi={false}
                />
            </View>
        
        );
    }
    
    function checkImageType(item) {
        if (cardItem[item]?.name === 'Seller') {
            return IC_SELLER;
        } else if (cardItem[item]?.name === 'Buyer') {
            return IC_BUYER;
        } else if (item === 'disposition') {
            return IC_DISPOSITION;
        } else if (item === 'category_type') {
            return IC_LEAD_CATEGORY;
        } else if (item === 'lead_source') {
            return IC_LEAD_SOURCE_DETAILPAGE;
        } else if (leadClassification[0]?.name === 'Moderate') {
            return IC_MODERATE;
        } else if (leadClassification[0]?.name === 'Hot' || leadClassification[0]?.name === 'Very Hot') {
            return IC_HOT;
        }
    }
    
    function checkTitle(item) {
        let title = '';
        if (item === 'category') {
            title = 'Type';
        } else if (item === 'disposition') {
            title = 'Disposition';
        } else if (item === 'category_type') {
            title = 'Category';
        } else if (item === 'classification') {
            title = 'Classification';
        } else if (item === 'lead_source') {
            title = 'Source';
        }
        
        return title;
    }
    
    function typeDispositionClassificationCategory() {
        const categoryRef = createRef();
        return (
            <View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <View style={styles.typeDispositionView}>
                        {Object.keys(cardItem).map((item, index) => {
                            if (item === 'category' || item === 'disposition' || item === 'category_type' || item === 'classification' || item === 'lead_source') {
                                return (
                                    <View key={index}
                                          style={styles.itemView}>
                                        <View style={{paddingHorizontal: 7}}>
                                            <Image source={checkImageType(item)}
                                                   style={styles.itemImageStyle}/>
                                        </View>
                                        <View>
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Text style={styles.itemTextStyle}>{checkTitle(item)}</Text>
                                            </View>
                                            {item === 'classification' ?
                                                <TouchableOpacity
                                                    onPress={() => (showBottomSheet(categoryRef), checkImageType(leadClassification[0].name))}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        <Text style={styles.itemClassificationTextStyle}> {leadClassification[0]?.name} </Text>
                                                        <Image source={IC_DROPDOWN}
                                                               style={{width: 10, height: 10, resizeMode: 'contain',alignSelf:'center'}}/>
                                                    </View>
                                                    <CustomActionSheet bottomSheetRef={categoryRef}
                                                                       options={leadDetail?.classifications}
                                                                       selectedValue={leadClassification}
                                                                       onSelectState={setLeadClassification}
                                                                       multi={false}
                                                    />
                                                </TouchableOpacity>
                                                :
                                                <Text style={styles.itemClassificationTextStyle}>{cardItem[item]?.name}</Text>
                                            }
                                        
                                        </View>
                                    </View>
                                
                                );
                            }
                        })}
                    </View>
                </ScrollView>
            
            
            </View>
        
        );
    }
    
    function leadLifeTime(createdAt) {
        let today = moment();
        let creationDate = moment(createdAt);
        return today.diff(creationDate, 'days');
        
    }
    
    function renderLeadLifeTimeAndBuyerConnect() {
        
        return (
            <View>
                <View style={styles.leadLifeBuyerConnectMainView}>
                    <View style={styles.leadLifeView}>
                        <View style={{paddingHorizontal: 10}}>
                            <Image source={IC_CALENDER}
                                   style={{width: 20, height: 20, resizeMode: 'contain', tintColor: '#f6695f'}}/>
                        </View>
                        <View>
                            <Text style={styles.leadLifeDateStyle}>{leadLifeTime(leadDetail?.crm_lead?.created_at)} days</Text>
                            <Text style={{color: '#828DA0',fontSize:11}}>LeadLife time </Text>
                        </View>
                    
                    </View>
                    <View style={styles.leadLifeView}>
                        <View style={{paddingHorizontal: 10}}>
                            <Image source={IC_LEAD_PERSON}
                                   style={{width: 20, height: 20, resizeMode: 'contain', tintColor: '#f8a1ba'}}/>
                        </View>
                        <View>
                            <Text style={styles.leadLifeTimeConnectStyle}>{leadDetail?.crm_lead?.connects?.length}</Text>
                            <Text style={{color: '#828DA0',fontSize:11,paddingBottom:5}}>Buyer Connects </Text>
                        </View>
                    
                    </View>
                </View>
             
            </View>
        );
    }
    
    function renderSellerDetail() {
        return (
            <View>
                <View style={styles.sellerMainView}>
                    <Text style={styles.sellerHeading}>SELLER DETAILS</Text>
                </View>
                <View style={styles.sellerView}>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <UserAvatar size={33} name={cardItem.client.name?.charAt(0)?.toUpperCase()}/>
                        </View>
                        <View style={{paddingLeft: 8}}>
                            <Text style={styles.sellerName}>{cardItem.client.name}</Text>
                            <Text style={styles.sellerPhoneAndEmail}>{cardItem.client.phone}</Text>
                            <Text style={styles.sellerPhoneAndEmail}>{cardItem.client.email}</Text>
                        </View>
                    
                    
                    </View>
                    <View style={{paddingRight: 20}}>
                        <Image source={IC_CALL}
                               style={styles.sellerCallIcon}/>
                    
                    </View>
                
                </View>
            </View>
        );
    }
  function  renderSeparator(styles){
  return(
      
      <View style={{height: 1,marginLeft:15,marginRight:10, backgroundColor: '#ECECEC', ...styles}}/>
  )
  }
    return (
        
        <View>
            {Object.keys(cardItem.assignee).length ? assigneeExistView() : noAssigneeView()}
            {renderSeparator({marginBottom:5})}
            {typeDispositionClassificationCategory()}
            {renderSeparator({marginTop:5})}
            {renderLeadLifeTimeAndBuyerConnect()}
            {renderSeparator({height:8})}
            {renderSellerDetail()}
        </View>
    );
}

export default LeadDetail;
 const styles=StyleSheet.create({
    assigneeExistMainView:{marginLeft:10,marginTop:5},
     assigneeExistMainRow:{flexDirection: 'row', alignItems: 'center', paddingLeft: 5},
     assignedToTextStyle:{color: '#898795',fontSize:11,},
     assigneeName:{flexDirection: 'row', alignItems: 'center',marginVertical:5},
     typeDispositionView:{
         flexDirection: 'row',
         alignItems: 'center',
         marginLeft: 10,
         marginRight: 10,
         marginTop: 10,
         marginBottom:8,
     },
     itemView:{flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10},
     itemImageStyle:{width: 15, height: 15, resizeMode: 'contain'},
     itemTextStyle:{
         fontSize: 10,
         color: '#ADADAD',
         maxWidth: 130,
     },
     itemClassificationTextStyle:{
         color: '#000',
         fontSize: 14,
         marginTop:2
    
     },
     leadLifeBuyerConnectMainView:{flexDirection: 'row', justifyContent: 'space-between', padding: 15, marginLeft: 10},
     leadLifeView:{
         flexDirection: 'row',
         alignItems: 'center',
    
         borderWidth: 0.5,
         borderRadius: 10,
         width: '49%',
         borderColor: '#ECECEC',
         paddingLeft:8,
     },
     leadLifeDateStyle:{
         color: '#0b0b0b',
         fontSize: 16,
         fontWeight: '400',
         marginVertical:3
     },
     leadLifeTimeConnectStyle:{
         color: '#0b0b0b',
         fontSize: 16,
         fontWeight: '400',
         paddingTop:5,
         marginTop:5
     },
     sellerMainView:{flexDirection: 'row', alignItems: 'center', paddingLeft: 15, paddingTop: 15},
     sellerHeading:{color: '#818a96', fontSize: 14,fontWeight:'bold'},
     sellerView:{
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         paddingLeft: 12,
         paddingTop: 12,
     },
     sellerName:{
         fontSize: 14,
         color: '#040404',
         maxWidth: 130,
     },
     sellerPhoneAndEmail:{
         fontSize: 12,
         fontWeight: '400',
         color: '#95999c',
         maxWidth: 130,
     },
     sellerCallIcon:{width: 35, height: 35, resizeMode: 'contain', tintColor: '#040404'},
     noAssigneeImageView:{
         height: 35,
         width: 35,
         borderRadius: 35,
         borderStyle: 'dashed',
         borderWidth: 1,
         justifyContent: 'center'
         ,
         alignItems: 'center',
         borderColor: 'gray',
     },
     noAssigneeViewBottomLine:{
         width: '100%',
         height: 1,
         backgroundColor: '#b0b0b0',
         paddingLeft: 5,
         paddingRight: 5,
         marginTop: 10,
     },
     noAssigneeMainView:{flexDirection: 'row', alignItems: 'center', paddingLeft: 3},
     noAssigneeViewImage:{height: 15, width: 15, resizeMode: 'contain', tintColor: '#83868c'}
})
