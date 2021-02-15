import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Login from './screens/Login';
import { primaryColor } from './utils/commonStyles';

const stack = createStackNavigator();

export default function App() {
	return (
		<NavigationContainer
			theme={{
				...DefaultTheme,
				colors: {
					...DefaultTheme.colors,
					primary: primaryColor,
				},
			}}
		>
			<stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: primaryColor,
					},
					headerTitleStyle: {
						color: 'white',
						alignSelf: 'center',
					},
					headerTintColor: 'white',
				}}
			>
				<stack.Screen name='Login' component={Login} />
				<stack.Screen name='Home' component={Home} />
			</stack.Navigator>
			<StatusBar style='light' />
		</NavigationContainer>
	);
}
