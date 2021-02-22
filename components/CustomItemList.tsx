import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { db } from '../firebase';
import { Message, MessageObj } from '../screens/Chat';

import { Chat } from '../screens/Home';
import { DEFAULT_IMAGE_URL } from '../screens/Register';

interface Props {
	id: string;
	chatName: string;
	enterChat: ({ id, chatName }: Chat) => void;
}

const CustomItemList: React.FC<Props> = ({ id, chatName, enterChat }) => {
	const [messages, setMessages] = useState<Message[] | null>(null);

	useLayoutEffect(() => {
		const unsub = db
			.collection('chats')
			.doc(id)
			.collection('messages')
			.orderBy('timeStamp', 'desc')
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

	return (
		<TouchableOpacity onPress={() => enterChat({ id, chatName })}>
			<ListItem bottomDivider style={styles.container}>
				<Avatar
					rounded
					source={{
						uri: messages ? messages[0]?.data.photoUrl : DEFAULT_IMAGE_URL,
					}}
				/>
				<ListItem.Content>
					<ListItem.Title style={{ textTransform: 'capitalize' }}>
						#{chatName}
					</ListItem.Title>
					<ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
						{messages && messages[0]?.data.message}
					</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		</TouchableOpacity>
	);
};

export default CustomItemList;

const styles = StyleSheet.create({
	container: {
		// width: '100%',
	},
});
