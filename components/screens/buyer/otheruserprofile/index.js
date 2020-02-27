import React from 'react';
import {View, Text, Container, Content, Icon} from 'native-base';
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import Header from '../header/index';
import SingleItem from '../homescreen/singleItem';
import client, {mylink} from '../../apollo_config/config';
import gql from 'graphql-tag';
import loader_gif from '../../../../assests/placeholder-loading-demo-3.gif';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const ScreenHeight = Dimensions.get('window').height;

class OtherUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      user: {
        id: '',
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
          id: this.props.navigation.getParam('id'),
        },
        fetchPolicy:'network-only'
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
    console.log('param id ', this.state.user.spareparts);
    return (
      <Container>
        <Header
          style={{backgroundColor: 'black', borderBottomWidth: 0}}
          iconName="ios-arrow-round-back"
          headerMethod={() => this.props.navigation.goBack()}
          iconStyle={{fontSize: 40}}
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
                  height: 200,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  paddingLeft: 10,
                  borderBottomColor: 'lightgray',
                  borderBottomWidth: 4,
                }}>
                <Image
                  source={{uri: mylink + this.state.user.profile}}
                  style={{height: 100, width: 100, borderRadius: 50}}
                />
                <Text
                  style={{
                    fontSize: 14,
                    paddingVertical: 5,
                    fontWeight: 'bold',
                  }}>
                  {this.state.user.fname} {this.state.user.lname}
                </Text>
                <Text style={{fontSize: 12}}>{this.state.user.address}</Text>
              </View>
              <View
                style={{
                  height: 50,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}>
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 14}}>
                    Published Adds
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('UserAdds', {
                      p_id: this.state.user.id,
                    });
                  }}>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        paddingRight: 5,
                        paddingTop: 6,
                        fontSize: 14,
                      }}>
                      View More{' '}
                    </Text>
                    <Icon
                      name="ios-arrow-round-forward"
                      style={{fontSize: 32}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <SafeAreaView>
                <FlatList
                  data={this.state.user.spareparts}
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
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OtherUserProfile);
