import React, {Component, useState} from 'react';
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
  Badge,
} from 'native-base';
import ContactModal from '../../buyer/contactModal/index';

import {TouchableOpacity} from 'react-native';

function HeaderComponent(props) {
  const [isModalVisible, setModalVisibility] = useState(false);

  const _changeModalVisibility = () => {
    setModalVisibility(!isModalVisible);
  };

  return (
    <React.Fragment>
      <Header style={props.style}>
        <Left>
          <Button transparent onPress={() => props.headerMethod()}>
            <Icon name={props.iconName} style={props.iconStyle} />
          </Button>
        </Left>
        <Body>
          <Title style={{fontSize: 14}}>{props.children}</Title>
        </Body>
        <Right style={{justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={() => _changeModalVisibility()}>
            <Icon name="ios-call" style={{fontSize: 25, color: 'white'}} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Profile')}>
            <Icon name="person" style={{fontSize: 25, color: 'white'}} />
          </TouchableOpacity>
        </Right>
      </Header>
      <ContactModal
        isVisible={isModalVisible}
        onBackdropPress={_changeModalVisibility}
      />
    </React.Fragment>
  );
}

export default HeaderComponent;
