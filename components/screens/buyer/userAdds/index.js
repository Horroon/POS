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
  Dimensions,
  Image,
} from 'react-native';
import Header from '../header/index';
import {showMessage} from 'react-native-flash-message';
import client, {mylink} from '../../apollo_config/config';
import SingleItem from '../homescreen/singleItem';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import loader_gif from '../../../../assests/placeholder-loading-demo-3.gif';
import gql from 'graphql-tag';

const ScreenHeight = Dimensions.get('window').height;

class UserAdds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      user: {
        fname: '',
        lname: '',
        address: '',
        profile: '',
        spareparts: [],
      },
    };
  }

  componentDidMount() {
    this.getOtherUserInfo();
  }

  getOtherUserInfo = async () => {
    try {
      this.setState({loader: true});
      const {data, loading} = await client.query({
        query: gql`
          query findOtherUser($id: ID!) {
            findOtherUser(id: $id) {
              id
              profile
              fname
              mobile
              lname
              address
              spareparts {
                id
                name
                price
                address
                location {
                  id
                  city
                }
                pictures {
                  id
                  url
                }
                updatedAt
              }
            }
          }
        `,
        variables: {
          id: this.props.navigation.getParam('p_id'),
        },
        fetchPolicy: 'network-only',
      });

      if (data) {
        console.log('data _', data);
        this.setState({user: data.findOtherUser});
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

  selectedItemIdUpdateMethod = item => {
    this.props.selectedItemIdUpdate(item.id);
    this.props.navigation.navigate('BuyerItemDetail', {
      item: item,
    });
  };

  render() {
    console.log('sparepart: ', this.props.navigation.getParam('p_id'));
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
        <View style={{flex: 1}}>
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
            <SafeAreaView style={{flex: 1}}>
              {this.state.user.spareparts.length > 0 ? (
                <React.Fragment>
                  {/* <FlatList
                data={this.state.spareParts}
                extraData
                keyExtractor={item => item.id.toString()}
                renderItem={item => this.list(item.item)}
              /> */}
                  <FlatList
                    data={this.state.user.spareparts}
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
                  />
                </React.Fragment>
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{textAlign: 'center', fontSize: 14}}>
                    No Sparepart Found
                  </Text>
                </View>
              )}
            </SafeAreaView>
          )}
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserAdds);
