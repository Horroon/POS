import React from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Container, Content, Badge, Icon, Card, Item} from 'native-base';
import Header from '../header/index';
import spareImg1 from '../../../../assests/spr1.jpg';
import RejectedOrderComponent from './rejectedOrder';
import ApprovedOrderComponent from './approvedOrders';
import PendingOrderComponent from './pendingOrder';

class MainOrderClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {id: 1, component: PendingOrderComponent},
    };
  }

  componentDidMount() {
    this._setStateInitailTime();
  }

  //methods set key value when user comes on page
  _setStateInitailTime = () => {
    this._changeComponent(this.props.navigation.state.params.selectedItemKey);
  };

  _changeComponent = id => {
    const {selectedItem} = this.state;
    if (id === 1) {
      selectedItem.id = id;
      selectedItem.component = PendingOrderComponent;
    }
    if (id === 2) {
      selectedItem.id = id;
      selectedItem.component = ApprovedOrderComponent;
    }
    if (id === 3) {
      selectedItem.id = id;
      selectedItem.component = RejectedOrderComponent;
    }

    this.setState({selectedItem});
  };
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
            }}>
            .COM
          </Text>
        </Header>
        <View style={{flex: 1}}>
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'lightgreen',
                padding: 5,
                borderRadius: 5,
                borderBottomWidth: this.state.selectedItem.id === 1 ? 3 : 0,
              }}
              onPress={() => this._changeComponent(1)}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                Pending Orders
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'green',
                padding: 5,
                borderRadius: 5,
                borderBottomWidth: this.state.selectedItem.id === 2 ? 3 : 0,
              }}
              onPress={() => this._changeComponent(2)}>
              <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                Approved Orders
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: 'red',
                padding: 5,
                borderRadius: 5,
                borderBottomWidth: this.state.selectedItem.id === 3 ? 3 : 0,
              }}
              onPress={() => this._changeComponent(3)}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                Rejected Orders
              </Text>
            </TouchableOpacity>
          </View>
          <SafeAreaView
            style={{
              flex: 1,
              paddingVertical: 5,
              backgroundColor: 'black',
              paddingHorizontal: 3,
            }}>
            <FlatList
              data={[
                {id: 1, des: 'KAdfjaldkfja'},
                {id: 3, des: 'KAdfjaldkfja'},
                {id: 2, des: 'KAdfjaldkfja'},
                {id: 4, des: 'KAdfjaldkfja'},
                {id: 5, des: 'KAdfjaldkfja'},
                {id: 6, des: 'KAdfjaldkfja'},
              ]}
              extraData={true}
              keyExtractor={item => item.id.toString()}
              renderItem={item => this.state.selectedItem.component(item.item)}
            />
          </SafeAreaView>
        </View>
      </Container>
    );
  }
}

export default MainOrderClass;
