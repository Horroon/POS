import React, {Component} from 'react';
import {
  Footer,
  Icon,
  FooterTab,
  Button as NativeBaseButton,
  Text,
} from 'native-base';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class FooterClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      user_id: '',
    };
  }

  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    const lgn_id = await AsyncStorage.getItem('lgn_Id');
    if (token) {
      this.setState({isLogin: true, user_id: lgn_id});
    } else {
      this.setState({isLogin: false});
    }
  };

  explore_Page = () => {
    this.props.navigation.navigate('chatScreen');
  };

  sell_Item_Page = () => {
    //if (this.props.store.BuyerReducer.token) {
      this.props.navigation.navigate('SellerOrderList');//AddProduct
    /* } else {
      this.props.loginModalAction(true);
    } */
  };

  myAdds_Page = () => {
    if (this.props.store.BuyerReducer.token) {
      this.props.navigation.navigate('UserAdds', {
        p_id: this.props.store.BuyerReducer.lgn_Id,
      });
    } else {
      this.props.loginModalAction(true);
    }
  };

  Account_Page = () => {
    if (this.props.store.BuyerReducer.token) {
      this.props.navigation.navigate('Profile');
    } else {
      this.props.loginModalAction(true);
    }
  };

  render() {
    return (
      <Footer style={{backgroundColor: 'black'}}>
        <FooterTab style={{backgroundColor: 'black'}}>
          <NativeBaseButton onPress={this.explore_Page}>
            <Icon name="ios-folder" />
            <Text>Explore</Text>
          </NativeBaseButton>
          <NativeBaseButton onPress={this.sell_Item_Page}>
            <Icon name="ios-camera" />
            <Text>Sell</Text>
          </NativeBaseButton>
          <NativeBaseButton onPress={this.myAdds_Page}>
            <Icon name="ios-document" />
            <Text>My Adds</Text>
          </NativeBaseButton>

          <NativeBaseButton onPress={this.Account_Page}>
            <Icon name="ios-person" />
            <Text>Account</Text>
          </NativeBaseButton>
        </FooterTab>
      </Footer>
    );
  }
}

const mapStateToProps = store => {
  return {store: store};
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      selectedItemIdUpdate: input => ({type: 'selectedItemId', payload: input}),
      loginModalAction: input => ({type: 'loginModal', payload: input}),
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FooterClass);
