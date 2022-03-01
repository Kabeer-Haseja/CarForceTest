import React, {useEffect, useState} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {IC_CHATTERSBACKGROUND, IC_SEND} from '../Assets/Images';
import UserAvatar from 'react-native-user-avatar';
import {addCommentApi, getLeadDetail} from '../Network/NetworkBuilder';
import {useSelector} from 'react-redux';
import moment from 'moment';

function Chatters(props) {
    const [comment, setComment] = useState('');
    const cardItem = props.cardItem;
    
    const header = useSelector(state => state.loginReducer.headers);
    const [leadDetail, setLeadDetail] = useState([]);
    const [commentList, setCommentList] = useState([]);
    
    
    async function getAssigneesAndLeadDetail() {
        
        const response1 = await getLeadDetail(header, cardItem.id);
        setLeadDetail(response1.data);
        let reverseArray = response1?.data.crm_lead?.comments?.reverse();
        setCommentList(reverseArray);
    }
    
    useEffect(() => {
        getAssigneesAndLeadDetail();
    }, []);
    
    
    function renderCommentButton() {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => addComment()}>
                    <View
                        style={[styles.renderCommentButtonView,{backgroundColor: comment.length > 0 ? '#ba1f24' : '#e9edf0',
                        }]}>
                        <Image
                            style={[{height: 18, width: 18, tintColor: '#ffff', right: 1}]}
                            source={IC_SEND}
                            resizeMode="contain"
                        />
                    </View>
                </TouchableWithoutFeedback>
            
            </View>
        );
    }
    
    function renderInputField() {
        return (
            <View style={styles.renderInputFieldMain}>
                <View style={styles.renderInputFieldView}>
                    <TextInput
                        style={{color: '#040404', flex: 1, marginLeft: 10}}
                        placeholderTextColor={'#929699'}
                        placeholder={'Share an update'}
                        value={comment}
                        onChangeText={text => onChangeText(text)}
                    />
                </View>
                {renderCommentButton()}
            </View>
        );
    }
    
    function onChangeText(text) {
        setComment(text);
    }
    
    async function addComment() {
        if (comment.length > 0) {
            const response = await addCommentApi(header, comment, leadDetail.crm_lead.id);
            let reverseArray = response.data?.comments.reverse();
            setCommentList(reverseArray);
            
            setComment('');
        }
    }
    
    function renderCommentBox(item) {
        return (
            <View style={styles.renderCommentBoxMainView}>
                <View style={{marginEnd: 10}}>
                    <UserAvatar size={40} name={item.user.name?.charAt(0)?.toUpperCase()}/>
                </View>
                <View style={styles.commentView}>
                    <Text style={{marginStart: 10}}>{item.comment}</Text>
                    <Text style={styles.dateStyle}>{moment(item.created_at).format('DD MMM,YYYY hh:mm a')} </Text>
                </View>
            </View>
        );
    }
    
    function renderComments() {
        return (
            <SafeAreaView
                style={styles.renderCommentView}>
                <FlatList
                    data={commentList}
                    contentContainerStyle={{paddingBottom: 10}}
                    inverted={!!commentList.length}
                    showsVerticalScrollIndicator={false}
                    renderItem={
                        ({item}) => {
                            return (
                                renderCommentBox(item)
                            );
                        }
                    }
                    keyExtractor={(item, index) => String(index)}
                />
            </SafeAreaView>
        );
    }
    
    function renderEmptyComments() {
        return (
            <View style={styles.emptyFunctionMainView}>
                <Image source={IC_CHATTERSBACKGROUND} style={styles.emptyFunctionImage}/>
                <Text style={{fontWeight: 'bold'}}>No Comments</Text>
                <Text style={styles.renderEmptyFunctionTextStyle}>Star Commenting about leads,tasks,and
                    appointment</Text>
            </View>
        
        );
    }
    
    return (
        <View style={styles.mainView}>
            <View style={styles.mainView}
                  contentContainerStyle={{flex: 1}}>
                {renderInputField()}
                {commentList.length > 0 ? renderComments() : renderEmptyComments()}
            </View>
        </View>
    );
}

export default Chatters;
export const styles = StyleSheet.create({
    mainView: {backgroundColor: '#fff', flex: 1, flexDirection: 'column-reverse'},
    emptyFunctionMainView: {justifyContent: 'center', alignItems: 'center', flex: 1},
    emptyFunctionImage: {height: 250, width: 250, resizeMode: 'contain'},
    renderCommentsMainView: {flex: 1, marginTop: 30, marginLeft: 15, marginBottom: 10},
    renderCommentBoxMainView: {flexDirection: 'row', alignItems: 'center', marginBottom: 30},
    dateStyle: {marginTop: 2, marginLeft: 10, color: '#878a91'},
    renderCommentView: {flex: 1, marginTop: 30, marginLeft: 15, marginBottom: 10},
    renderEmptyFunctionTextStyle: {maxWidth: 280, textAlign: 'center', color: '#c0c2d1'},
    commentView: {
        borderRadius: 15,
        borderTopLeftRadius: 0,
        padding: 10,
        paddingRight: 20,
        backgroundColor: '#F6F8FF',
    },
    renderInputFieldView:{
        height: 50,
        flex: 1,
        backgroundColor: '#e9edf0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderColor: 'gray',
        bottom: 25,
    },
    renderInputFieldMain:{flexDirection: 'row', marginTop: 5, marginLeft: 10, marginRight: 10},
    renderCommentButtonView:{
        height: 50,
        width: 50,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 5,
        bottom: 25,
    }
    
});
