import React from 'react';
import {Container, Content, View, Text} from 'native-base';
import {ScrollView} from 'react-native';
import Header from '../header/index';
import ChatItem from './chat_Item';
import Chat_Input from './chat_input';

class ChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [
        {id: 12, message: 'Hello everyone', sender: 23, receiver: 23},
        {id: 12, message: 'Hello everyone', sender: 23, receiver: 23},
        {id: 12, message: 'Hello everyone', sender: 23, receiver: 23},
      ],
    };
  }

  render() {
    return (
      <Container>
        <Header
          style={{backgroundColor: 'black'}}
          iconName="ios-arrow-round-back"
          iconStyle={{color: 'white', fontSize: 36}}
          headerMethod={() => this.props.navigation.goBack()}
          navigation={this.props.navigation}>
          <Text
            style={{
              fontFamily: 'fantasy',
              fontSize: 14,
              fontStyle: 'italic',
              fontWeight: 'bold',
              color: 'white',
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
              color: 'white',
            }}>
            .COM
          </Text>
        </Header>
        <ScrollView
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({animated: false});
          }}>
          <View style={{paddingHorizontal: '2%'}}>
            {this.state.chats.length > 0 ? (
              this.state.chats.map(chatObj => {
                return <ChatItem key={chatObj.id} obj={chatObj} />;
              })
            ) : (
              <Text>No Chat</Text>
            )}
          </View>
        </ScrollView>
        <Chat_Input state={this.state} setState={obj => this.setState(obj)} />
      </Container>
    );
  }
}

export default ChatScreen;
