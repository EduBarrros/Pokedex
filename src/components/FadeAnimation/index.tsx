import React, { useEffect } from "react";
import { useWindowDimensions, ViewProps } from "react-native";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import * as S from './styles'

type FadeAnimationProps = {
    children: React.ReactNode
} & ViewProps

export const FadeAnimation = ({ children, ...rest }: FadeAnimationProps) => {

    const { width: displayWidth } = useWindowDimensions();
    const cardOpacity = useSharedValue(0)
    const cardOffSet = useSharedValue(0.25 * displayWidth)

    useEffect(() => {
        cardOpacity.value = withTiming(1, { duration: 1000 })
        cardOffSet.value = withTiming(0, { duration: 1000 })
    }, [])

    const animatedStyle = useAnimatedStyle(() => {
        'worklet'
        return {
            opacity: cardOpacity.value,
            transform: [
                {
                    translateX: cardOffSet.value
                }
            ]
        }
    })

   
    return (
        //@ts-ignore
        <S.AnimationContainer {...rest} style={animatedStyle}>
            {children}
        </S.AnimationContainer>
    )
}