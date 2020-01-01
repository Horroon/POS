import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Container, View, Text, Content, Icon} from 'native-base';
import Logo from '../../../assests/logo.png';
//import {useQuery} from 'react-apollo';
import Client from '../apollo_config/config';
import gql from 'graphql-tag';

import Splashscreenbackground from '../../../assests/spashscreenbackground.jpg';

const ScreenHeight = Math.round(Dimensions.get('screen').height);

const SplashScreen = props => {
  const lquery = gql`
    query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        fname
        lname
      }
    }
  `;

  const getAsynData = async () => {
    const role = await AsyncStorage.getItem('role');
    const login = await AsyncStorage.getItem('login');
    if (login) {
      console.log('login exists', role);
      if (role == 'seller') {
        props.navigation.navigate('SellerHomeScreen');
      }
      if (role == 'buyer') {
        props.navigation.navigate('BuyerHomeScreen');
      }
    }
  };

  useEffect(() => {
    getAsynData();
  }, []);

  return (
    <Container>
      <Content
        style={{backgroundColor: 'transparent'}}
        contentContainerStyle={{alignItems: 'center'}}>
        <ImageBackground
          source={Splashscreenbackground}
          style={{
            width: '100%',
            height: ScreenHeight - 24,
            alignItems: 'center',
          }}
          resizeMode={'cover'}>
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}>
            <View style={{alignItems: 'center', height: 350, justifyContent:'center'}}>
              <Image source={Logo} style={{height: 220, width: 180}} />
            </View>
            <View
              style={{
                height: 150,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  height: 50,
                  borderRadius: 5,
                }}
                onPress={() => {
                  props.navigation.navigate('Login');
                  AsyncStorage.setItem('role', 'b');
                }}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  Buyer_Login
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  backgroundColor: 'red',
                  height: 50,
                  borderRadius: 5,
                }}
                onPress={() => {
                  props.navigation.navigate('Login');
                  AsyncStorage.setItem('role', 's');
                }}>
                <Text style={{textAlign: 'center', color: 'white'}}>
                  Seller_Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Content>
    </Container>
  );
};

export default SplashScreen;
