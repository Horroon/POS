import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {Card, CardItem, Container, Content, Icon, Button} from 'native-base';
import {Input} from 'react-native-elements';
import Header from '../../buyer/header/index';
import User from '../../../../assests/login.png';

const Profile = props => {
  return (
    <Container>
      <Header
        style={{backgroundColor: 'black', borderBottomWidth: 0}}
        iconName="ios-arrow-round-back"
        headerMethod={() => props.navigation.goBack()}
        iconStyle={{ fontSize: 36}}
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
        <View
          style={{
            height: 200,
            alignItems: 'center',
            paddingTop: 20,
            backgroundColor: 'rgba(66, 133, 244, 0.56)',
            paddingVertical: 10,
            justifyContent: 'center',
          }}>
          <Image
            source={User}
            style={{height: 100, width: 100, borderRadius: 50}}
          />
          {/* 
          <Text style={{paddingTop: 10, fontSize: 20, color: 'white'}}>
            Ali Hamza
          </Text> */}
          {/* 
          <Input value="Ali Hamza"  inputContainerStyle={{borderBottomWidth:0, width: 100, alignItems:'center', alignSelf:'center'}} /> */}
        </View>
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
              placeholder="Email"
              leftIcon={
                <Icon
                  name="mail"
                  style={{color: 'red', fontSize: 24, marginLeft: -15}}
                />
              }
              rightIcon={
                <Icon name="ios-create" style={{color: 'gray', fontSize: 24}} />
              }
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
              leftIcon={
                <Icon
                  name="ios-call"
                  style={{color: 'red', fontSize: 24, marginLeft: -15}}
                />
              }
              rightIcon={
                <Icon name="ios-create" style={{color: 'gray', fontSize: 24}} />
              }
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
              leftIcon={
                <Icon
                  name="ios-pin"
                  style={{color: 'red', fontSize: 24, marginLeft: -15}}
                />
              }
              rightIcon={
                <Icon name="ios-create" style={{color: 'gray', fontSize: 24}} />
              }
            />
          </View>
          <View style={{paddingVertical: 10}}>
            <Button  style={{width: '50%', alignSelf:'center', justifyContent:'center', backgroundColor:'red'}} disabled>
              <Text style={{color:'white'}}>Update Profile</Text>
            </Button>
          </View>
        </View>
      </Content>
    </Container>
  );
};

export default Profile;
