import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import { auth, db } from '../firebase';
import CustomItemList from '../components/CustomItemList';

interface Props {
	navigation: any;
}

export interface Chat {
	id: string;
	chatName: string;
}

const Home: React.FC<Props> = ({ navigation }) => {
	const [chats, setChats] = useState<Chat[] | null>(null);

	useEffect(() => {
		const unsub = db.collection('chats').onSnapshot((snap) => {
			setChats(
				snap.docs.map((doc) => {
					return {
						id: doc.id,
						chatName: doc.data().chatName,
					};
				})
			);
		});

		return unsub;
	}, []);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: 'Chats',
			headerTintColor: 'white',
			headerRight: () => (
				<View style={styles.avatarHeader}>
					<TouchableOpacity onPress={() => navigation.navigate('AddChat')}>
						<MaterialIcons
							style={styles.icon}
							name='playlist-add'
							size={24}
							color='white'
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Avatar
							rounded
							source={{
								uri: auth.currentUser?.photoURL as string,
							}}
						/>
					</TouchableOpacity>
				</View>
			),
			headerLeft: () => (
				<View style={styles.btnHeader}>
					<TouchableOpacity>
						<Button
							onPress={handleSignOut}
							buttonStyle={styles.btnHeaderMain}
							title='Signout'
						/>
					</TouchableOpacity>
				</View>
			),
		});
	}, [navigation]);

	const handleSignOut = async () => {
		try {
			await auth.signOut();
			navigation.replace('Login');
		} catch (error) {
			alert(error.message);
		}
	};

	const enterChat = ({ id, chatName }: Chat) => {
		navigation.navigate('Chat', {
			id,
			chatName,
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ height: '100%' }}>
				{chats?.map(({ id, chatName }) => (
					<CustomItemList
						key={id}
						id={id}
						chatName={chatName}
						enterChat={enterChat}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	text: {
		textAlign: 'center',
	},
	avatarHeader: {
		width: 80,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginRight: 12,
	},
	btnHeader: {
		marginLeft: 12,
	},
	btnHeaderMain: {
		backgroundColor: 'transparent',
		borderColor: 'white',
		borderWidth: 1,
		paddingVertical: 3,
	},
	icon: {
		padding: 4,
		borderWidth: 1,
		borderColor: 'white',
		borderRadius: 10,
	},
});

export default Home;
