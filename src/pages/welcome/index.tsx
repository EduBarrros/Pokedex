import React from "react";
import * as S from './styles';
import pokemon from './pokemon.json';
import AnimatedLottieView from "lottie-react-native";

export const Welcome = () => {
    return (
        <S.Container>
            <S.Content>
                <AnimatedLottieView
                    autoPlay
                    source={pokemon}
                    loop
                />
            </S.Content>
            <S.Footer>
                <S.Title>
                    Bem Vindo
                </S.Title>
                <S.SubTitle>
                    Encontre todos os pokémons em um só lugar.
                </S.SubTitle>
            </S.Footer>
        </S.Container>
    )
}