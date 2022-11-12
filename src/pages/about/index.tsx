import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { Alert } from 'react-native';
import api from '../../services/api';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import Circle from '../../assets/img/circle.png'
import { PokemonType } from '../../components/Card/styles';


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

    const [load, setLoad] = useState(true)

    const GetPokemonDetails = async () => {
        try {
            const response = await api.get(`/pokemon/${pokemonId}`)
            const { stats, abilities, id, name, types } = response.data

            const currentType = types[0]?.type?.name
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
            Alert.alert('Ops...', 'Ocorreu um erro ao buscar os dados.')
        } finally {
            setLoad(false)
        }
    }

    useEffect(() => {
        GetPokemonDetails()
    }, [])

    return (
        <S.ScrollContainer>
            <S.Header type={!load ? pokemon?.types[0]?.type?.name : '#000'}>
                <S.BackButton>
                    <Feather name='chevron-left' size={24} color='#fff'/>    
                </S.BackButton>
                <S.ContentImage>
                    <S.CircleImage source={Circle}/>
                    <S.PokemonImage source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png` }}/>
                </S.ContentImage>
            </S.Header>
        </S.ScrollContainer>
    )
}