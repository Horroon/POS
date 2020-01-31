import React from 'react';
import {
  View,
  Badge,
  Text,
  Button as NativeBaseButton,
  Container,
  Content,
  Icon,
  ListItem,
  Right,
  Left,
  Body,
  Thumbnail,
  Footer,
  FooterTab,
} from 'native-base';
import {Button} from 'react-native-elements';
import {
  Image,
  Platform,
  Linking,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  AsyncStorage,
} from 'react-native';
import Header from '../header/index';
import spareImg1 from '../../../../assests/spr1.jpg';
import spareImg2 from '../../../../assests/sparepart2.jpg';
import {Divider} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {showMessage} from 'react-native-flash-message';
import client, {mylink} from '../../apollo_config/config';
import loader_gif from '../../../../assests/placeholder-loading-demo-3.gif';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import SingleItem from '../homescreen/singleItem';

const ScreenHeight = Dimensions.get('window').height;
class ItemDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pictures: [
        {id: 1, picture: spareImg1},
        {id: 2, picture: spareImg2},
      ],
      singleSparepart: {
        id: 'ck52n2v5m012i0778s41824p9',
        name: 'Testing Sparepart',
        price: '2000',
        vehicleMake: {name: 'Toyota', __typename: 'VehicleMake'},
        vehicleModel: {
          id: 'ck52mdvyg00st0778pdck9iei',
          name: 'Camry',
          __typename: 'VehicleModel',
        },
        vehicleCategory: {name: 'Toyota 88C', __typename: 'VehicleCategory'},
        vehicleModelYears: [{name: ''}],
        location: {
          id: 'ck52mkpbp00wu0778fqm4adac',
          city: 'Rawalpindi',
          country: 'Pakistan',
          __typename: 'ShopLocation',
        },
        address: '',
        pictures: ['/images/M0nFhL1L26lQwzER8lE1PLE97tEmpdfp.png'],
        owner: {
          id: 'ck52m6hdv00qa0778ykf1qal3',
          profile: '',
          fname: '',
          lname: '',
          address: '',
          mobile: '03495049558',
          spareparts: [],
          __typename: 'Person',
        },
      },
      imgIndex: 0,
      loader: true,
      btnLoader: false,
      isLogin: false,
    };
  }

  checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.setState({isLogin: true});
    } else {
      this.setState({isLogin: false});
    }
  };

  componentDidMount() {
    this.checkLogin()
    this.getSingleSparePart();
  }

  componentDidUpdate(prevProps) {
    if (this.props.store.selectedItemId !== prevProps.store.selectedItemId) {
      this.getSingleSparePart();
    }
  }
  getSingleSparePart = async () => {
    try {
      const {data, loading} = await client.query({
        query: gql`
          query SingleSparePart($id: ID!) {
            singleSparepart(id: $id) {
              id
              address
              name
              price
              vehicleMake {
                id
                name
              }
              vehicleModel {
                id
                name
              }
              vehicleCategory {
                id
                name
              }
              vehicleModelYears {
                name
              }
              location {
                id
                city
                country
              }
              address
              pictures {
                id
                url
              }
              owner {
                id
                fname
                lname
                address
                profile
                mobile
                spareparts {
                  id
                  name
                  price
                  location {
                    id
                    city
                  }
                  address
                  pictures {
                    id
                    url
                  }
                }
              }
            }
          }
        `,
        variables: {
          id: this.props.store.selectedItemId,
        },
        fetchPolicy: 'no-cache',
      });

      if (data) {
        console.log('data _', data);
        this.setState({singleSparepart: data.singleSparepart});
      }
      this.setState({loader: loading});
    } catch (e) {
      console.log('erro __--__', e);
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
      if (index < this.state.singleSparepart.pictures.length - 1) {
        index = index + 1;
      } else {
        index = 0;
      }
    }

    if (id == 'back') {
      if (index - 1 < 0) {
        index = this.state.singleSparepart.pictures.length - 1;
      } else {
        index = index - 1;
      }
    }
    this.setState({imgIndex: index});
  };

  //make phone call
  makeCall = () => {
    if (this.state.isLogin) {
      let phoneNumber = '';

      if (Platform.OS === 'android') {
        phoneNumber = `tel:${this.state.singleSparepart.owner.mobile}`;
      } else {
        phoneNumber = `telprompt:${this.state.singleSparepart.owner.mobile}`;
      }

      Linking.canOpenURL(phoneNumber)
        ? Linking.openURL(phoneNumber)
        : alert('Sorry! System was unable to open');
    } else {
      this.props.loginModalAction(true);
    }
  };
  //make phone call method ended

  //send message
  sendMessage = () => {
    if (this.state.isLogin) {
      let url = `sms:${this.state.singleSparepart.owner.mobile}${
        Platform.OS === 'ios' ? '&' : '?'
      }body=${''}`;
      Linking.canOpenURL(url)
        ? Linking.openURL(url)
        : alert('Sorry! System was unable to do');
    } else {
      this.props.loginModalAction(true);
    }
  }; //ended

  selectedItemIdUpdateMethod = item => {
    this.props.selectedItemIdUpdate(item.id);
    this.props.navigation.navigate('BuyerItemDetail', {
      item: item,
    });
  };

  render() {
    console.log('state in single item ', this.state);
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

        <Content contentContainerStyle={{backgroundColor: 'white'}}>
          {this.state.loader ? (
            <Image
              source={loader_gif}
              style={{
                width: '90%',
                alignSelf: 'center',
                height: ScreenHeight - 135,
              }}
              resizeMode="cover"
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
                  source={{
                    uri:
                      this.state.singleSparepart.pictures.length > 0
                        ? mylink +
                          this.state.singleSparepart.pictures[
                            this.state.imgIndex
                          ].url
                        : '',
                  }}
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
                  <TouchableOpacity
                    style={{
                      alignItems: 'flex-start',
                    }}>
                    <Icon
                      onPress={() => this.changeImge('back')}
                      name="ios-arrow-back"
                      style={{color: 'white', fontSize: 50}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <Icon
                      onPress={() => this.changeImge('forward')}
                      name="ios-arrow-forward"
                      style={{color: 'white', fontSize: 50}}
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
                    paddingHorizontal: 20,
                  }}>
                  <View>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                      {this.state.singleSparepart.price} PKR
                    </Text>
                  </View>
                  <Icon name="ios-heart-empty" style={{color: 'red'}} />
                </View>
                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                  }}>
                  <Text style={{fontFamily: 'fantasy', fontSize: 14}}>
                    {this.state.singleSparepart.name}
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                  }}>
                  <Text style={{fontSize: 12}}>
                    {this.state.singleSparepart.address}
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 4,
                    paddingHorizontal: 20,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                    flexDirection: 'row',
                  }}>
                  <Icon name="ios-pin" style={{fontSize: 14, color: 'gray'}} />
                  <Text
                    style={{
                      paddingLeft: 4,
                      color: 'black',
                      fontStyle: 'italic',
                      fontSize: 12,
                    }}>
                    {this.state.singleSparepart.location.city},{' '}
                    {this.state.singleSparepart.location.country}
                  </Text>
                </View>
                <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>Detail</Text>
                </View>
                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                  }}>
                  <Text style={{fontSize: 14, color: 'gray'}}>
                    Vehicle Make{'             '}
                    <Text style={{color: 'black', fontSize: 12}}>
                      {this.state.singleSparepart.vehicleMake.name}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                  }}>
                  <Text style={{fontSize: 12, color: 'gray'}}>
                    Model{'                                '}
                    <Text style={{color: 'black', fontSize: 12}}>
                      {this.state.singleSparepart.vehicleModel.name}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                  }}>
                  <Text style={{fontSize: 12, color: 'gray'}}>
                    Model Year{'                       '}
                    <Text style={{color: 'black', fontSize: 12}}>
                      {this.state.singleSparepart.vehicleModelYears[0].name}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingTop: 5,
                    paddingBottom: 10,
                    borderBottomWidth: 4,
                    paddingHorizontal: 20,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                  }}>
                  <Text style={{fontSize: 12, color: 'gray'}}>
                    Category{'                           '}
                    <Text style={{color: 'black', fontSize: 12}}>
                      {this.state.singleSparepart.vehicleCategory.name}
                    </Text>
                  </Text>
                </View>

                <View style={{paddingVertical: 10, paddingHorizontal: 20}}>
                  <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                    Description
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: 5,
                    paddingBottom: 10,
                    borderBottomWidth: 4,
                    paddingHorizontal: 20,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                  }}>
                  <Text style={{fontSize: 12}}>Pending</Text>
                </View>
              </View>

              <View
                style={{
                  paddingTop: 5,
                  paddingBottom: 10,
                  borderBottomWidth: 4,
                  paddingHorizontal: 20,
                  borderBottomColor: styles.itemBottomBorderColor.color,
                }}>
                <ListItem
                  avatar
                  onPress={() => {
                    this.props.navigation.navigate('OtherUserProfile', {
                      id: this.state.singleSparepart.owner.id,
                    });
                  }}>
                  <Left>
                    <Thumbnail
                      source={{
                        uri: mylink + this.state.singleSparepart.owner.profile,
                      }}
                    />
                  </Left>
                  <Body style={{borderBottomWidth: 0}}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      {this.state.singleSparepart.owner.fname}{' '}
                      {this.state.singleSparepart.owner.lname}
                    </Text>
                    <Text note style={{fontSize: 12}}>
                      {this.state.singleSparepart.owner.address}
                    </Text>
                  </Body>
                  <Right
                    style={{justifyContent: 'center', borderBottomWidth: 0}}>
                    <Icon
                      name="ios-arrow-forward"
                      style={{fontSize: 25, color: 'black', paddingTop: 2}}
                      onPress={() => {
                        this.props.navigation.navigate('OtherUserProfile', {
                          id: 12,
                        });
                      }}
                    />
                  </Right>
                </ListItem>
              </View>

              <View style={{paddingTop: 10, paddingHorizontal: 10}}>
                <Text style={{fontSize: 14}}>Related Adds</Text>
              </View>

              <SafeAreaView>
                <FlatList
                  data={this.state.singleSparepart.owner.spareparts}
                  renderItem={item => (
                    <SingleItem
                      height={200}
                      width={160}
                      item={item.item}
                      selectedItemIdUpdateMethod={
                        this.selectedItemIdUpdateMethod
                      }
                    />
                  )}
                  extraData
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </SafeAreaView>
            </React.Fragment>
          )}
        </Content>
        <Footer style={{backgroundColor: 'black'}}>
          <FooterTab style={{backgroundColor: 'black'}}>
            <NativeBaseButton>
              <Icon name="ios-chatboxes" />
              <Text>Chat</Text>
            </NativeBaseButton>
            <NativeBaseButton onPress={this.sendMessage}>
              <Icon name="ios-contact" />
              <Text>SMS</Text>
            </NativeBaseButton>
            <NativeBaseButton onPress={this.makeCall}>
              <Icon name="ios-call" />
              <Text>CALL</Text>
            </NativeBaseButton>
          </FooterTab>
        </Footer>
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
      selectedItemIdUpdate: input => ({type: 'selectedItemId', payload: input}),
      loginModalAction: input => ({type: 'loginModal', payload: input}),
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(ItemDetail);

const styles = StyleSheet.create({
  itemBottomBorderColor: {
    color: 'lightgray',
  },
});
