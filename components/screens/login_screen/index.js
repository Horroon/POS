import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class LoginComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	//render screen
	render() {
		return (
			<View>
				<Text>Welcome to Login Screen</Text>
			</View>
		);
	}
}
