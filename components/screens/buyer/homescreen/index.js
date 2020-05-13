import React from 'react';
import {
  View,
  Text,
  Container,
  Content,
  Button as NativeBaseButton,
} from 'native-base';
import {FlatList, SafeAreaView} from 'react-native';
import Header from '../header/index';
import FindPartsForm from './findpartspart';
import buyerhomescreenbackground from '../../../../assests/buyerhomescreenbackground.jpg';
import {ImageBackground, Dimensions, AsyncStorage} from 'react-native';
import client from '../../apollo_config/config';
import gql from 'graphql-tag';
import Drawer from '../../commonscreen/drawer/index';
import BuyerSideBar from '../../commonscreen/sidebars/buyersidebar';
import SingleItem from './singleItem';
import GetLocation from 'react-native-get-location';
import GEO_CODE from 'react-native-geocoder';
import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Footer from './footer';
import LoginModal from '../../commonscreen/loginModal/index';

GEO_CODE.fallbackToGoogle('AIzaSyBflho0fOH_r3KR2uE4ubqCpc_6nHOTuHk');

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
      currentCitySpareparts: [
        {
          id: 0,
          name: '',
          price: '',
          pictures: [{url: ''}],
          location: {city: ''},
        },
      ],
    };
  }

  //get location
  GetLocationUserLocation = async () => {
    try {
      let resp = await GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 1000 * 60,
      });

      let address = await GEO_CODE.geocodePosition({
        lat: resp.latitude,
        lng: resp.longitude,
      });
      this.setState({currentCity: address[0].subAdminArea});
      if (address) {
        this.getCurrentCity_Spareparts(address[0].subAdminArea);
      }
    } catch (e) {
      showMessage(e.message);
    }
  };

  componentDidMount() {
    this.GetLocationUserLocation();
  }

  getCurrentCity_Spareparts = async city => {
    try {
      const {data, errors, loading} = await client.query({
        query: gql`
          query findAllSparepartsForUserCurrentLocation($city: String!) {
            findAllSparepartsForUserCurrentLocation(city: $city) {
              id
              name
              price
              pictures {
                url
              }
              isAvailable
              location {
                id
                city
                country
              }
              address
              updatedAt
            }
          }
        `,
        variables: {
          city: city,
        },
        fetchPolicy: 'network-only',
      });
      if (data) {
        this.setState({
          currentCitySpareparts: data.findAllSparepartsForUserCurrentLocation,
        });
      }
    } catch (e) {
      if (e.graphQLErrors[0]) {
        showMessage({
          message: e.graphQLErrors[0].message,
          type: 'danger',
        });
      }
      if (e.networkError) {
        console.log('error ', e.networkError);
        showMessage({
          message: 'Network Problem!',
          type: 'danger',
        });
      }
    }
  };

  selectedItemIdUpdateMethod = item => {
    this.props.selectedItemIdUpdate(item.id);
    this.props.navigation.navigate('BuyerItemDetail', {
      item: item,
    });
  };

  render() {
    console.log('store login Data  ', this.props.store);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('lgn_email');
    AsyncStorage.removeItem('lgn_Id');
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
            {this.state.currentCitySpareparts.length > 0 &&
            this.state.currentCitySpareparts[0].name ? (
              <SafeAreaView
                style={{
                  paddingTop: 10,
                  display:
                    this.state.currentCitySpareparts.length > 0
                      ? 'flex'
                      : 'none',
                }}>
                <View>
                  <Text style={{fontSize: 14, padding: 5, fontWeight: 'bold'}}>
                    {' '}
                    Spareparts In{' '}
                    {this.state.currentCitySpareparts[0].location.city} City
                  </Text>
                </View>
                <FlatList
                  numColumns={2}
                  data={this.state.currentCitySpareparts}
                  renderItem={item => (
                    <SingleItem
                      width={'44.5%'}
                      height={200}
                      item={item.item}
                      selectedItemIdUpdateMethod={
                        this.selectedItemIdUpdateMethod
                      }
                    />
                  )}
                  extraData
                  horizontal={false}
                  style={{width: '100%'}}
                />
              </SafeAreaView>
            ) : (
              <Text></Text>
            )}
            <LoginModal {...this.props} />
          </View>
        </Content>

        <Footer {...this.props} />
      </Container>
    );
  }
}
function mapStateToProps(state) {
  return {store: state};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectedItemIdUpdate: input => ({type: 'selectedItemId', payload: input}),
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer(HomeScreen, BuyerSideBar));
