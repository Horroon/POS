import React, {useState} from 'react';
import {View, Text, InputGroup, Input, Footer, Icon} from 'native-base';
import {TouchableOpacity} from 'react-native';

function chat_input(props) {
  const [message, setMessage] = useState();

  return (
    <Footer
      style={{
        backgroundColor: 'white',
        borderTopColor: 'gray',
        borderTopWidth: 1,
      }}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{maxWidth: '85%'}}>
          <Input
            value={message}
            placeholder={'Type Message...'}
            onChangeText={e => {
              setMessage({id: 1, message: e, sender: 23, receiver: 23});
            }}
          />
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (message) {
                const {chats} = props.state;
                chats.push(message);
                props.setState({chats: chats});
                setMessage('');
              }
            }}>
            <Icon name="ios-send" style={{fontSize: 35}} />
          </TouchableOpacity>
        </View>
      </View>
    </Footer>
  );
}
export default chat_input;
