import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import {IconInputFiled} from '../../../customMaterial/InputField/Icon_InputField';
import {CustomButton} from '../../../customMaterial/Button/index';
import {Button, Divider} from 'react-native-elements';
import {styles} from './style';
import {showMessage, hideMessage} from 'react-native-flash-message';
import SignupScreenBackground from '../../../../assests/signUpScreenBackground.jpg';
import client from '../../apollo_config/config';
import gql from 'graphql-tag';
import Upload_Image from '../../../../assests/upload_image.png';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';

const options = {
  title: 'Select Profile Picture',
};

export default class SignUpComponent extends Component {
  //header data
  static navigationOptions = {
    title: 'login',
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      fname: '',
      lname: '',
      email: '',
      password: '',
      repassword: 'sd',
      mobile: '',
      address: '',
      city: '',
      country: '',
      profile: '',
    };
  }

  sendDataOnServer = async () => {
    if (
      this.state.email &&
      this.state.password &&
      this.state.fname &&
      this.state.lname &&
      this.state.mobile &&
      this.state.address &&
      this.state.city &&
      this.state.country &&
      this.state.profile
    ) {
      if (this.state.password == this.state.repassword) {
        try {
          const role = await AsyncStorage.getItem('role');
          this.setState({loader: true});
          const {data, errors, loading} = await client.mutate({
            mutation: gql`
              mutation SignUp(
                $fname: String!
                $lname: String!
                $email: String!
                $password: String!
                $mobile: String!
                $address: String!
                $city: String!
                $country: String!
                $role: String!
                $profile: String!
              ) {
                signup(
                  fname: $fname
                  lname: $lname
                  email: $email
                  password: $password
                  mobile: $mobile
                  address: $address
                  city: $city
                  country: $country
                  role: $role
                  profile: $profile
                ) {
                  fname
                  role
                }
              }
            `,
            variables: {
              fname: this.state.fname.replace(' ', ''),
              lname: this.state.lname.replace(' ', ''),
              email: this.state.email.replace(' ', ''),
              password: this.state.password.replace(' ', ''),
              address: this.state.address,
              city: this.state.city.replace(' ', ''),
              country: this.state.country.replace(' ', ''),
              mobile: this.state.mobile.replace(' ', ''),
              profile: this.state.profile,
              role: role ? role : 'b',
            },
          });

          if (loading) {
            this.setState({loader: loading});
          }
          if (!loading) {
            this.setState({loader: loading});
          }

          if (data) {
            showMessage({
              message: 'Successfully Created',
              type: 'success',
            });

            if (role == 's' || data.role == 's') {
              this.props.navigation.navigate('SellerHomeScreen');
            }
            if (role == 'b' || data.role == 'b') {
              this.props.navigation.navigate('BuyerHomeScreen');
            }
          }
        } catch (e) {
          console.log('error', e);
          if (e.graphQLErrors[0]) {
            this.setState({loader: false});
            showMessage({
              message: e.graphQLErrors[0].message,
              type: 'danger',
            });
          }

          if (e.networkError) {
            this.setState({loader: false});
            //console.log('error ', e.networkError);
            showMessage({
              message: 'Network Problem! ',
              type: 'danger',
            });
          }
        }
      } else {
        showMessage({
          message: 'Password Not Matched',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Please Enter Data In All Fields',
        type: 'danger',
      });
    }
  };

  OpenImagePicker = async () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        showMessage({message: response.error, type: 'danger'});
      } /* else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }  */ else {
        // const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        console.log('file is ', response);
        this.setState({
          profile: 'data:image/jpeg;base64,' + response.data,
        });
      }
    });
  };

  //pick file

  PickFile = async () => {
    // Pick a single file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({profile: JSON.stringify(res)});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  //render screen
  render() {
    const {navigate} = this.props.navigation;
    let Image_URl =
      this.state.profile === '' ? Upload_Image : {uri: this.state.profile};
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <ImageBackground
            source={SignupScreenBackground}
            style={{width: '100%', height: '100%'}}>
            <View style={styles.con1}>
              <View style={{height: 100}}>
                <TouchableOpacity onPress={this.OpenImagePicker}>
                  <Image source={Image_URl} style={styles.con1Img1} />
                </TouchableOpacity>
              </View>
              <Text style={{fontSize: 20, color: 'white'}}>Create Account</Text>
            </View>
            <View style={styles.con2}>
              <View style={styles.con2Con1}>
                <IconInputFiled
                  style={{color: 'white', fontSize: 16}}
                  placeholder="First Name"
                  changeText={e => this.setState({fname: e})}
                  Image={'person'}
                  iconStyle={{color: 'red'}}
                />

                <IconInputFiled
                  style={{color: 'white', fontSize: 16}}
                  placeholder="Last Name"
                  changeText={e => this.setState({lname: e})}
                  Image={'person'}
                  iconStyle={{color: 'red'}}
                />

                <IconInputFiled
                  style={{color: 'white', fontSize: 16}}
                  placeholder="Email Address"
                  changeText={e => this.setState({email: e})}
                  Image={'mail'}
                  iconStyle={{color: 'red'}}
                />

                <IconInputFiled
                  style={{color: 'white', fontSize: 16}}
                  placeholder="Password"
                  changeText={e => this.setState({password: e})}
                  Image={'ios-key'}
                  iconStyle={{color: 'red'}}
                  password={true}
                />

                <IconInputFiled
                  style={{color: 'white', fontSize: 16}}
                  placeholder="repassword"
                  changeText={e => this.setState({repassword: e})}
                  Image={'ios-key'}
                  iconStyle={{color: 'red'}}
                  password={true}
                />

                <IconInputFiled
                  style={{color: 'white', fontSize: 16}}
                  placeholder="Mobile"
                  changeText={e => this.setState({mobile: e})}
                  Image={'call'}
                  iconStyle={{color: 'red'}}
                />

                <IconInputFiled
                  style={{color: 'white', fontSize: 16}}
                  placeholder="address"
                  changeText={e => this.setState({address: e})}
                  iconStyle={{color: 'red'}}
                />

                <IconInputFiled
                  style={{color: 'white', fontSize: 16}}
                  placeholder="city"
                  changeText={e => this.setState({city: e})}
                  iconStyle={{color: 'red'}}
                />

                <IconInputFiled
                  style={{color: 'white', fontSize: 16}}
                  placeholder="country"
                  changeText={e => this.setState({country: e})}
                  iconStyle={{color: 'red'}}
                />
              </View>
            </View>
            <View style={styles.con3}>
              <View style={{margin: 22, justifyContent: 'space-between'}}>
                <Button
                  title="Sign Up"
                  loading={this.state.loader}
                  style={{height: 50}}
                  buttonStyle={{backgroundColor: 'red'}}
                  onPress={this.sendDataOnServer}
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
                onPress={() => navigate('Login')}>
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    textDecorationColor: 'red',
                    color: 'white',
                  }}>
                  Already Have An Account
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </ScrollView>
      </View>
    );
  }
}
