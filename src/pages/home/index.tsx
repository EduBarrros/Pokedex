import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Card } from "../../components/Card";
import api from "../../services/api";
import * as S from './styles';
import { PokemonType, Pokemon } from '../../components/Card'
import { FadeAnimation } from "../../components/FadeAnimation";

type Request = {
    id: number;
    types: PokemonType[]
}

export const Home = () => {

    const [pokemons, setPokemons] = useState<Pokemon[]>([])

    useEffect(() => {
        getAllPokemons()
    }, [])

    const getAllPokemons = async () => {
        const response = await api.get('/pokemon')
        const { results } = response.data

        const payloadPokemon = await Promise.all(
            results.map(async (pokemon: Pokemon) => {
                const { id, types } = await getMoreInfo(pokemon.url)

                return {
                    name: pokemon.name,
                    id,
                    types
                }
            })
        )

        setPokemons(payloadPokemon)
    }

    const getMoreInfo = async (url: string): Promise<Request> => {
        const response = await api.get(url)
        const { id, types } = response.data

        return {
            id,
            types
        }
    }


    return (
        <S.Container>
            <FlatList
                data={pokemons}
                renderItem={({ item: Pokemon }) =>
                    <FadeAnimation>
                        <Card data={Pokemon} />
                    </FadeAnimation>}
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
            />
        </S.Container>
    )
}