import React, {useEffect} from 'react';
import {KeyboardAvoidingView, SafeAreaView, Text, View} from 'react-native';
import LoginPage from './LoginPage';
import LogoText from './LogoText';
import {useSelector} from 'react-redux';

function Home(props) {
    const userExists=useSelector(state => state.loginReducer)
    useEffect(() => {
    }, []);
    
    return (
        <SafeAreaView style={{flex:1, backgroundColor: 'white', justifyContent: 'center'}}>
                <KeyboardAvoidingView  style={{justifyContent: "center"}}
                >
                    <LogoText
                        heading={"Login to Car Force"}
                        subHeading={'Hi 👋 Welcome to carforce!'}
                        subHeading2={' Happy CRM :)'}
                    />
                        <LoginPage/>
    
                </KeyboardAvoidingView>
         
        </SafeAreaView>
    
    );
}

export default Home;
