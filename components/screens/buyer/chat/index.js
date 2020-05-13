import React, {useReducer, useEffect} from 'react';
import {Container, Content, View, Text} from 'native-base';
import {ScrollView} from 'react-native';
import Header from '../header/index';
import ChatItem from './chat_Item';
import Chat_Input from './chat_input';
import {showMessage, hideMessage} from 'react-native-flash-message';
import client from '../../apollo_config/config';
import {useSubscription, useMutation} from 'react-apollo';
import {Bring_Chat_Subscription, Create_Message} from './chat-queries';

const InitialState = {
  chats: [
    {id: 12, message: 'Hello everyone', sender: 23, receiver: 23},
    {id: 12, message: 'Hello everyone', sender: 23, receiver: 23},
    {id: 12, message: 'Hello everyone', sender: 23, receiver: 23},
  ],
  newChat: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'chats':
      return {...state, chats: action.payload};
    case 'newChat':
      return {...state, newChat: action.payload};
    default:
      return {...state};
  }
};

function ChatScreen(props) {
  const [state, setState] = useReducer(reducer, InitialState);
  const [createMessage, {data}] = useMutation(Create_Message);
  let scrollView = React.createRef();

  const getChatFromServer = () => {
    try {
      const {} = client.subscribe({});
    } catch (e) {
      if (e.graphQLErrors[0]) {
        showMessage({
          message: e.graphQLErrors[0].message,
          type: 'danger',
        });
      }
      if (e.networkError) {
        console.log('error ', e.networkError);
        showMessage({
          message: 'Network Problem!',
          type: 'danger',
        });
      }
    }
  };

  const sendChatOnServer = () => {
    const {chats, newChat} = state;
    /*     createMessage({
      variables: {
        sender: 'ck6yownfp00460792tcewenmw',
        receiver: 'ck6yownfp00460792tcewenmw',
        message: state.newChat.message,
      },
    }); */
    //this method sends chat on server
    console.log(newChat);
    chats.push(newChat);
    setState({type: 'chats', payload: chats});
  };

  console.log('message:- ', data);
  return (
    <Container>
      <Header
        style={{backgroundColor: 'black'}}
        iconName="ios-arrow-round-back"
        iconStyle={{color: 'white', fontSize: 36}}
        headerMethod={() => props.navigation.goBack()}
        navigation={props.navigation}>
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
        ref={ref => (scrollView = ref)}
        onContentSizeChange={() => {
          scrollView.scrollToEnd({animated: false});
        }}>
        <View style={{paddingHorizontal: '2%'}}>
          {state.chats.length > 0 ? (
            state.chats.map(chatObj => {
              return <ChatItem key={chatObj.id} obj={chatObj} />;
            })
          ) : (
            <Text>No Chat</Text>
          )}
        </View>
      </ScrollView>
      <Chat_Input
        state={state}
        setState={setState}
        sendChatOnServer={sendChatOnServer}
      />
    </Container>
  );
}

export default ChatScreen;
