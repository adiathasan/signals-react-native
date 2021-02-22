import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebase';
import { primaryColor } from '../utils/commonStyles';

interface Props {
	navigation: any;
}

export const DEFAULT_IMAGE_URL =
	'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/2a/2a9f5d453963399c2740cf1ece778dd655b37a0c_full.jpg';

const Register: React.FC<Props> = ({ navigation }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [photo, setPhoto] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({
			headerBackTitle: 'Login',
		});
	}, [navigation]);

	const register = async () => {
		try {
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);
			user?.updateProfile({
				displayName: name,
				photoURL: photo !== '' ? photo : DEFAULT_IMAGE_URL,
			});
		} catch (error) {
			console.log(alert(error.message));
		}
	};

	return (
		<KeyboardAvoidingView style={styles.container}>
			<StatusBar style='light' />
			<Text h4 style={styles.registerText}>
				Create a Signal Account
			</Text>
			<View style={styles.form}>
				<Input
					value={name}
					style={styles.input}
					placeholder='Full Name'
					autoFocus
					textContentType='name'
					onChangeText={(text) => setName(text)}
				/>
				<Input
					value={email}
					style={styles.input}
					placeholder='Email'
					textContentType='emailAddress'
					onChangeText={(text) => setEmail(text)}
				/>
				<Input
					value={password}
					style={styles.input}
					placeholder='Password'
					textContentType='password'
					onChangeText={(text) => setPassword(text)}
				/>
				<Input
					value={photo}
					style={styles.input}
					placeholder='Profile picture url '
					textContentType='URL'
					onChangeText={(text) => setPhoto(text)}
					onSubmitEditing={register}
				/>
			</View>
			<Button
				containerStyle={styles.button}
				raised
				onPress={register}
				title='Register'
			/>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	registerText: {
		marginBottom: 50,
	},
	form: {
		width: 260,
		textAlign: 'center',
	},
	input: {},
	button: {
		width: 250,
		marginTop: 10,
	},
});

export default Register;
