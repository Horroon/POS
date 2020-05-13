import React, {Component} from 'react';
import {
  Container,
  Content,
  View,
  Text,
  Card,
  CardItem,
  Body,
  Left,
  Badge,
  Icon,
  Right,
  Footer,
  FooterTab,
} from 'native-base';
import {Button} from 'react-native-elements';
import {
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Header from '../Header/index';
import Drawer from '../../commonscreen/drawer/index';
import Sidebar from '../../commonscreen/sidebars/sellersidebar';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {showMessage} from 'react-native-flash-message';
import client, {mylink} from '../../apollo_config/config';
import spareImage1 from '../../../../assests/sparepart2.jpg';
import gql from 'graphql-tag';
import LoaderModal from '../../commonscreen/loadingmodel/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AddSpareparts_list from '../../../redux/actions/addSpareparts_list';
import SingleItem from '../../buyer/homescreen/singleItem';

const Height = Dimensions.get('window').height - 120;

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sparepartslist: [
        {
          id: 1,
          name: 'Testing',
          pictures: [{url: spareImage1}],
          address: 'Thamewali',
          price: 123,
          location: {
            country: 'Pakistan',
            city: 'Talagang',
          },
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Testing',
          pictures: [{url: spareImage1}],
          address: 'Thamewali',
          price: 123,
          location: {
            country: 'Pakistan',
            city: 'Mianwali',
          },
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Testing',
          pictures: [{url: spareImage1}],
          address: 'Thamewali',
          price: 123,
          location: {
            country: 'Pakistan',
            city: 'Mianwali',
          },
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: 'Testing',
          pictures: [{url: spareImage1}],
          address: 'Thamewali',
          price: 123,
          location: {
            country: 'Pakistan',
            city: 'Mianwali',
          },
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: 'Testing',
          pictures: [{url: spareImage1}],
          address: 'Thamewali',
          price: 123,
          location: {
            country: 'Pakistan',
            city: 'Mianwali',
          },
          updatedAt: new Date(),
        },
        {
          id: 6,
          name: 'Testing',
          pictures: [{url: spareImage1}],
          address: 'Thamewali',
          price: 123,
          location: {
            country: 'Pakistan',
            city: 'Mianwali',
          },
          updatedAt: new Date(),
        },
      ],
      modalVisible: false,
    };
  }

  componentDidMount() {
    //this.findSellerSpareparts();
  }

  /*  listItem = item => {
    console.log('item: ', item);
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate('SellerOrderDetail', {
            item: item,
          });
        }}>
        <Card containerStyle={{borderRadius: 5, backgroundColor: 'gray'}}>
          <View
            style={{flexDirection: 'row', padding: 2, backgroundColor: 'gray'}}>
            <View style={{width: '30%'}}>
              <Image
                source={{
                  uri:
                    item.pictures.length > 0
                      ? mylink + item.pictures[0].url
                      : item.pictures[0].url,
                }}
                style={{height: 100, width: '100%'}}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                paddingHorizontal: 5,
                width: '70%',
                justifyContent: 'space-around',
              }}>
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: 'white',
                  }}>
                  {item.name}
                </Text>
                <Icon name="heart" style={{color: 'red'}} />
              </View>
              <View>
                <Text style={{fontSize: 13, color: 'white'}}>
                  {item.address}
                </Text>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="ios-pin" style={{fontSize: 16, color: 'white'}} />
                  <Text
                    style={{
                      marginLeft: '2%',
                      fontStyle: 'italic',
                      color: 'white',
                      paddingLeft: 4,
                      fontSize: 12,
                    }}>
                    {item.location.city}, {item.location.country}
                  </Text>
                </View>
                <View>
                  <Badge>
                    <Text style={{fontWeight: 'bold', fontSize: 9}}>
                      {item.price} PKR
                    </Text>
                  </Badge>
                </View>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }; */

  //findSellerSpareparts method start
  findSellerSpareparts = async () => {
    try {
      const {data, errors, loading} = await client.query({
        query: gql`
          query {
            findSellerSpareparts {
              id
              name
              address
              location {
                city
                country
              }
              price
              pictures {
                id
                url
              }
            }
          }
        `,
        fetchPolicy: 'no-cache',
      });
      this.setState({modalVisible: loading});
      console.log('loading ', loading);
      if (data) {
        console.log('data came after request sent', data.findSellerSpareparts);
        this.props.addSpareparts_list(data.findSellerSpareparts);
        this.setState({sparepartslist: data.findSellerSpareparts});
      }
    } catch (e) {
      console.log('Error ', e);
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
  //findSellerSpareparts method ended
  render() {
    console.log('store is in order list ', this.state);
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
        <Content
          contentContainerStyle={{
            backgroundColor: 'black',
            minHeight: Height,
          }}>
          <View>
            <View
              style={{
                height: 80,
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  MY SPAREPARTS
                </Text>
              </View>
            </View>
            {/* 
            <FlatList
              data={this.state.sparepartslist} //{this.props.store.sparepartslist}
              renderItem={item => this.listItem(item.item)}
              keyExtractor={(obj, index) => index.toString()}
              extraData
            /> */}

            <FlatList
              data={this.state.sparepartslist}
              renderItem={item => (
                <SingleItem
                  style={{backgroundColor: 'white'}}
                  height={200}
                  width={'44.5%'}
                  item={item.item}
                  //selectedItemIdUpdateMethod={this.selectedItemIdUpdateMethod}
                />
              )}
              extraData
              keyExtractor={item => item.id.toString()}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
            />
          </View>
          <LoaderModal
            state={this.state}
            setState={obj => {
              this.setState(obj);
            }}
          />
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor: 'black'}}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.2)',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                position: 'absolute',
                bottom: 10,
                right: 10,
                height: 70,
                backgroundColor: 'red',
                borderRadius: 100,
              }}
              onPress={() => this.props.navigation.navigate('AddProduct')}>
              <Icon name="add" size={30} style={{color: 'white'}} />
            </TouchableOpacity>
          </FooterTab>
        </Footer>
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
      addSpareparts_list: AddSpareparts_list,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Drawer(OrderList, Sidebar));
