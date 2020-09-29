import React, { useContext } from 'react'
import { Button } from "react-native-elements"
import { StackNavigationProp } from '@react-navigation/stack'

import AuthContext from '../context/auth'
import { AuthStackParamList, } from '../types/Navigation'

export const AccountScreen =  ({ navigation }: { 
    navigation: StackNavigationProp<AuthStackParamList> 
}) => {
    const { state, signout } = useContext(AuthContext)

    if (!state.token) {
        navigation.navigate('SignIn')
    }

    return (
        <Button title="Sign Out" onPress={signout} />
    )
}