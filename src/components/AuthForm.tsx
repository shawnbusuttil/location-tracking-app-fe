import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Button, Input } from 'react-native-elements'

import { AuthRequest } from '../types/Auth'

type Props = {
    title: string
    action: 'Sign In' | 'Sign Up'
    onSubmit: ({ email, password}: AuthRequest) => void
    footer?: React.ReactNode
    errorMessage?: string
}

export const AuthForm = ({ 
    title, 
    action, 
    onSubmit,
    footer,
    errorMessage
}: Props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    return (
        <>
            <Text style={styles.headingStyles}>{title}</Text>
            <Input 
                label='Email' 
                value={email} 
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setEmail} 
            />
            <Input label='Password' 
                secureTextEntry
                value={password} 
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={setPassword} 
            />
            {errorMessage ? <Text style={styles.errorStyles}>{errorMessage}</Text> : null}
            <Button title={action} onPress={() => onSubmit({ email, password })} />
            {footer}
        </>
    )
}

const styles = StyleSheet.create({
    headingStyles: {
        fontSize: 22,
        marginBottom: 30,
        textAlign: "center"
    },
    linkStyles: {
        color: 'blue',
        marginVertical: 10
    },
    errorStyles: {
        color: "red",
        fontSize: 16,
        marginVertical: 10
    }
})