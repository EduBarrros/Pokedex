import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Welcome } from '../pages/welcome';
import { Home } from '../pages/home';
import { About } from '../pages/about';

const Stack = createNativeStackNavigator();

export const AppRoutes = () => {
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name='welcome' component={Welcome}/>
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='about' component={About} />
        </Stack.Navigator>
    )
}