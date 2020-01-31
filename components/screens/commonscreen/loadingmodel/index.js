import React, {Component} from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  Modal,
  TouchableHighlight,
} from 'react-native';

const ScreenHeight = Dimensions.get('screen').height;

function LoaderModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.state.modalVisible}
      onRequestClose={() => {
        props.setState({modalVisible: false});
      }}>
      <View
        style={{
          height: ScreenHeight,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#22222273',
        }}>
        <View
          style={{
            height: 80,
            width: '90%',
            backgroundColor: 'white',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('../../../../assests/loader.gif')}
            style={{height: 80, width: 80}}
          />
        </View>
      </View>
    </Modal>
  );
}

export default LoaderModal