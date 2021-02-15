import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { baseStyles, primaryColor } from '../utils/commonStyles';
import { Button, Input, Image } from 'react-native-elements';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSignIn = () => {};

	const handleRegister = () => {};

	return (
		<KeyboardAvoidingView behavior='padding' style={baseStyles.container}>
			<Image source={require('../assets/splash.png')} style={styles.image} />
			<View style={styles.form}>
				<Input
					inputStyle={{
						padding: 10,
						borderRadius: 10,
					}}
					inputContainerStyle={{ borderColor: '#ddd', borderRadius: 10 }}
					value={email}
					onChangeText={(value) => setEmail(value)}
					placeholder='Email'
					autoFocus
				/>
				<Input
					inputStyle={{
						padding: 10,
						borderRadius: 10,
					}}
					inputContainerStyle={{ borderColor: '#ddd', borderRadius: 10 }}
					value={password}
					onChangeText={(value) => setPassword(value)}
					placeholder='Password'
					secureTextEntry
				/>
				<Button
					onPress={handleSignIn}
					title='Login'
					buttonStyle={{ backgroundColor: primaryColor }}
					containerStyle={styles.button}
				/>
				<Button
					onPress={handleRegister}
					title='Register'
					type='outline'
					containerStyle={styles.button}
				/>
			</View>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	text: {
		backgroundColor: 'transparent',
	},
	image: {
		width: 150,
		height: 150,
	},
	form: {
		width: '80%',
		textAlign: 'center',
	},
	button: {
		margin: 10,
	},
});

export default Login;
