import React from 'react';
import { Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

type RouteParams = {
    pokemonId: number
}

export const About = () => {

    const route = useRoute()

    const { pokemonId } = route.params as RouteParams

    return (
        <>
            <Text>
                {pokemonId}
            </Text>
        </>
    )
}