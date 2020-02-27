import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  AsyncStorage,
} from 'react-native';
import {Card, CardItem, Right, Icon, ActionSheet} from 'native-base';
import {Button} from 'react-native-elements';
import client, {mylink} from '../../apollo_config/config';
import LoaderModal from '../../commonscreen/loadingmodel/index';
import {showMessage} from 'react-native-flash-message';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const height = Dimensions.get('window').height;
class HomeSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      isLogin: false,
      person: {
        fname: '',
        lname: '',
        email: '',
        profile: '',
      },
    };
  }

  checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.profileData(); //if user login then call profileData method
      this.setState({isLogin: true});
    } else {
      this.setState({isLogin: false});
    }
  };

  componentDidMount() {
    this.checkLogin();
  }

  UNSAFE_componentWillUpdate(preState) {
    if (preState != this.props) {
      if (this.props.store.loginData.lgn_Id) {
        this.profileData();
        return true;
      }
    } else {
      return false;
    }
  }
  profileData = async () => {
    try {
      this.setState({modalVisible: true});
      const {data, loading} = await client.query({
        query: gql`
          query {
            profileData {
              fname
              lname
              email
              profile
            }
          }
        `,
      });
      this.setState({modalVisible: false});
      if (data) {
        this.setState({person: data.profileData, isLogin: true});
      }
    } catch (e) {
      console.log('eer ', e);
      this.setState({modalVisible: true});
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

  render() {
    console.log('props: in side bar', this.props);
    return (
      <View
        style={{
          height: height,
          backgroundColor: 'black',
          borderRightWidth: 1,
          borderColor: 'gray',
        }}>
        <View>
          <ImageBackground
            style={{
              height: 250,
              paddingTop: 20,
              paddingLeft: 10,
              justifyContent: 'center',
            }}
            source={require('../../../../assests/sidebar_background.jpg')}>
            {this.state.isLogin || this.props.store.loginData.lgn_Id ? (
              <React.Fragment>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{uri: mylink + this.state.person.profile}}
                    style={{height: 100, width: 100, borderRadius: 50}}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 10,
                    fontWeight: 'bold',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {this.state.person.fname}
                  {/*  */} {this.state.person.lname}
                </Text>
                <Text
                  style={{color: 'white', marginTop: 3, textAlign: 'center'}}>
                  {this.state.person.email}
                </Text>
              </React.Fragment>
            ) : (
              <Button
                title="Click Here To Login"
                titleStyle={{
                  color: 'white',
                  textDecorationLine: 'underline',
                  textDecorationStyle: 'dashed',
                  fontSize: 20,
                }}
                buttonStyle={{
                  backgroundColor: '#00FFFFF',
                  width: '100%',
                  borderRadius: 25,
                }}
                onPress={() => this.props.loginModalAction(true)}
              />
            )}
          </ImageBackground>
          <ScrollView
            style={{
              height: height - 250 - 80,
              display: this.state.isLogin || this.props.store.loginData.lgn_Id ? 'flex' : 'none',
            }}>
            {/* profile row end */}
            <TouchableHighlight
              style={{borderBottomWidth: 1, borderColor: 'gray'}}
              onPress={() => {
                this.props.navigation.navigate('Profile');
              }}>
              <Card transparent>
                <CardItem style={{backgroundColor: 'black'}}>
                  <Icon active name="ios-person" style={{color: 'white'}} />
                  <Text style={{color: 'white'}}>Profile</Text>
                </CardItem>
              </Card>
            </TouchableHighlight>
            {/* profile row end */}

            {/* logout row end */}
            <TouchableHighlight
              style={{borderBottomWidth: 1, borderColor: 'gray'}}
              onPress={() => {
                //remove data from redux
                let {loginData} = this.props.store;
                loginData.token = null;
                loginData.lgn_email = null;
                loginData.lgn_Id = null;

                //update redux
                this.props.loginDataAction(loginData);

                AsyncStorage.removeItem('token');
                AsyncStorage.removeItem('role');
                AsyncStorage.removeItem('lgn_email');
                AsyncStorage.removeItem('lgn_Id');
                this.setState({isLogin: false});
                this.props.navigation.navigate('BuyerHomeScreen');
              }}>
              <Card transparent>
                <CardItem style={{backgroundColor: 'transparent'}}>
                  <Icon active name="ios-log-out" style={{color: 'white'}} />
                  <Text style={{color: 'white'}}>Logout</Text>
                </CardItem>
              </Card>
            </TouchableHighlight>
            {/* logout row end */}
          </ScrollView>
        </View>
        <View
          style={{
            height: 50,
            borderTopWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: 'gray',
          }}>
          <Text style={{fontStyle: 'italic', color: 'white'}}>
            Powered by React Native
          </Text>
        </View>
        <LoaderModal state={this.state} setState={obj => this.setState(obj)} />
      </View>
    );
  }
}

const mapStateToProps = store => {
  return {store: store};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loginModalAction: input => ({type: 'loginModal', payload: input}),
      loginDataAction: input => ({type: 'loginData', payload: input}),
    },
    dispatch,
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeSideBar);
