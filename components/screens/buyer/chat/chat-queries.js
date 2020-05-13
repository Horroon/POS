import gql from 'graphql-tag';

export const Bring_Chat_Subscription = gql`
  subscription newMessage($id: ID!) {
    newMessage(id: $id) {
      id
      message
    }
  }
`;

export const Create_Message = gql`
  mutation createMessage($sender: ID!, $receiver: ID!, $message: String!) {
    createMessage(sender: $sender, receiver: $receiver, message: $message) {
      id
      message
    }
  }
`;
