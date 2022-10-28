import React, { useEffect, useState } from "react";
import api from "../../services/api";
import * as S from './styles';

type PokemonTypes = {
    type: string;
}

type Pokemon = {
    name: string;
    url: string;
    id: number;
    types: PokemonTypes[]
}

type Request = {
    id: number;
    types: PokemonTypes[]
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
            
        </S.Container>
    )
}