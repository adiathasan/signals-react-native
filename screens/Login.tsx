import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { baseStyles } from '../utils/commonStyles';
import { Button, Input, Image } from 'react-native-elements';
import { auth } from '../firebase';

interface Props {
	navigation: any;
}

const Login: React.FC<Props> = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		const unsub = auth.onAuthStateChanged((user) => {
			if (user) {
				navigation.replace('Home');
			}
		});

		return unsub;
	}, [auth]);

	const handleSignIn = async () => {
		try {
			await auth.signInWithEmailAndPassword(email, password);
		} catch (error) {
			alert(error.message);
		}
	};

	const handleRegister = () => {
		navigation.navigate('Register');
	};

	return (
		<KeyboardAvoidingView behavior='padding' style={baseStyles.container}>
			<Image source={require('../assets/splash.png')} style={styles.image} />
			<View style={styles.form}>
				<Input
					inputStyle={styles.inputStyle}
					value={email}
					onChangeText={(value) => setEmail(value)}
					placeholder='Email'
					autoFocus
				/>
				<Input
					inputStyle={styles.inputStyle}
					value={password}
					onChangeText={(value) => setPassword(value)}
					placeholder='Password'
					secureTextEntry
				/>
				<Button
					onPress={handleSignIn}
					title='Login'
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
		textAlign: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: 260,
	},
	inputStyle: {
		width: 260,
	},

	button: {
		marginTop: 10,
		width: 250,
	},
});

export default Login;
