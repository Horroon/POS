import React, {useReducer, useEffect, useState} from 'react';
import {Container, Content, Header, Icon, Left, Body} from 'native-base';
import {View, Text, Dimensions, Image} from 'react-native';
import {Overlay, Button} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {FacebookManager} from './facebooklogin';

const ScreenHeight = Dimensions.get('window').height;

const LoginModal = () => {
  const storeState = useSelector(storeSate => storeSate);
  const dispatch = useDispatch();

  return (
    <Overlay
      isVisible={storeState.loginModal}
      onDismiss={() => dispatch({type: 'loginModal', payload: false})}
      onRequestClose={() => dispatch({type: 'loginModal', payload: false})}
      fullScreen
      overlayStyle={{padding: 0}}>
      <Container>
        <Header style={{elevation: 0, backgroundColor: '#fff'}}>
          <Left>
            <Icon
              name="ios-close"
              style={{fontSize: 50}}
              onPress={() => dispatch({type: 'loginModal', payload: false})}
            />
          </Left>
          <Body></Body>
        </Header>
        <Content>
          <View
            style={{
              height: ScreenHeight / 2 - 70,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../../assests/logo.png')}
              style={{height: 300, width: 200}}
            />
          </View>
          <View
            style={{
              height: ScreenHeight / 2 - 10,
              alignItems: 'center',
            }}>
            <View style={{paddingVertical: 10}}>
              <Button
                title="Login with Facebook"
                icon={
                  <Icon
                    name="logo-facebook"
                    style={{paddingRight: 10, color: 'white'}}
                  />
                }
                buttonStyle={{
                  width: '100%',
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#3b5998',
                }}
                titleStyle={{color: 'white'}}
                onPress={()=>FacebookManager(dispatch)}
              />
            </View>
            <View style={{paddingVertical: 10}}>
              <Button
                title="Login with Google"
                icon={
                  <Icon
                    name="logo-google"
                    style={{paddingRight: 10, color: 'white'}}
                  />
                }
                buttonStyle={{
                  width: '100%',
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#db4a39',
                }}
                titleStyle={{color: 'white'}}
              />
            </View>
          </View>
        </Content>
      </Container>
    </Overlay>
  );
};

export default LoginModal;
