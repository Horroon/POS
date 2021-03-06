import React from 'react';
import {
  Container,
  Content,
  Text,
  View,
  Form,
  Item,
  Icon,
  Picker,
  Badge,
  Button,
} from 'native-base';
import {
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Divider, Card, Image} from 'react-native-elements';
import Header from '../header/index';
import SearchBar from './searchscreen';
import {showMessage} from 'react-native-flash-message';
import spareImg1 from '../../../../assests/spr1.jpg';
import client, {mylink} from '../../apollo_config/config';
import SingleItem from '../homescreen/singleItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import gql from 'graphql-tag';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spareParts: [],
    };
  }

  componentDidMount() {
    this.getspareparts();
  }

  getspareparts = async () => {
    try {
      const {data, loading, errors} = await client.query({
        query: gql`
          query FindSpareParts(
            $vehicleMake: ID!
            $vehicleModel: ID!
            $vehicleModelYear: ID!
            $category: ID!
            $location: ID!
          ) {
            findSpareparts(
              vehicleMake: $vehicleMake
              vehicleModel: $vehicleModel
              vehicleModelYear: $vehicleModelYear
              category: $category
              location: $location
            ) {
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
          vehicleMake: this.props.store.spareparts_search.vehicleMake,
          vehicleModel: this.props.store.spareparts_search.vehicleModel,
          vehicleModelYear: this.props.store.spareparts_search.vehicleModelYear,
          category: this.props.store.spareparts_search.category,
          location: this.props.store.spareparts_search.location,
        },
        fetchPolicy: 'network-only',
      });
      if (data) {
        this.setState({spareParts: data.findSpareparts});
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
  list = item => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.selectedItemIdUpdate(item.id);
          this.props.navigation.navigate('BuyerItemDetail', {
            item: item,
          });
        }}>
        <Card containerStyle={{borderRadius: 5, backgroundColor: 'gray'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '30%'}}>
              <Image
                source={
                  item.pictures.length > 0
                    ? {uri: mylink + item.pictures[0].url}
                    : spareImg1
                }
                style={{height: 100, width: '100%'}}
              />{' '}
            </View>{' '}
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
                  {' '}
                  {item.name}{' '}
                </Text>{' '}
                <Icon name="heart" style={{color: 'red'}} />{' '}
              </View>{' '}
              <View>
                <Text style={{fontSize: 13, color: 'white'}}>
                  {' '}
                  {item.address}{' '}
                </Text>{' '}
              </View>{' '}
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                  <Icon name="ios-pin" style={{fontSize: 16, color: 'black'}} />{' '}
                  <Text
                    style={{
                      marginLeft: '2%',
                      fontStyle: 'italic',
                      color: 'white',
                      paddingLeft: 4,
                      fontSize: 12,
                    }}>
                    {' '}
                    {item.location.city}, {item.location.country}{' '}
                  </Text>{' '}
                </View>{' '}
                <View>
                  <Badge>
                    <Text style={{fontWeight: 'bold', fontSize: 9}}>
                      {' '}
                      {item.price}
                      PKR{' '}
                    </Text>{' '}
                  </Badge>{' '}
                </View>{' '}
              </View>{' '}
            </View>{' '}
          </View>{' '}
        </Card>{' '}
      </TouchableOpacity>
    );
  };

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
            PARTS{' '}
          </Text>{' '}
          <Text
            style={{
              fontFamily: 'fantasy',
              fontSize: 14,
              fontStyle: 'italic',
              color: 'red',
              fontWeight: 'bold',
            }}>
            WHEEL{' '}
          </Text>{' '}
          <Text
            style={{
              fontFamily: 'fantasy',
              fontSize: 14,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: 'white',
            }}>
            .COM{' '}
          </Text>{' '}
        </Header>{' '}
        <View style={{flex: 1}}>
          {' '}
          {/*       <View style={{width: '100%', alignSelf: 'center'}}>
                            <SearchBar />
                          </View> */}{' '}
          <SafeAreaView style={{flex: 1}}>
            {' '}
            {this.state.spareParts.length > 0 ? (
              <React.Fragment>
                {' '}
                {/* <FlatList
                                        data={this.state.spareParts}
                                        extraData
                                        keyExtractor={item => item.id.toString()}
                                        renderItem={item => this.list(item.item)}
                                      /> */}{' '}
                <FlatList
                  data={this.state.spareParts}
                  renderItem={item => (
                    <SingleItem
                      height={200}
                      width={'44.5%'}
                      item={item.item}
                      selectedItemIdUpdateMethod={
                        this.selectedItemIdUpdateMethod
                      }
                    />
                  )}
                  extraData
                  keyExtractor={item => item.id.toString()}
                  numColumns={2}
                  showsHorizontalScrollIndicator={false}
                />{' '}
              </React.Fragment>
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  No Sparepart found{' '}
                </Text>{' '}
              </View>
            )}{' '}
          </SafeAreaView>{' '}
        </View>{' '}
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
)(Category);
