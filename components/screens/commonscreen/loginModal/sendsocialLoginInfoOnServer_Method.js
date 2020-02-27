import React from 'react';
import {AsyncStorage} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import client from '../../apollo_config/config';
import gql from 'graphql-tag';

async function SendSocialLoginInfoOnServer_Method(
  fileURL,
  fname,
  lname,
  email,
  dispatch,
) {
  const changeLoginModalStatus = () => {
    dispatch({type: 'loginModal', payload: false});
  };

  const loginData_Action = data => {
    dispatch({type: 'loginData', payload: data});
  };

  try {
    console.log('file become', fileURL);
    const {data, errors} = await client.mutate({
      mutation: gql`
        mutation SocialLogin(
          $email: String!
          $fname: String!
          $lname: String!
          $profileURL: String!
        ) {
          sociallogin(
            email: $email
            fname: $fname
            lname: $lname
            profileURL: $profileURL
          ) {
            id
            email
            AuthToken
          }
        }
      `,
      variables: {
        email: email,
        fname: fname,
        lname: lname,
        profileURL: fileURL,
      },
    });

    if (data) {
      changeLoginModalStatus();
      showMessage({
        message: 'LOGIN SUCCESSFULLY',
        type: 'success',
      });

      //data for redux store
      let loginData = {};
      loginData.token = data.sociallogin.AuthToken;
      loginData.lgn_email = data.sociallogin.email;
      loginData.lgn_Id = data.sociallogin.id;

      //dispatch data to store
      loginData_Action(loginData);
      // Async data
      AsyncStorage.setItem('lgn_Id', data.sociallogin.id);
      AsyncStorage.setItem('token', data.sociallogin.AuthToken);
      AsyncStorage.setItem('lgn_email', data.sociallogin.email);
      console.log('token', data.sociallogin.AuthToken);
    }
  } catch (e) {
    changeLoginModalStatus();
    console.log('grapgql error', e);
    if (e.graphQLErrors[0]) {
      // this.setState({loader: false});
      showMessage({
        message: e.graphQLErrors[0].message,
        type: 'danger',
      });
    }
    if (e.networkError) {
      //  this.setState({loader: false});
      console.log('error ', e.networkError);
      showMessage({
        message: 'Network Problem!',
        type: 'danger',
      });
    }
  }
}

export {SendSocialLoginInfoOnServer_Method};
