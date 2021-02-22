import React, { useLayoutEffect, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import { primaryColor } from '../utils/commonStyles';
import { db } from '../firebase';

interface Props {
	navigation: any;
}

const AddChat: React.FC<Props> = ({ navigation }) => {
	const [chat, setChat] = useState('');

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Add a new chat !',
		});
	}, []);

	const handleCreateChat = async () => {
		try {
			await db.collection('chats').add({
				chatName: chat,
			});

			navigation.goBack();
		} catch (error) {
			alert(error.message);
		}
	};

	return (
		<KeyboardAvoidingView style={{ alignItems: 'center' }}>
			<Input
				style={styles.input}
				value={chat}
				onChangeText={(value) => setChat(value)}
				leftIcon={
					<Ionicons
						name='ios-chatbubble-ellipses'
						size={24}
						color={primaryColor}
					/>
				}
				placeholder='Enter a chat name'
			/>
			<Button
				onPress={handleCreateChat}
				title='Create new chat'
				buttonStyle={styles.btn}
			/>
		</KeyboardAvoidingView>
	);
};

export default AddChat;

const styles = StyleSheet.create({
	input: {
		width: 400,
		textAlign: 'center',
	},
	btn: {
		backgroundColor: primaryColor,
		width: 300,
	},
});
