import React, {useEffect, useReducer} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
} from 'react-native';
import {Card, CardItem, Container, Content, Icon, Button} from 'native-base';
import {Input} from 'react-native-elements';
import Header from '../../buyer/header/index';
import User from '../../../../assests/login.png';
import client, {mylink} from '../../apollo_config/config';
import LoaderModal from '../../commonscreen/loadingmodel/index';
import {showMessage} from 'react-native-flash-message';
import gql from 'graphql-tag';

const InitialState = {
  modalVisible: false,
  person: {
    fname: '',
    lname: '',
    address: '',
    mobile: '',
    email: '',
    profile: '',
    city: '',
  },
  isUpdate: false,
  isLogin: false,
};

//reducer method start
const reducer = (state, action) => {
  console.log('cal---');
  switch (action.type) {
    case 'fname':
      return {
        ...state,
        person: {...state.person, fname: action.payload},
        isUpdate: true,
      };
    case 'lname':
      return {
        ...state,
        person: {...state.person, lname: action.payload},
        isUpdate: true,
      };
    case 'email':
      return {
        ...state,
        person: {...state.person, email: action.payload},
        isUpdate: true,
      };
    case 'address':
      return {
        ...state,
        person: {...state.person, address: action.payload},
        isUpdate: true,
      };
    case 'mobile':
      return {
        ...state,
        person: {...state.person, mobile: action.payload},
        isUpdate: true,
      };
    case 'city':
      return {
        ...state,
        person: {...state.person, city: action.payload},
        isUpdate: true,
      };
    case 'isUpdate':
      return {...state, isUpdate: action.payload};

    case 'person':
      return {...state, person: action.payload};
    case 'modalVisible':
      return {...state, modalVisible: action.payload};
    default:
      return {...state};
  }
};
//reducer method end

