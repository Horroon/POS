import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {Container, Content, Icon, Badge} from 'native-base';
import {Button} from 'react-native-elements';
import Header from '../Header/index';
import spareImg1 from '../../../../assests/spr1.jpg';
import spareImg2 from '../../../../assests/sparepart2.jpg';
import loader_gif from '../../../../assests/placeholder-loading-demo-3.gif';
import {showMessage} from 'react-native-flash-message';
import LoaderModal from '../../commonscreen/loadingmodel/index';
import client, {mylink} from '../../apollo_config/config';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddSpareparts_list from '../../../redux/actions/addSpareparts_list';

const Height = Dimensions.get('screen').height;

class OrderDetail extends Component {
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
        isAvailable: false,
        pictures: ['/images/M0nFhL1L26lQwzER8lE1PLE97tEmpdfp.png'],
        owner: {
          id: 'ck52m6hdv00qa0778ykf1qal3',
          mobile: '03495049558',
          __typename: 'Person',
        },
      },
      imgIndex: 0,
      loader: false,
      btnLoader: false,
      modalVisible: false,
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
              isAvailable
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
                url
              }
              owner {
                id
                mobile
              }
            }
          }
        `,
        variables: {
          id: this.props.navigation.getParam('item').id,
        },
      });
      this.setState({modalVisible: loading});
      if (data) {
        console.log('data _', data);
        this.setState({singleSparepart: data.singleSparepart});
      }
      this.setState({loader: loading});
    } catch (e) {
      console.log('erro __--__', e);
      this.setState({modalVisible: false});
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

  //delete sparepart method start
  deleteSparepart = async () => {
    try {
      const {data, errors, loading} = await client.mutate({
        mutation: gql`
          mutation deleteSparepart($id: ID!) {
            deleteSparepart(id: $id) {
              id
              name
            }
          }
        `,
        variables: {
          id: this.props.navigation.getParam('item').id,
        },
      });

      this.setState({modalVisible: loading});
      if (data) {
        console.log('data after delete', data);
        let array = this.props.store.sparepartslist;
        array = array.filter(function(obj, index) {
          return obj.id !== data.deleteSparepart.id;
        });
        this.props.AddSpareparts_list(array);
        ToastAndroid.show(
          'You have successfully deleted your sparepart',
          ToastAndroid.SHORT,
        );
        this.props.navigation.navigate('SellerOrderList');
      }
    } catch (e) {
      console.log('error in delete method', e);
      this.setState({modalVisible: false});
      if (e.graphQLErrors[0]) {
        showMessage({
          message: e.graphQLErrors[0].message,
          type: 'danger',
        });
      }
      if (e.networkError) {
        showMessage({
          message: 'Network Problem!',
          type: 'danger',
        });
      }
    }
  };
  //delete sparepart method end

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

  //Update sparepartstatus method start
  updateSparepartStatus = async () => {
    try {
      this.setState({modalVisible: true});
      const {data, errors} = await client.mutate({
        mutation: gql`
          mutation updateSparepartStatus($id: ID!) {
            updateSparepartStatus(id: $id) {
              id
              name
              price
              isAvailable
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
                url
              }
              owner {
                id
                mobile
              }
            }
          }
        `,
        variables: {id: this.props.navigation.getParam('item').id},
      });

      if (data) {
        console.log('data in update model is ', data);
        this.setState({
          singleSparepart: data.updateSparepartStatus,
          modalVisible: false,
        });
      }
    } catch (e) {
      console.log('error in delete method', e);
      this.setState({modalVisible: false});
      if (e.graphQLErrors[0]) {
        showMessage({
          message: e.graphQLErrors[0].message,
          type: 'danger',
        });
      }
      if (e.networkError) {
        showMessage({
          message: 'Network Problem!',
          type: 'danger',
        });
      }
    }
  };
  //Update sparepartstatus method end

  render() {
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

        <Content
          contentContainerStyle={{
            backgroundColor: 'lightgray',
            height: Height - 50,
          }}>
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
                {
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
                }
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                    paddingHorizontal: 20,
                    position: 'absolute',
                  }}>
                  <TouchableOpacity
                    onPress={() => this.changeImge('back')}
                    style={{width: '40%', alignItems: 'flex-start'}}>
                    <Icon
                      name="ios-arrow-back"
                      style={{color: 'white', fontSize: 40}}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => this.changeImge('forward')}
                    style={{width: '40%', alignItems: 'flex-end'}}>
                    <Icon
                      name="ios-arrow-forward"
                      style={{color: 'white', fontSize: 40}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Badge>
                    <Text style={{color: 'white'}}>
                      {this.state.singleSparepart.price} PKR
                    </Text>
                  </Badge>
                  <Icon
                    name="ios-trash"
                    style={{color: 'red', fontSize: 35}}
                    onPress={() =>
                      Alert.alert(
                        'Do you want to delete this sparepart?',
                        'Warning',
                        [
                          {
                            text: 'No',
                            onPress: () => {},
                          },
                          {
                            text: 'Yes',
                            onPress: () => {
                              this.deleteSparepart();
                            },
                          },
                        ],
                      )
                    }
                  />
                </View>
                <View
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                  }}>
                  <Text style={{fontFamily: 'fantasy'}}>
                    {this.state.singleSparepart.name}
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                  }}>
                  <Text style={{fontFamily: 'fantasy'}}>
                    {this.state.singleSparepart.address}
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                  }}>
                  <Text style={{fontFamily: 'fantasy', color: 'gray'}}>
                    Vehicle Make:{' '}
                    <Text style={{color: 'black', fontStyle: 'italic'}}>
                      {this.state.singleSparepart.vehicleMake.name}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                  }}>
                  <Text style={{fontFamily: 'fantasy', color: 'gray'}}>
                    Model:{' '}
                    <Text style={{color: 'black', fontStyle: 'italic'}}>
                      {this.state.singleSparepart.vehicleModel.name}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                  }}>
                  <Text style={{fontFamily: 'fantasy', color: 'gray'}}>
                    Model Year:{' '}
                    <Text style={{color: 'black', fontStyle: 'italic'}}>
                      {this.state.singleSparepart.vehicleModelYears[0].name}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                  }}>
                  <Text style={{fontFamily: 'fantasy', color: 'gray'}}>
                    Category:{' '}
                    <Text style={{color: 'black', fontStyle: 'italic'}}>
                      {this.state.singleSparepart.vehicleCategory.name}
                    </Text>
                  </Text>
                </View>

                <View
                  style={{
                    paddingVertical: 5,
                    borderBottomWidth: 1,
                    borderBottomColor: styles.itemBottomBorderColor.color,
                  }}>
                  <Text style={{fontFamily: 'fantasy', color: 'gray'}}>
                    Status:{' '}
                    <Text style={{color: 'black', fontStyle: 'italic'}}>
                      {' '}
                      {this.state.singleSparepart.isAvailable
                        ? 'Available'
                        : 'Unavailable'}
                    </Text>
                  </Text>
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 5}}>
                  <Icon name="ios-pin" style={{fontSize: 16, color: 'gray'}} />
                  <Text
                    style={{
                      paddingLeft: 4,
                      color: 'black',
                      fontStyle: 'italic',
                    }}>
                    {this.state.singleSparepart.location.city},{' '}
                    {this.state.singleSparepart.location.country}
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
                  title="Mark as Sold"
                  buttonStyle={{backgroundColor: 'red'}}
                  onPress={() =>
                    Alert.alert('Have you sold this item?', '', [
                      {
                        text: 'No',
                        onPress: () => {
                          console.log('No pressed');
                        },
                      },
                      {
                        text: 'Yes',
                        onPress: () => {
                          this.updateSparepartStatus();
                        },
                      },
                    ])
                  }
                  loading={this.state.btnLoader}
                />
              </View>
            </React.Fragment>
          )}
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

function mapStateToProps(state) {
  return {store: state};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({AddSpareparts_list: AddSpareparts_list}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);

const styles = StyleSheet.create({
  itemBottomBorderColor: {
    color: 'gray',
  },
});
