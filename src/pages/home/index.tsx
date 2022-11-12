import React, { useEffect, useState } from "react";
import * as S from './styles';
import api from "../../services/api";
import { FlatList } from "react-native";
import { Card } from "../../components/Card";
import { PokemonType, Pokemon } from '../../components/Card';
import PokeballHeader from '../../assets/img/pokeball.png';
import { useNavigation } from "@react-navigation/native";


type Request = {
    id: number;
    types: PokemonType[]
}

export const Home = () => {

    const navigation = useNavigation()
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

    const HandleNavigation = (pokemonId: number) => {
        //@ts-ignore
        navigation.navigate('about', { pokemonId })
    }

    return (
        <S.Container>
            <FlatList
                data={pokemons}
                renderItem={({ item: Pokemon }) =>
                    <Card
                        data={Pokemon}
                        onPress={() => HandleNavigation(Pokemon.id)}
                    />
                }
                keyExtractor={item => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 20
                }}
                ListHeaderComponent={
                    <>
                        {/* <S.Header
                            source={PokeballHeader}
                        /> */}
                        <S.Title>
                            Pokédex
                        </S.Title>
                    </>
                }
            />
        </S.Container>
    )
}