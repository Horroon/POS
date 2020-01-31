import React, {Component} from 'react';
import {View} from 'react-native';
import {
  LoginButton,
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
import {ReactNativeFile} from 'apollo-upload-client';

import {SendSocialLoginInfoOnServer_Method} from './sendsocialLoginInfoOnServer_Method';

const FacebookManager = dispatch => {
  LoginManager.logInWithPermissions([
    'email',
    'user_friends',
    'public_profile',
  ]).then(
    result => {
      if (result.isCancelled) {
        alert('Login was cancelled');
      } else {
        CallAsync(dispatch);
      }
    },
    error => {
      alert('Login failed with error: ' + error);
    },
  );
};

const CallAsync = async dispatch => {
  const data = await AccessToken.getCurrentAccessToken();
  const userInfo = new GraphRequest(
    'me?fields=id,name,email,picture.type(large)',
    null,
    (Error, Response) => {
      if (Error) {
        console.log('facebook Error', Error);
      } else {
        console.log('facebook response ', Response);
        const {name, email, picture} = Response;
        const fname = name.split(' ')[0];
        const lname = name.split(' ')[1];
        /* 
        const file = new ReactNativeFile({
          uri: picture.data.url,
          name: 'social_image',
          type: 'image/png',
        }); */
        SendSocialLoginInfoOnServer_Method(
          picture.data.url,
          fname,
          lname,
          email,
          dispatch,
        );
        return Response;
      }
    },
  );
  new GraphRequestManager().addRequest(userInfo).start();
};
export {FacebookManager};
