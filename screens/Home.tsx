import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { baseStyles } from '../utils/commonStyles';

const Home: React.FC = () => {
	return (
		<View style={baseStyles.container}>
			<Text style={styles.text}>Home Screen</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	text: {
		textAlign: 'center',
	},
});

export default Home;
