import styled, { css } from 'styled-components/native'

type TypeProps = {
    type: string
}

export const ScrollContainer = styled.ScrollView`

`

export const Header = styled.View<TypeProps>`
    ${({ theme, type }) => css`
        background-color: ${
        //@ts-ignore
        theme.colors.backgroundCard[type]
        };
        height: 340px;
        padding: 20px;
        flex-direction: row;
        align-items: center;
        position: relative;
    `}
`

export const BackButton = styled.TouchableOpacity`
    position: absolute;
    top: 70px;
    left: 40px;
`

export const ContentImage = styled.View`

`

export const CircleImage = styled.Image`

`

export const PokemonImage = styled.Image`

`