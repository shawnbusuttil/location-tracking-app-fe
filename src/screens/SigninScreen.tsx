import React, { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { DrawerNavigationProp } from '@react-navigation/drawer'

import { AuthForm } from '../components/AuthForm'
import { NavLink } from '../components/NavLink'
import AuthContext from '../context/auth'
import { AuthStackParamList, RootDrawerParamList } from '../types/Navigation'

export const SigninScreen = ({ navigation }: { 
    navigation: DrawerNavigationProp<RootDrawerParamList & AuthStackParamList> 
}) => {
    const { state, signin, clearErrors } = useContext(AuthContext)

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
                title='Log In' 
                action='Sign In' 
                onSubmit={signin}
                footer={<NavLink route='SignUp' content="Don't have an account? Sign up." />}
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