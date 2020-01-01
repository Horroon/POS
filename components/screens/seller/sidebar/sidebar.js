import React from 'react';
import { AppRegistry, Image, StatusBar, ImageBackground } from 'react-native';
import { Container, Content, Text, List, ListItem, View,Icon } from 'native-base';
const routes = [ {name:'Become A Buyer',icon:'ios-appstore'},  {name:'Chat',icon:'ios-chatbubbles'},{name:'Profile',icon:'ios-person'},{name:'Logout',icon:'ios-log-out'} ];
export default class SideBar extends React.Component {
	render() {
		return (
			<Container>
				<Content>
					<ImageBackground
						source={{
							uri:
								'http://images.ctfassets.net/hrltx12pl8hq/nywabPmH5Y6W4geG8IYuk/be80cb1c50f7ec7357286b4001ecef93/shutterstock_524952388.jpg?fm=jpg&fl=progressive'
						}}
						style={{
							height: 250,
							alignSelf: 'stretch',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Image
							square
							style={{ height: 80, width: 80, borderRadius: 40 }}
							source={{
								uri:
									'https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
							}}
						/>
                        <Text style={{color:'white', marginTop:20, fontSize:20}}>Ali Akbar</Text>
					</ImageBackground>
					<List
						dataArray={routes}
						renderRow={(data) => {
							return (
								<ListItem button onPress={() => this.props.navigation.navigate(data)}>
									<View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Icon name={data.icon} />
										<Text style={{marginLeft: 20}}>{data.name}</Text>
									</View>
								</ListItem>
							);
						}}
					/>
				</Content>
			</Container>
		);
	}
}
