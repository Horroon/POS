import React from 'react';
import {View, Badge, Text, Container, Content, Icon} from 'native-base';
import {Button} from 'react-native-elements';
import {Image, Platform, Linking} from 'react-native';
import Header from '../header/index';
import spareImg1 from '../../../../assests/spr1.jpg';
import spareImg2 from '../../../../assests/sparepart2.jpg';
import {Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {showMessage} from 'react-native-flash-message';
import client from '../../apollo_config/config';
import loader_gif from '../../../../assests/placeholder-loading-demo-3.gif';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [
        {id: 1, picture: spareImg1},
        {id: 2, picture: spareImg2},
      ],
      sparePart: {
        id: 0,
        name: '',
        price: '',
        vehicleModelYear: [],
        shops: [{id: 0, address: ''}],
        pictures: [],
      },
      imgIndex: 0,
      loader: true,
      btnLoader: false,
    };
  }

  componentDidMount() {
    this.getSingleSparePart();
  }

  getSingleSparePart = async () => {
    try {
      const {data, loading} = await client.query({
        query: gql`
          query SingleSparePart($id: ID!) {
            singleSparepart(id: $id) {
              id
              name
              price
              vehicleMake {
                name
              }
              vehicleModel {
                id
                name
              }
              vehicleCategory {
                name
              }
              vehicleModelYear {
                id
                name
              }
              shops {
                id
                name
                address
                location {
                  id
                  city
                  country
                }
              }
              pictures
            }
          }
        `,
        variables: {
          id: this.props.store.selectedItemId,
        },
      });

      if (data) {
        console.log('data _', data);
        this.setState({sparePart: data.singleSparepart});
      }
      this.setState({loader: loading});
    } catch (e) {
      this.setState({loader: false});
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

  changeImge = id => {
    let index = this.state.imgIndex;

    if (id == 'forward') {
      if (index < this.state.pictures.length - 1) {
        index = index + 1;
      } else {
        index = 0;
      }
    }

    if (id == 'back') {
      if (index - 1 < 0) {
        index = this.state.pictures.length - 1;
      } else {
        index = index - 1;
      }
    }
    this.setState({imgIndex: index});
  };

  //create order
  createOrder = async () => {
    console.log('order_payload: ', {
      shopId: this.state.sparePart.shops,
      sparePartId: this.state.sparePart.id,
    });
    try {
      this.setState({btnLoader: true});
      const {errors, data, loading} = await client.mutate({
        mutation: gql`
          mutation createOrder($shopId: ID!, $sparePartId: ID!) {
            createOrder(shopId: $shopId, sparePartId: $sparePartId) {
              id
            }
          }
        `,
        variables: {
          shopId: this.state.sparePart.shops[0].id,
          sparePartId: this.state.sparePart.id,
        },
      });

      if (data) {
        this.setState({btnLoader: false});
        console.log('order_result data', data);
      }
    } catch (e) {
      this.setState({btnLoader: false});
      console.log('order_creation_error', e);
    }
  };
  //end createOrder Method

  //make phone call
  makeCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${1234567890}';
    } else {
      phoneNumber = 'telprompt:${1234567890}';
    }

    Linking.canOpenURL(phoneNumber)
      ? Linking.openURL(phoneNumber)
      : alert('Sorry! System unable to open');
  };
  //make phone call method ended

  //send message
  sendMessage = () => {
    let url = `sms:12312312312${
      Platform.OS === 'ios' ? '&' : '?'
    }body=${''}`;
    Linking.canOpenURL(url)
      ? Linking.openURL(url)
      : alert('Sorry! System unable to do');
  }; //ended

  render() {
    console.log('imgIndex ', this.state.imgIndex);
    return (
      <Container>
        <Header
          style={{backgroundColor: 'black'}}
          iconName="ios-arrow-round-back"
          iconStyle={{color: 'white', fontSize: 36}}
          headerMethod={() => this.props.navigation.goBack()}
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

        <Content contentContainerStyle={{backgroundColor:'lightgray'}}>
          {this.state.loader ? (
            <Image
              source={loader_gif}
              style={{width: '90%', alignSelf: 'center'}}
            />
          ) : (
            <React.Fragment>
              <View
                style={{
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 250,
                }}>
                <Image
                  source={this.state.pictures[this.state.imgIndex].picture}
                  style={{width: '100%', height: 250}}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: 20,
                    position: 'absolute',
                  }}>
                  <TouchableOpacity>
                    <Icon
                      onPress={() => this.changeImge('back')}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Icon
                      onPress={() => this.changeImge('forward')}
                      name="ios-arrow-forward"
                      style={{color: 'white', fontSize: 40}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Badge>
                    <Text>{this.state.sparePart.price} PKR</Text>
                  </Badge>
                  <Icon name="heart" style={{color: 'red'}} />
                </View>
                <View style={{paddingVertical: 5}}>
                  <Text style={{fontFamily: 'fantasy'}}>
                    {this.state.sparePart.name}
                  </Text>
                </View>

                <View style={{paddingVertical: 5}}>
                  <Text style={{fontFamily: 'fantasy'}}>
                    {this.state.sparePart.shops[0].address}
                  </Text>
                </View>

                <View style={{paddingVertical: 5}}>
                  <Text style={{fontFamily: 'fantasy'}}>
                    Vehicle Make: {this.state.sparePart.vehicleMake.name}
                  </Text>
                </View>

                <View style={{paddingVertical: 5}}>
                  <Text style={{fontFamily: 'fantasy'}}>
                    Model: {this.state.sparePart.vehicleModel.name}
                  </Text>
                </View>

                <View style={{paddingVertical: 5}}>
                  <Text style={{fontFamily: 'fantasy'}}>
                    Model Year: {this.state.sparePart.vehicleModelYear[0].name}
                  </Text>
                </View>

                <View style={{paddingVertical: 5}}>
                  <Text style={{fontFamily: 'fantasy'}}>
                    Category: {this.state.sparePart.vehicleCategory.name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <Icon name="ios-pin" style={{fontSize: 16}} />
                  <Text style={{paddingLeft: 4, fontSize: 12}}>
                    {this.state.sparePart.shops[0].location.city},{' '}
                    {this.state.sparePart.shops[0].location.country}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  height: 50,
                  width: '90%',
                }}>
                <Button
                  title="CALL"
                  buttonStyle={{backgroundColor: 'red'}}
                  onPress={this.makeCall}
                  loading={this.state.btnLoader}
                />
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  height: 50,
                  width: '90%',
                }}>
                <Button
                  title="SMS"
                  buttonStyle={{backgroundColor: 'red'}}
                  onPress={this.sendMessage}
                  loading={this.state.btnLoader}
                />
              </View>
            </React.Fragment>
          )}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = store => {
  return {store: store};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      //actions
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);
