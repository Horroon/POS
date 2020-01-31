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
const ScreenHeight = Math.round(Dimensions.get('screen').height);

export default class LoginComponent extends Component {
  //header data
  static navigationOptions = {
    title: 'login',
    header: null,
  };

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

        if (loading) {
          this.setState({loader: true});
        }
        if (!loading) {
          this.setState({loader: false});
        }
        if (data) {
          showMessage({
            message: 'LOGIN SUCCESSFULLY',
            type: 'success',
          });

          console.log('data in login ', data);
          AsyncStorage.setItem('token', data.login.AuthToken);
          console.log('token', data.login.AuthToken);
          if (role == 's') {
            this.props.navigation.navigate('SellerOrderList');
          }
          if (role == 'b') {
          this.props.navigation.navigate('BuyerHomeScreen');
          }
        }
        if (loading) {
          ToastAndroid.showWithGravity(
            'loading...',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      } catch (e) {
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
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Content style={{backgroundColor: 'transparent'}}>
          <ImageBackground
            source={LoginScreenBackgroundImage}
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
                  style={{color: 'white', fontSize: 16}}
                  changeText={e => this.setState({email: e})}
                  Image={'mail'}
                  iconStyle={{color: 'red'}}
                />
                <IconInputFiled
                  placeholder="Password"
                  style={{color: 'white', fontSize: 16}}
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
                <Text style={{marginTop: -10, color: 'white'}}>OR</Text>
                <Divider
                  style={{width: '45%', borderWidth: 1, borderColor: 'red'}}
                />
              </View>
              <TouchableOpacity
                style={{alignItems: 'center'}}
                onPress={() => navigate('SignUp')}>
                <Text style={{textDecorationLine: 'underline', color: 'white'}}>
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
