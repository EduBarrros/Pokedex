import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { useTheme } from 'styled-components';
import { useRoute, useNavigation } from '@react-navigation/native';

type RouteParams = {
    pokemonId: number
}

type Stat = {
    base_stat: number
    stat: {
        name: string
    }
}

type Ability = {
    ability: {
        name: string
    }
}

type PokemonType = {
    type: {
        name: string
    }
}

type PokemonProps = {
    id: number
    name: string
    stats: Stat[]
    abilities: Ability[]
    color: string
    types: PokemonType[]
}

export const About = () => {

    const route = useRoute()
    const { pokemonId } = route.params as RouteParams
    const { colors } = useTheme();

    const [pokemon, setPokemon] = useState({} as PokemonProps)

    const GetPokemonDetails = async () => {
        try {
            const response = await api.get(`/pokemon/${pokemonId}`)
            const { stats, abilities, id, name, types } = response.data

            const currentType = types[0].type.name
            //@ts-ignore
            const color = colors.backgroundCard[currentType];

            setPokemon({
                id: id,
                name: name,
                stats: stats,
                abilities: abilities,
                color: color,
                types: types
            })

        } catch (error) {
            console.log('Error', error)
        }
    }

    useEffect(() => {
        console.log('teste body', pokemon)
    }, [pokemon])

    useEffect(() => {
        GetPokemonDetails()
    }, [])

    return (
        <>
        </>
    )
}