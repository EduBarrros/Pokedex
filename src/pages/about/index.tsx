import React, { useEffect, useState } from 'react';
import * as S from './styles';
import { Alert } from 'react-native';
import api from '../../services/api';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import Circle from '../../assets/img/circle.png'
import Dots from '../../assets/img/dots.png'
import { PokemonType } from '../../components/Card/styles';
import { FadeAnimation } from '../../components/FadeAnimation'


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
    const navigate = useNavigation();

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

    const HandleGoBack = () => {
        navigate.goBack()
    }

    return (
        load
            ?
            <S.LoadingContainer>
                <S.LoadingText>
                    Carregando...
                </S.LoadingText>
            </S.LoadingContainer>
            :
            <S.ScrollContainer>
                <S.Header type={pokemon?.types[0]?.type?.name}>
                    <S.BackButton onPress={() => HandleGoBack()}>
                        <Feather name='chevron-left' size={24} color='#fff' />
                    </S.BackButton>
                    <S.ContentImage>
                        <S.CircleImage source={Circle} />
                        <FadeAnimation>
                            <S.PokemonImage source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png` }} />
                        </FadeAnimation>
                    </S.ContentImage>

                    <S.Content>
                        <S.PokemonId>
                            #{pokemon.id}
                        </S.PokemonId>
                        <S.PokemonName>
                            {pokemon.name}
                        </S.PokemonName>
                        <S.PokemonTypeContainer>
                            {pokemon.types.map(({ type }) =>
                                <S.PokemonType type={type.name} key={type.name}>
                                    <S.PokemonTypeText>
                                        {type.name}
                                    </S.PokemonTypeText>
                                </S.PokemonType>
                            )}
                        </S.PokemonTypeContainer>
                        <S.DotsImage source={Dots}/>
                    </S.Content>
                </S.Header>
                <S.Container>
                    <S.Title type={pokemon.types[0].type.name}>
                        Base Stats
                    </S.Title>
                </S.Container>
            </S.ScrollContainer>
    )
}