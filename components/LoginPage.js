import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useFormik} from 'formik';
import InputField from './comman/InputField';
import ButtonComponent from './comman/ButtonComponent';
import axios from 'axios';
import CheckBoxComponent from './comman/CheckBoxComponent';
import {useNavigation} from '@react-navigation/native';
import {LEADS_SCREEN, MAIN_SCREEN} from './RouteName';
import {useDispatch, useSelector} from 'react-redux';
import {AddLead} from '../redux/actions/loginAction';

function LoginPage(props) {
    const navigation=useNavigation()
    const [hide,setHide]=useState(true)
    const dispatch=useDispatch();
    const userData=useSelector(state => state.loginReducer)
    useEffect(()=>{
        console.log(userData)
        if(userData &&userData.data!=null)
        {
            console.log("dd",userData)
            navigation.navigate(MAIN_SCREEN)
        
        }
        
    },[])
    async function submit(values) {
        const url = 'https://dev2.empgautos.com/auth/sign_in';
       await axios.post(url, values).then((resoponse) => {
           console.log('response',resoponse)
            if(resoponse.status) {
                dispatch(AddLead(resoponse))
                navigation.navigate(MAIN_SCREEN,{headers:resoponse.headers});
                
            }
        }).catch((error)=> {
            alert("Not Found")
       })
    }
    const formik = useFormik({
        initialValues: {email: '', password: ''},
        onSubmit: values => {
            submit(values);
        },
    });
    return (
        <View>
            <InputField
                formik={formik}
                placeHolder={'Name'}
                secureTestEntry={false}
                value={'email'}
            />
            <InputField
                formik={formik}
                placeHolder={'password'}
                secureTestEntry={hide}
                setHide={setHide}
                value={'password'}

            />
            <CheckBoxComponent value={'Remember Me'}/>
            <ButtonComponent
                title={'Login'}
                formik={formik}
            />
        
        </View>
    );
}

export default LoginPage;
