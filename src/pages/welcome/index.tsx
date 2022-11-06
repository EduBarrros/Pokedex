import React from "react";
import * as S from './styles';
import pokemon from './pokemon.json';
import { Button } from "../../components/Button";
import AnimatedLottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export const Welcome = () => {

    const navigation = useNavigation();

    const HandleNavigation = () => {
        navigation.navigate('home')
    }

    return (
        <S.Container>
            <S.Content>
                <S.WrapperAnimation>
                    <S.WrapperImage>
                        <AnimatedLottieView
                            autoPlay
                            source={pokemon}
                            loop
                            style={{ width: 200 }}
                        />
                    </S.WrapperImage>
                </S.WrapperAnimation>
                <S.Title>
                    Bem Vindo
                </S.Title>
                <S.SubTitle>
                    Encontre todos os pokémons em um só lugar.
                </S.SubTitle>
            </S.Content>
            <S.Footer>
                <Button 
                    title="Iniciar"
                    onPress={() => HandleNavigation()}
                />
            </S.Footer>
        </S.Container>
    )
}