import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {getLeadTask} from '../Network/NetworkBuilder';
import {useSelector} from 'react-redux';
import {IC_CHANGE_ASSIGNEE, IC_SMALL_ARROW} from '../Assets/Images';
import HorizontalLine from './horizontalLine';
import moment from 'moment';
import UserAvatar from 'react-native-user-avatar';


function LeadTask(props) {
    const cardItem = props.cardItem;
    const header = useSelector(state => state.loginReducer.headers);
    const [tasks, setTasks] = useState([]);
    const [hide, setHide] = useState(false);
    
    async function fetchLeadTask() {
        const response = await getLeadTask(header, cardItem?.id);
      //  console.log('responseTasks', response.data);
        setTasks(response.data.tasks);
    }
    
    useEffect(() => {
        fetchLeadTask();
    }, []);
    
    
    return (
        <View>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10, paddingTop: 10}}>
                <TouchableOpacity onPress={() => setHide(!hide)}>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 10}}>
                        <View>
                            <Image source={IC_SMALL_ARROW} style={{
                                width: 10,
                                height: 10,
                                resizeMode: 'contain',
                                transform: hide ? [] : [{rotateZ: '270deg'}],
                            }}/>
                        </View>
                        <View style={{paddingLeft: 5}}>
                            <Text style={{fontWeight: 'bold'}}>Due</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <ScrollView>
                {hide &&
                    tasks.map((item) => {
                        return (
                            <View key={item?.id}>
                                <View style={{
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                    paddingLeft: 30, paddingRight: 15, paddingTop: 10, paddingBottom: 10,
                                }}>
                                    <View>
                                        <Text>{item.name}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{paddingRight: 10}}>
                                            <Text style={{color: 'gray', fontWeight: '500'}}>
                                                {moment(item.date).format('D MMM')}
                                            </Text>
                                        </View>
                                        <View style={{
                                            height: 32,
                                            width: 32,
                                            borderRadius: 33,
                                            borderStyle: 'dashed',
                                            borderWidth: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderColor: 'gray',
                                        }}>
                                            {item.assignee ?
                                                <UserAvatar size={33}
                                                            name={item.assignee.name?.charAt(0)?.toUpperCase()}/>
                                                : <Image source={IC_CHANGE_ASSIGNEE}
                                                         style={{
                                                             height: 15,
                                                             width: 15,
                                                             resizeMode: 'contain',
                                                             tintColor: '#83868c',
                                                         }}/>
                                                
                                            }
                                        </View>
                                    </View>
                                </View>
                                <HorizontalLine/>
                            
                            </View>
                        );
                    })
                }
            </ScrollView>
        </View>
    );
}

export default LeadTask;
