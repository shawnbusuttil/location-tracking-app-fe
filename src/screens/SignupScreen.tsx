import React, { useContext, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

import { AuthForm } from '../components/AuthForm'
import { NavLink } from '../components/NavLink'
import AuthContext from '../context/auth'
import { AuthStackParamList, RootDrawerParamList } from '../types/Navigation'

export const SignupScreen = ({ navigation }: { 
    navigation: DrawerNavigationProp<RootDrawerParamList & AuthStackParamList> 
}) => {
    const { state, signup, clearErrors } = useContext(AuthContext)

    if (state.token) {
        navigation.navigate("Main")
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          clearErrors()
        });
    
        return unsubscribe;
      }, [navigation]
    );

    return (
        <View style={styles.screenStyles}>
            <AuthForm 
                title='Create a Tracker Account'
                action='Sign Up' 
                onSubmit={signup}
                footer={<NavLink route='SignIn' content="Already have an account? Sign in." />}
                errorMessage={state.error} 
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screenStyles: {
        height: "100%",
        marginHorizontal: 15,
        justifyContent: "center",
    }
})