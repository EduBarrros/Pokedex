import React from 'react';
import * as S from './styles';
import Dots from '../../assets/img/dots.png';
import { TouchableOpacityProps } from 'react-native';
import Pokeball from '../../assets/img/pokeballCard.png';
import { FadeAnimation } from "../../components/FadeAnimation";

export type PokemonType = {
    type: {
        name: string
    }
}

export type Pokemon = {
    name: string;
    url: string;
    id: number;
    types: PokemonType[]
}

type Props = {
    data: Pokemon
} & TouchableOpacityProps

export const Card = ({ data, ...rest }: Props) => {
    return (
        <S.Container type={data.types[0].type.name} {...rest}>
            <S.LeftSide>
                <S.PokemonId>#{data.id}</S.PokemonId>
                <S.PokemonName>{data.name}</S.PokemonName>
                <S.ImageCardDetailLeftSide source={Dots} />
                <S.PokemonContentType>
                    {
                        data.types.map(pokemonType =>
                            <S.PokemonType type={pokemonType.type.name} key={pokemonType.type.name}>
                                <S.PokemonTypeText>
                                    {pokemonType.type.name}
                                </S.PokemonTypeText>
                            </S.PokemonType>
                        )
                    }
                </S.PokemonContentType>
            </S.LeftSide>
            <S.RightSide>
                <S.PokeballDetail source={Pokeball} />
                <FadeAnimation>
                    <S.PokemonImage source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png` }} />
                </FadeAnimation>
            </S.RightSide>

        </S.Container>
    )
}