import React, { useLayoutEffect, useState, useRef } from 'react';
import { Keyboard, KeyboardAvoidingView, StyleSheet, View } from 'react-native';

import {
	ScrollView,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import { auth, db, timeStamp } from '../firebase';
import { Chat as PropChat } from './Home';
import { primaryColor } from '../utils/commonStyles';
import { Avatar, Text } from 'react-native-elements';

interface Props {
	navigation: any;
	route: {
		params: PropChat;
	};
}

export interface MessageObj {
	timeStamp: string;
	message: string;
	displayName: string;
	email: string;
	photoUrl: string;
}

export interface Message {
	id: string;
	data: MessageObj;
}

const Chat: React.FC<Props> = ({
	navigation,
	route: {
		params: { chatName, id },
	},
}) => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<Message[] | null>(null);

	const scrollRef = useRef<ScrollView>(null);

	const handleSendMessage = () => {
		Keyboard.dismiss();

		if (message !== '') {
			db.collection('chats')
				.doc(id)
				.collection('messages')
				.add({
					timeStamp: timeStamp(),
					message,
					displayName: auth.currentUser?.displayName,
					email: auth.currentUser?.email,
					photoUrl: auth.currentUser?.photoURL,
				})
				.then(() => {
					setMessage('');
				});
		}
	};

	useLayoutEffect(() => {
		const unsub = db
			.collection('chats')
			.doc(id)
			.collection('messages')
			.orderBy('timeStamp', 'asc')
			.onSnapshot((snap) => {
				setMessages(
					snap.docs.map((doc) => {
						return {
							id: doc.id,
							data: doc.data() as MessageObj,
						};
					})
				);
			});

		return unsub;
	}, [chatName, id]);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: ` #${chatName}`,
		});
	}, [navigation]);

	return (
		<View style={styles.container}>
			<KeyboardAvoidingView style={{ flex: 1 }}>
				<ScrollView
					ref={scrollRef}
					onContentSizeChange={() =>
						scrollRef.current?.scrollToEnd({ animated: true })
					}
					style={styles.scrollContainer}
				>
					{messages?.map(({ id, data }) =>
						data.email === auth.currentUser?.email ? (
							<View key={id} style={styles.sender}>
								<Avatar
									size={20}
									containerStyle={styles.avatarSender}
									rounded
									source={{
										uri: data.photoUrl,
									}}
								/>
								<Text style={styles.sentText}>{data.message}</Text>
								<Text style={styles.displayNameSender}>{data.displayName}</Text>
							</View>
						) : (
							<View key={id} style={styles.reciver}>
								<Avatar
									size={20}
									rounded
									source={{
										uri: data.photoUrl,
									}}
									containerStyle={styles.avatarReciver}
								/>
								<Text style={styles.recivedText}>{data.message}</Text>
							</View>
						)
					)}
				</ScrollView>

				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.footer}>
						<TextInput
							value={message}
							style={styles.input}
							placeholder={`Message to #${chatName}`}
							onChangeText={(value) => setMessage(value)}
							onSubmitEditing={handleSendMessage}
						/>
						<TouchableOpacity onPress={handleSendMessage}>
							<Ionicons name='send' size={24} color={primaryColor} />
						</TouchableOpacity>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</View>
	);
};

export default Chat;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
	scrollContainer: {
		flex: 1,
	},
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		padding: 15,
	},
	input: {
		bottom: 0,
		height: 40,
		flex: 1,
		borderColor: 'transparent',
		marginRight: 15,
		backgroundColor: '#ecf3f8',
		borderRadius: 30,
		padding: 5,
		textAlign: 'center',
		color: primaryColor,
	},
	recivedText: {
		color: 'white',
	},
	sentText: {
		color: '#032b5f',
	},
	reciver: {
		alignSelf: 'flex-start',
		borderRadius: 20,
		padding: 15,
		backgroundColor: '#032b5f',
		marginVertical: 10,
		position: 'relative',
		marginHorizontal: 10,
	},
	sender: {
		alignSelf: 'flex-end',
		borderRadius: 20,
		padding: 15,
		backgroundColor: '#eeebeb',
		marginVertical: 10,
		position: 'relative',
		marginHorizontal: 10,
	},
	avatarReciver: {
		position: 'absolute',
		bottom: -4,
		left: 0,
	},
	avatarSender: {
		position: 'absolute',
		bottom: -4,
		right: 0,
	},
	displayNameReciver: {
		color: 'white',
		marginVertical: 10,
		fontSize: 10,
	},
});
