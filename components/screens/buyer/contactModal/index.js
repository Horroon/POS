import React from 'react';
import {Image} from 'react-native';
import {Container, Content, Text, View, Icon} from 'native-base';
import {Overlay} from 'react-native-elements';
import UserProfile from '../../../../assests/login.png';

function ContactModal(props) {
  return (
    <Overlay
      isVisible={props.isVisible}
      onBackdropPress={() => props.onBackdropPress()}
      width={306}
      windowBackgroundColor={'#000000cc'}
      >
          <View style={{flex: 1}}>
            <View
              style={{
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
                width: 306,
                marginTop: -10,
                alignSelf: 'center',
              }}>
              <Image
                source={UserProfile}
                style={{height: 80, width: 80, borderRadius: 40}}
              />
              <Text style={{fontSize: 20, marginTop: 15}}>Ali Nasir</Text>
            </View>
            <View style={{alignItems: 'center', marginVertical: 10}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: 'gray',
                  textAlign: 'center',
                }}>
                In case Of query! Please contact at.
              </Text>
            </View>
            <View
              style={{
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 10,
                  width: '60%',
                  justifyContent: 'space-around',
                }}>
                <Icon
                  name="mail"
                  style={{fontSize: 24, marginRight: 10, color: 'red'}}
                />
                <Text style={{fontSize: 18, color: 'gray'}}>ads@gmail.com</Text>
              </View>

              <View style={{flexDirection: 'row', marginBottom: 10}}>
                <Icon
                  name="ios-call"
                  style={{fontSize: 24, marginRight: 10, color: 'red'}}
                />
                <Text style={{fontSize: 18, color: 'gray'}}>+923454211980</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  height: 85,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                    color: 'gray',
                    fontSize: 12,
                  }}>
                  PARTSWHEEL.COM is an online service that provides you the
                  facility to buy all types of spare parts for your luxury
                  convince like cars etc.
                </Text>
              </View>
            </View>
          </View>
    </Overlay>
  );
}

export default ContactModal;
