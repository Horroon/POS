import React from 'react';
import {View, Text, Container, Content, Button} from 'native-base';
import Header from '../header/index';
import FindPartsForm from './findpartspart';
import buyerhomescreenbackground from '../../../../assests/buyerhomescreenbackground.jpg';
import {ImageBackground, Dimensions, AsyncStorage} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import client from '../../apollo_config/config';
import gql from 'graphql-tag';

const ScreenHeight = Dimensions.get('screen').height;

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      vehiclemakes: [],
      vehicleModelYears: [],
      vehicleCategories: [],
      vehicleModels: [],
      selectedVehicleMake: 0,
    };
  }

  render() {
    console.log('selected Vehicle ', this.state.selectedVehicleMake);
    return (
      <Container>
        <Header
          style={{backgroundColor: 'black', borderBottomWidth: 0}}
          iconName="menu"
          headerMethod={() => alert('o wao')}
          iconStyle={{}}
          navigation={this.props.navigation}>
          <Text
            style={{
              fontFamily: 'fantasy',
              fontSize: 14,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: 'white',
            }}>
            PARTS
          </Text>
          <Text
            style={{
              fontFamily: 'fantasy',
              fontSize: 14,
              fontStyle: 'italic',
              color: 'red',
              fontWeight: 'bold',
            }}>
            WHEEL
          </Text>
          <Text
            style={{
              fontFamily: 'fantasy',
              fontSize: 14,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: 'white',
            }}>
            .COM
          </Text>
        </Header>
        <Content>
          <ImageBackground
            source={buyerhomescreenbackground}
            style={{height: ScreenHeight - 80, width: '100%'}}>
            {/*  <View style={{width: '95%', alignSelf: 'center'}}>
            <SearchBar />
          </View> */}
            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
              <FindPartsForm
                navigation={this.props}
              />
            </View>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
