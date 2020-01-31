import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {Container, Content, Form, Picker, Item, Icon, Input} from 'native-base';
import {Button} from 'react-native-elements';
import Header from '../Header/index';
import Logo from '../../../../assests/logo.png';
import LoaderModal from '../../commonscreen/loadingmodel/index';
import {showMessage} from 'react-native-flash-message';
import client from '../../apollo_config/config';
import gql from 'graphql-tag';

const ScreenHeight = Dimensions.get('screen').height;

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleMakes: [],
      selectedVehicleMake: {},
      vehicleCategories: [],
      selectedVehicleCategory: {},
      vehicleModels: [],
      selectedvehicleModel: {},
      vehicleModelYears: [],
      selectedVehicleModelYear: {},
      locations: [],
      selectedLocation: {},
      loader: false,
      modalVisible: false,
      name: '',
      address: '',
      price: '',
      createdSparepartId: '',
    };
  }

  componentDidMount() {
    this.GetVehicleMakeModelYearCategoryCity();
  }

  GetVehicleMakeModelYearCategoryCity = async () => {
    try {
      this.setState({modalVisible: true});
      const {data, errors, loading} = await client.query({
        query: gql`
          query {
            findParts {
              vehicleMakes {
                id
                name
              }
              vehicleModels {
                id
                name
              }
              vehicleModelYears {
                id
                name
              }
              vehicleCategories {
                id
                name
              }
              locations {
                id
                city
              }
            }
          }
        `,
        fetchPolicy: 'network-only',
      });

      if (data) {
        console.log('Data came: ', data.findParts);
        this.setState({
          locations: data.findParts.locations,
          vehicleMakes: data.findParts.vehicleMakes,
          vehicleCategories: data.findParts.vehicleCategories,
          vehicleModelYears: data.findParts.vehicleModelYears,
          vehicleModels: data.findParts.vehicleModels,
        });
        this.setState({modalVisible: false});
      }
    } catch (e) {
      console.log('eer ', e);
      if (e.graphQLErrors[0]) {
        this.setState({modalVisible: false});
        showMessage({
          message: e.graphQLErrors[0].message,
          type: 'danger',
        });
      }
      if (e.networkError) {
        this.setState({modalVisible: false});
        //console.log('error ', e.networkError);
        showMessage({
          message: 'Network Problem!',
          type: 'danger',
        });
      }
    }
  };

  //send new data on server
  sendNewSparepartOnServer = async () => {
    if (
      this.state.selectedVehicleCategory !== '' &&
      this.state.selectedVehicleMake !== '' &&
      this.state.selectedvehicleModel !== '' &&
      this.state.selectedVehicleModelYear !==""&&
      this.state.address !== '' &&
      this.state.name !== '' &&
      this.state.selectedLocation !== '' &&
      this.state.price !== ''
    ) {
      try {
        this.setState({modalVisible: true});
        const {data, errors} = await client.mutate({
          mutation: gql`
            mutation AddSparepart(
              $sparepartName: String!
              $vehicleMake: ID!
              $vehicleModel: ID!
              $vehicleModelYear: ID!
              $category: ID!
              $city: ID!
              $address: String!
              $price: String!
            ) {
              addSparepart(
                sparepartName: $sparepartName
                vehicleMake: $vehicleMake
                vehicleModel: $vehicleModel
                vehicleModelYear: $vehicleModelYear
                category: $category
                city: $city
                address: $address
                price: $price
              ) {
                id
                name
              }
            }
          `,
          variables: {
            sparepartName: this.state.name,
            vehicleMake: this.state.selectedVehicleMake,
            vehicleModel: this.state.selectedvehicleModel,
            vehicleModelYear: this.state.selectedVehicleModelYear,
            category: this.state.selectedVehicleCategory,
            city: this.state.selectedLocation,
            address: this.state.address,
            price: this.state.price,
          },
        });

        if (data) {
          this.setState({modalVisible: false});
          console.log('data came after creating sparepart', data);
          this.setState({createdSparepartId: data.addSparepart.id});
          this.props.navigation.navigate('AddImages', {
            itemId: data.addSparepart.id,
          });
        }
      } catch (e) {
        console.log('eer ', e);
        if (e.graphQLErrors[0]) {
          this.setState({modalVisible: false});
          showMessage({
            message: e.graphQLErrors[0].message,
            type: 'danger',
          });
        }
        if (e.networkError) {
          this.setState({modalVisible: false});
          //console.log('error ', e.networkError);
          showMessage({
            message: 'Network Problem!',
            type: 'danger',
          });
        }
      }
    } else {
      showMessage({
        message: 'Please add all information!',
        type: 'danger',
      });
    }
  }; //ended send new data on server method

  render() {
    console.log('state: ', this.state);
    return (
      <Container>
        <Header
          style={{backgroundColor: 'black', borderBottomWidth: 0}}
          iconName="ios-arrow-round-back"
          headerMethod={() => this.props.navigation.goBack()}
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
        <Content
          contentContainerStyle={{
            backgroundColor: 'lightgray',
            height: ScreenHeight + 30,
          }}>
          <View>
            <View
              style={{
                alignItems: 'center',
                height: 130,
                justifyContent: 'center',
              }}>
              <Image source={Logo} style={{height: 220, width: 180}} />
            </View>
            <Form
              style={{
                padding: 2,
                paddingTop: 5,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  marginTop: 20,
                  fontFamily: 'fantasy',
                }}>
                Add Information
              </Text>
              <View style={{padding: 5, marginTop: 10}}>
                <Item style={{borderBottomColor: 'red', marginLeft: 2}}>
                  <Input
                    placeholder="Sparepart Name"
                    placeholderTextColor={'gray'}
                    onChangeText={e => this.setState({name: e})}
                  />
                </Item>
                <Item style={{borderBottomColor: 'red', marginLeft: 2}}>
                  <Input
                    placeholder="Sparepart Address"
                    placeholderTextColor={'gray'}
                    onChangeText={e => this.setState({address: e})}
                  />
                </Item>

                <Item style={{borderBottomColor: 'red', marginLeft: 2}}>
                  <Input
                    placeholder="Sparepart Price"
                    placeholderTextColor={'gray'}
                    onChangeText={e => this.setState({price: e})}
                  />
                </Item>

                <Item picker style={{borderBottomColor: 'red'}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
                    style={{color: 'gray', fontSize: 14}}
                    placeholder="VEHICLE MAKE"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selectedVehicleMake}
                    onValueChange={e => {
                      this.setState({selectedVehicleMake: e});
                    }}>
                    <Picker.Item label={'Vehicle Make'} value={0} />
                    {this.state.vehicleMakes.map(make => {
                      return (
                        <Picker.Item
                          label={make.name}
                          value={make.id}
                          key={make.id}
                        />
                      );
                    })}
                  </Picker>
                </Item>
                <Item picker style={{borderBottomColor: 'red'}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
                    style={{color: 'gray'}}
                    placeholder="VEHICLE MODEL"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selectedvehicleModel}
                    onValueChange={e => {
                      this.setState({selectedvehicleModel: e});
                    }}>
                    <Picker.Item label="VEHICLE MODEL" value={0} />
                    {this.state.vehicleModels.map(Item => {
                      return (
                        <Picker.Item
                          key={Item.id}
                          label={Item.name}
                          value={Item.id}
                        />
                      );
                    })}
                  </Picker>
                </Item>
                <Item picker style={{borderBottomColor: 'red'}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
                    style={{color: 'gray'}}
                    placeholder="MODEL YEAR"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selectedVehicleModelYear}
                    onValueChange={e =>
                      this.setState({selectedVehicleModelYear: e})
                    }>
                    <Picker.Item label="Vehicle Model Year" value={0} />
                    {this.state.vehicleModelYears.map(year => {
                      return (
                        <Picker.Item
                          key={year.id}
                          label={year.name}
                          value={year.id}
                        />
                      );
                    })}
                  </Picker>
                </Item>
                <Item picker style={{borderBottomColor: 'red'}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
                    style={{color: 'gray'}}
                    placeholder="CATEGORY"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selectedVehicleCategory}
                    onValueChange={e =>
                      this.setState({selectedVehicleCategory: e})
                    }>
                    <Picker.Item label="Category" value={0} />
                    {this.state.vehicleCategories.map(Item => {
                      return (
                        <Picker.Item
                          key={Item.id}
                          label={Item.name}
                          value={Item.id}
                        />
                      );
                    })}
                  </Picker>
                </Item>

                <Item picker style={{borderBottomColor: 'red'}}>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" style={{color: 'red'}} />}
                    style={{color: 'gray'}}
                    placeholder="City"
                    placeholderStyle={{color: '#bfc6ea'}}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selectedLocation}
                    onValueChange={e => this.setState({selectedLocation: e})}>
                    <Picker.Item label="City" value={0} />
                    {this.state.locations.map(location => {
                      return (
                        <Picker.Item
                          key={location.id}
                          label={location.city}
                          value={location.id}
                        />
                      );
                    })}
                  </Picker>
                </Item>

                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    height: 50,
                    marginTop: 8,
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: 'red',
                  }}>
                  <Button
                    loading={this.state.loader}
                    title="Next"
                    buttonStyle={{backgroundColor: 'red'}}
                    onPress={() => {
                      //this.props.navigation.navigate('AddImages');
                      /*this.props.navigation.navigate('AddImages', {
                        item: {id: '23'},
                      }); */
                      this.sendNewSparepartOnServer();
                    }}
                  />
                </View>
              </View>
            </Form>
          </View>
          <LoaderModal
            state={this.state}
            setState={obj => {
              this.setState(obj);
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default AddProduct;
