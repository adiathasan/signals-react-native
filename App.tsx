import React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import { LogBox } from 'react-native';

import Home from './screens/Home';
import Login from './screens/Login';
import { primaryColor } from './utils/commonStyles';
import Register from './screens/Register';
import AddChat from './screens/AddChat';
import Chat from './screens/Chat';

LogBox.ignoreLogs(['Setting a timer']);

const stack = createStackNavigator();

const theme = {
	colors: {
		primary: primaryColor,
	},
};

export default function App() {
	return (
		<ThemeProvider theme={theme}>
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
					<stack.Screen name='Register' component={Register} />
					<stack.Screen name='Home' component={Home} />
					<stack.Screen name='AddChat' component={AddChat} />
					<stack.Screen name='Chat' component={Chat} />
				</stack.Navigator>
				<StatusBar style='light' />
			</NavigationContainer>
		</ThemeProvider>
	);
}
