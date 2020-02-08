import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import InstagramLogin from 'react-native-instagram-login';
import {Button} from 'react-native-elements';

class InstaLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  successFunction = data => {
    console.log('data is ', data);
  };

  render() {
    return (
      <View style={{paddingVertical: 10}}>
        <Button
          title="Login with Instagram"
          icon={
            <Icon
              name="logo-instagram"
              style={{paddingRight: 10, color: 'white'}}
            />
          }
          buttonStyle={{
            width: '100%',
            height: 50,
            borderRadius: 25,
            backgroundColor: '#3f729b',
          }}
          titleStyle={{color: 'white'}}
          onPress={() => this.instagramLogin.show()}
        />
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          appId="117427112986442"
          appSecret="b2255fa3cc55dc4616aadb8b85321753"
          redirectUrl="home"
          scopes={['user_profile', 'user_media']}
          onLoginSuccess={this.successFunction}
          onLoginFailure={data => console.log('Failure response: ', data)}
        />
      </View>
    );
  }
}

export {InstaLogin};
