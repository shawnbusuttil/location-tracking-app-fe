import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

type Props = {
    route: string
    content: string
}

export const NavLink = ({ route, content }: Props) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate(route)}>
            <Text style={styles.linkStyles}>{content}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    linkStyles: {
        color: 'blue',
        marginVertical: 10
    },
})