import React from 'react';
import {View, Text, Image} from 'react-native';
import ChatInput from './chat_input';

function ChatComponent(props) {
  return (
    <View
      style={{
        borderRadius: 5,
        marginTop: 5,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        padding: 5,
      }}>
      <View style={{justifyContent: 'center', paddingHorizontal: 5}}>
        <Image
          style={{width: 25, height: 25, borderRadius: 12.5}}
          source={require('../../../../assests/person.jpg')}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: 'lightgray',
          borderColor: 'lightgray',
          padding: 5,
          borderRadius: 5,
        }}>
        <Text>{props.obj.message}</Text>
      </View>
    </View>
  );
}

export default ChatComponent;
