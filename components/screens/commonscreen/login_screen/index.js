import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  AsyncStorage,
  ToastAndroid,
} from 'react-native';
import {IconInputFiled} from '../../../customMaterial/InputField/Icon_InputField';
import {CustomButton} from '../../../customMaterial/Button/index';
import {Button, Divider} from 'react-native-elements';
import {styles} from './style';
import {showMessage, hideMessage} from 'react-native-flash-message';
import LoginScreenBackgroundImage from '../../../../assests/loginScreenBackground.jpg';
import {Container, Content} from 'native-base';
import Client from '../../apollo_config/config';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const ScreenHeight = Math.round(Dimensions.get('screen').height);

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      email: '',
      password: '',
    };
  }

  loginrequest = async () => {
    const lquery = gql`
      query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          AuthToken
          email
          id
        }
      }
    `;
    const role = await AsyncStorage.getItem('role');

    if (this.state.email && this.state.password) {
      this.setState({loader: true});
      try {
        const {data, errors, loading} = await Client.query({
          query: lquery,
          variables: {
            email: this.state.email.replace(' ', ''),
            password: this.state.password.replace(' ', ''),
          },
          fetchPolicy: 'network-only',
        });

        alert('data ' + JSON.stringify(data));

        if (loading) {
          this.setState({loader: true});
        }
        if (!loading) {
          this.setState({loader: false});
        }

        if (data !== null) {
          showMessage({
            message: 'LOGIN SUCCESSFULLY',
            type: 'success',
          });

          //closing login modal
          this.props.closeLoginModal(false);

          //data for redux store
          let {loginData} = this.props.store;
          loginData.token = data.login.AuthToken;
          loginData.lgn_email = data.login.email;
          loginData.lgn_Id = data.login.id;

          //dispatch data to store
          this.props.loginData(loginData);

          //store data in Async
          AsyncStorage.setItem('token', data.login.AuthToken);

          if (role == 's') {
            this.props.navigation.navigate('SellerOrderList');
          }
          if (role == 'b') {
            this.props.navigation.navigate('BuyerHomeScreen');
          }
        }
        if (data == null) {
          throw new Error('Sorry some thing wrong');
        }
        if (loading) {
          ToastAndroid.showWithGravity(
            'loading...',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      } catch (e) {
        alert(e);
        //closing login modal
        this.props.closeLoginModal(false);
        if (e.graphQLErrors[0]) {
          this.setState({loader: false});
          showMessage({
            message: e.graphQLErrors[0].message,
            type: 'danger',
          });
        }
        if (e.networkError) {
          this.setState({loader: false});
          console.log('error ', e.networkError);
          showMessage({
            message: 'Network Problem!',
            type: 'danger',
          });
        } else {
          this.setState({loader: false});
          console.log('error ', e);
          showMessage({
            message: e,
            type: 'danger',
          });
        }
      }
    } else {
      showMessage({
        message: `Please Enter ${!this.state.email ? 'Email' : 'Password'} `,
        type: 'danger',
      });
    }
  };
  //render screen
  render() {
    console.log('navigation is ', this.props.navigation);
    return (
      <Container>
        <Content style={{backgroundColor: 'transparent'}}>
          <ImageBackground
            style={{width: '100%', height: ScreenHeight - 24}}
            resizeMode={'cover'}>
            <View style={styles.con1}>
              <View style={{height: 180}}>
                <Image
                  source={require('../../../../assests/logo.png')}
                  style={styles.con1Img1}
                />
              </View>
            </View>
            <View style={styles.con2}>
              <View style={styles.con2Con1}>
                <IconInputFiled
                  placeholder="Email Address"
                  place
                  style={{fontSize: 16}}
                  changeText={e => this.setState({email: e})}
                  Image={'mail'}
                  iconStyle={{color: 'red'}}
                />
                <IconInputFiled
                  placeholder="Password"
                  style={{fontSize: 16}}
                  changeText={e => this.setState({password: e})}
                  Image={'ios-key'}
                  password={true}
                  iconStyle={{color: 'red'}}
                />
              </View>
            </View>
            <View style={styles.con3}>
              <View style={{margin: 22, justifyContent: 'space-between'}}>
                <Button
                  title="Sign In"
                  loading={this.state.loader}
                  style={{height: 50}}
                  onPress={this.loginrequest}
                  buttonStyle={{backgroundColor: 'red'}}
                />
              </View>
              <View
                style={{
                  margin: 25,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Divider
                  style={{width: '45%', borderWidth: 1, borderColor: 'red'}}
                />
                <Text style={{marginTop: -10, color: 'white'}}> OR </Text>
                <Divider
                  style={{width: '45%', borderWidth: 1, borderColor: 'red'}}
                />
              </View>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => {
                  console.log(
                    'navigation in login modal: ',
                    this.props.navigation,
                  );
                  this.props.closeLoginModal();
                  this.props.navigation.navigate('SignUp');
                }}>
                <Text style={{textDecorationLine: 'underline', color: 'red'}}>
                  Create New Account
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Content>
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
      loginData: obj => {
        return {type: 'loginData', payload: obj};
      },
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
