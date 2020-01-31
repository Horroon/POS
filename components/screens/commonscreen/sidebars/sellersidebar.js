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
import client, {mylink} from '../../apollo_config/config';
import LoaderModal from '../../commonscreen/loadingmodel/index';
import {showMessage} from 'react-native-flash-message';
import gql from 'graphql-tag'

const height = Dimensions.get('window').height;
class HomeSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      person: {
        fname: '',
        lname: '',
        email: '',
        profile: '',
      },
    };
  }

  componentDidMount() {
    this.profileData();
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
        this.setState({person: data.profileData});
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
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
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
                textAlign:'center'
              }}>
              {this.state.person.fname}
              {/*  */} {this.state.person.lname}
            </Text>
            <Text style={{color: 'white', marginTop: 3, textAlign:'center'}}>
              {this.state.person.email}
            </Text>
          </ImageBackground>
          <ScrollView style={{height: height - 250 - 80}}>
            {/* Make plan row */}
            <TouchableHighlight
              style={{borderBottomWidth: 1, borderColor: 'gray'}}
              onPress={() => {
                this.props.navigation.navigate('SellerOrderList');
                console.log('navigations ', this.props.navigation);
              }}>
              <Card transparent>
                <CardItem style={{backgroundColor: 'black'}}>
                  <Icon active name="ios-car" style={{color: 'white'}} />
                  <Text style={{color: 'white'}}>My Spareparts</Text>
                </CardItem>
              </Card>
            </TouchableHighlight>
            {/* Make plan row end */}

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

            {/* timeline row end */}
            <TouchableHighlight
              style={{borderBottomWidth: 1, borderColor: 'gray'}}
              onPress={() => {
                this.props.navigation.navigate('AddProduct');
              }}>
              <Card transparent>
                <CardItem style={{backgroundColor: 'transparent'}}>
                  <Icon style={{color: 'white'}} active name="ios-add" />
                  <Text style={{color: 'white'}}>Add New Sparepart</Text>
                </CardItem>
              </Card>
            </TouchableHighlight>
            {/* timeline row end */}

            {/* logout row end */}
            <TouchableHighlight
              style={{borderBottomWidth: 1, borderColor: 'gray'}}
              onPress={() => {
                AsyncStorage.removeItem('token');
                AsyncStorage.removeItem('role');
                this.props.navigation.navigate('SplashScreen');
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

export default HomeSideBar;
