import React from 'react';
import {
  View,
  Text,
  Container,
  Content,
  Button as NativeBaseButton,
  Footer,
  Icon,
  FooterTab,
} from 'native-base';
import {FlatList, SafeAreaView} from 'react-native';
import Header from '../header/index';
import FindPartsForm from './findpartspart';
import buyerhomescreenbackground from '../../../../assests/buyerhomescreenbackground.jpg';
import {ImageBackground, Dimensions, AsyncStorage} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import client from '../../apollo_config/config';
import gql from 'graphql-tag';
import Drawer from '../../commonscreen/drawer/index';
import BuyerSideBar from '../../commonscreen/sidebars/buyersidebar';
import SingleItem from './singleItem';
import GetLocation from 'react-native-get-location'

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

  componentDidMount() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log(location);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }
  render() {
    console.log('selected Vehicle ', this.state.selectedVehicleMake);
    return (
      <Container>
        <Header
          style={{backgroundColor: 'black', borderBottomWidth: 0}}
          iconName="menu"
          headerMethod={() => this.props.openControlPanel()}
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
          <View style={{width: '100%'}}>
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                paddingTop: 10,
              }}>
              <FindPartsForm navigation={this.props} />
            </View>
            <SafeAreaView style={{paddingTop: 10}}>
              <View>
                <Text style={{fontSize: 14, padding: 5}}> Spareparts</Text>
              </View>
              <FlatList
                numColumns={2}
                data={[
                  {
                    id: 1,
                    pictures: [
                      {url: require('../../../../assests/sparepart2.jpg')},
                    ],
                    name: 'Sparepart',
                    address: '',
                    price: '200PKR',
                    location: {city: 'ISLBD', country: 'PK'},
                  },
                  {
                    id: 1,
                    pictures: [
                      {url: require('../../../../assests/sparepart2.jpg')},
                    ],
                    name: 'Sparepart',
                    address: '',
                    price: '200PKR',
                    location: {city: 'ISLBD', country: 'PK'},
                  },
                  {
                    id: 1,
                    pictures: [
                      {url: require('../../../../assests/sparepart2.jpg')},
                    ],
                    name: 'Sparepart',
                    address: '',
                    price: '200PKR',
                    location: {city: 'ISLBD', country: 'PK'},
                  },
                  {
                    id: 1,
                    pictures: [
                      {url: require('../../../../assests/sparepart2.jpg')},
                    ],
                    name: 'Sparepart',
                    address: '',
                    price: '200PKR',
                    location: {city: 'ISLBD', country: 'PK'},
                  },
                  {
                    id: 1,
                    pictures: [
                      {url: require('../../../../assests/sparepart2.jpg')},
                    ],
                    name: 'Sparepart',
                    address: '',
                    price: '200PKR',
                    location: {city: 'ISLBD', country: 'PK'},
                  },
                ]}
                renderItem={item => (
                  <SingleItem width={'44.5%'} height={200} item={item.item} />
                )}
                extraData
                horizontal={false}
                style={{width: '100%'}}
              />
            </SafeAreaView>
          </View>
        </Content>

        <Footer style={{backgroundColor: 'black'}}>
          <FooterTab style={{backgroundColor: 'black'}}>
            <NativeBaseButton>
              <Icon name="ios-folder" />
              <Text>Explore</Text>
            </NativeBaseButton>
            <NativeBaseButton onPress={this.sendMessage}>
              <Icon name="ios-camera" />
              <Text>Sell</Text>
            </NativeBaseButton>
            <NativeBaseButton onPress={this.makeCall}>
              <Icon name="ios-document" />
              <Text>My Adds</Text>
            </NativeBaseButton>

            <NativeBaseButton onPress={this.makeCall}>
              <Icon name="ios-person" />
              <Text>Account</Text>
            </NativeBaseButton>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

export default Drawer(HomeScreen, BuyerSideBar);