const Profile = props => {
  const [state, setState] = useReducer(reducer, InitialState);

  //UpdateProfileMethod start
  const UpdateProfileMethod = async () => {
    if (
      state.person.fname !== '' &&
      state.person.lname !== '' &&
      state.person.mobile !== '' &&
      state.person.address !== '' &&
      state.person.city !== ''
    ) {
      try {
        setState({type: 'modalVisible', payload: true});
        const {data} = await client.mutate({
          mutation: gql`
            mutation updatePersonProfile(
              $email: String!
              $fname: String!
              $lname: String!
              $mobile: String!
              $city: String!
            ) {
              updatePersonProfile(
                email: $email
                fname: $fname
                lname: $lname
                mobile: $mobile
                city: $city
              ) {
                id
                fname
                lname
                email
                mobile
                profile
                address
                city
                country
              }
            }
          `,
          variables: {
            ...state.person,
          },
        });
        console.log('data came after profile update', data.updatePersonProfile);
        setState({type: 'modalVisible', payload: false});
        if (data) {
          setState({type: 'person', payload: data.updatePersonProfile});
          setState({type: 'isUpdate', payload: false});
        }
      } catch (e) {
        console.log('eer ', e);
        if (e.graphQLErrors[0]) {
          setState({type: 'modalVisible', payload: false});
          showMessage({
            message: e.graphQLErrors[0].message,
            type: 'danger',
          });
        }
        if (e.networkError) {
          setState({type: 'modalVisible', payload: false});
          //console.log('error ', e.networkError);
          showMessage({
            message: 'Network Problem!',
            type: 'danger',
          });
        }
      }
    } else {
      showMessage({
        message: 'There is empty field!',
        type: 'danger',
      });
    }
  }; //UpdateProfileMethod end

  const profileData = async () => {
    try {
      setState({type: 'modalVisible', payload: true});
      const {data, loading} = await client.query({
        query: gql`
          query {
            profileData {
              id
              fname
              lname
              email
              mobile
              profile
              address
              city
              country
            }
          }
        `,
        fetchPolicy: 'network-only',
      });

      setState({type: 'modalVisible', payload: loading});
      if (data) {
        setState({type: 'person', payload: data.profileData});
      }
    } catch (e) {
      console.log('eer ', e);
      if (e.graphQLErrors[0]) {
        setState({type: 'modalVisible', payload: false});
        showMessage({
          message: e.graphQLErrors[0].message,
          type: 'danger',
        });
      }
      if (e.networkError) {
        setState({type: 'modalVisible', payload: false});
        //console.log('error ', e.networkError);
        showMessage({
          message: 'Network Problem!',
          type: 'danger',
        });
      }
    }
  };

  useEffect(() => {
    profileData();
  }, []);
  console.log('state in profile is ', state);
  return (
    <Container>
      <Header
        style={{backgroundColor: 'black', borderBottomWidth: 0}}
        iconName="ios-arrow-round-back"
        headerMethod={() => props.navigation.goBack()}
        iconStyle={{fontSize: 36}}
        navigation={props.navigation}>
        <Text
          style={{
            fontFamily: 'fantasy',
            fontSize: 14,
            fontStyle: 'italic',
            fontWeight: 'bold',
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
          }}>
          .COM
        </Text>
      </Header>
      <Content>
        <ImageBackground
          source={require('../../../../assests/profile_background.jpg')}
          style={{
            height: 200,
            alignItems: 'center',
            paddingTop: 20,
            backgroundColor: 'rgba(66, 133, 244, 0.56)',
            paddingVertical: 10,
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: mylink + state.person.profile}}
            style={{height: 100, width: 100, borderRadius: 50}}
          />
          {/* 
          <Text style={{paddingTop: 10, fontSize: 20, color: 'white'}}>
            Ali Hamza
          </Text> */}
          {/* 
          <Input value="Ali Hamza"  inputContainerStyle={{borderBottomWidth:0, width: 100, alignItems:'center', alignSelf:'center'}} /> */}
        </ImageBackground>
        <View
          style={{
            paddingHorizontal: 5,
            shadowColor: 'green',
            shadowOffset: {width: 100, height: 20},
          }}>
          <View
            style={{flexDirection: 'row', marginTop: 10, borderColor: 'gray'}}>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', paddingHorizontal: 10}}>
              Profile:
            </Text>
          </View>

          <View
            style={{
              marginTop: 10,
            }}>
            <Input
              placeholder="First Name"
              leftIcon={
                <Icon
                  name="person"
                  style={{color: 'red', fontSize: 24, marginLeft: -15}}
                />
              }
              defaultValue={state.person.fname}
              onChangeText={e => {
                setState({type: 'fname', payload: e});
              }}
              rightIcon={
                <Icon name="ios-create" style={{color: 'gray', fontSize: 24}} />
              }
            />
          </View>

          <View
            style={{
              marginTop: 10,
            }}>
            <Input
              placeholder="Last Name"
              leftIcon={
                <Icon
                  name="person"
                  style={{color: 'red', fontSize: 24, marginLeft: -15}}
                />
              }
              defaultValue={state.person.lname}
              rightIcon={
                <Icon name="ios-create" style={{color: 'gray', fontSize: 24}} />
              }
              onChangeText={e => setState({type: 'lname', payload: e})}
            />
          </View>

          <View
            style={{
              marginTop: 10,
            }}>
            <Input
              placeholder="Email"
              leftIcon={
                <Icon
                  name="mail"
                  style={{color: 'red', fontSize: 24, marginLeft: -15}}
                />
              }
              defaultValue={state.person.email}
              rightIcon={
                <Icon name="ios-create" style={{color: 'gray', fontSize: 24}} />
              }
              disabled
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              borderColor: 'gray',
            }}>
            <Input
              placeholder="Phone"
              defaultValue={state.person.mobile}
              leftIcon={
                <Icon
                  name="ios-call"
                  style={{color: 'red', fontSize: 24, marginLeft: -15}}
                />
              }
              rightIcon={
                <Icon name="ios-create" style={{color: 'gray', fontSize: 24}} />
              }
              onChangeText={e => {
                setState({type: 'mobile', payload: e});
              }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              borderColor: 'gray',
            }}>
            <Input
              placeholder="Location"
              defaultValue={state.person.city}
              leftIcon={
                <Icon
                  name="ios-pin"
                  style={{color: 'red', fontSize: 24, marginLeft: -15}}
                />
              }
              rightIcon={
                <Icon name="ios-create" style={{color: 'gray', fontSize: 24}} />
              }
              onChangeText={e => {
                setState({type: 'city', payload: e});
              }}
            />
          </View>

          <View style={{paddingVertical: 10}}>
            <Button
              style={{
                width: '50%',
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}
              disabled={state.isUpdate ? false : true}
              onPress={UpdateProfileMethod}>
              <Text style={{color: 'white'}}>Update Profile</Text>
            </Button>
          </View>
        </View>
        <LoaderModal
          state={state}
          setState={obj => {
            setState({type: 'modalVisible', payload: obj.modalVisible});
          }}
        />
      </Content>
    </Container>
  );
};

export default Profile;
