import React from 'react';
import {StatusBar, View} from 'react-native';
import {
  Container,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem,
} from 'native-base';
import CustomComponent from './component';
import customerspng from '../../../../assests/customers.png';
import salespng from '../../../../assests/sales.png';
import supplierspng from '../../../../assests/suppliers.png';
import itempng from '../../../../assests/items.png';
import reportpng from '../../../../assests/reports.png';
import receivingpng from '../../../../assests/receivings.png';
import expensespng from '../../../../assests/expenses.png';
import expensescategrypng from '../../../../assests/expenses_categories.png';
import cachuppng from '../../../../assests/cashups.png';
import messagespng from '../../../../assests/messages.png';
import itemkitpng from '../../../../assests/item_kits.png';
import giftcard from '../../../../assests/giftcards.png';
import Header from '../Header/index';
export default class HomeScreen extends React.Component {
  openDrawer = () => {
    this.props.navigation.openDrawer();
  };
  render() {
    return (
      <Container>
        <Header
          style={{backgroundColor: 'black', borderBottomWidth: 0}}
          iconName="menu"
          headerMethod={() => alert('o wao')}
          iconStyle={{}}
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
        <Content padder>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: 540,
            }}>
            <View
              style={{justifyContent: 'space-around', flexDirection: 'row'}}>
              <CustomComponent
                text="customers"
                image={customerspng}
                style={{alignItems: 'center'}}
              />
              <CustomComponent
                text="sales"
                image={salespng}
                style={{alignItems: 'center'}}
              />
              <CustomComponent
                text="suppliers"
                image={supplierspng}
                style={{alignItems: 'center'}}
              />
            </View>
            <View
              style={{justifyContent: 'space-around', flexDirection: 'row'}}>
              <CustomComponent
                text="Items"
                image={itempng}
                style={{alignItems: 'center'}}
              />
              <CustomComponent
                text="Reports"
                image={reportpng}
                style={{alignItems: 'center'}}
              />
              <CustomComponent
                text="Receiving"
                image={receivingpng}
                style={{alignItems: 'center'}}
              />
            </View>
            <View
              style={{justifyContent: 'space-around', flexDirection: 'row'}}>
              <CustomComponent
                text="Expenses"
                image={expensespng}
                style={{alignItems: 'center'}}
              />
              <CustomComponent
                text="Exp Category"
                image={expensescategrypng}
                style={{alignItems: 'center'}}
              />
              <CustomComponent
                text="cashups"
                image={cachuppng}
                style={{alignItems: 'center'}}
              />
            </View>
            <View
              style={{justifyContent: 'space-around', flexDirection: 'row'}}>
              <CustomComponent
                text="Messages"
                image={messagespng}
                style={{alignItems: 'center'}}
              />
              <CustomComponent
                text="Item kits"
                image={itemkitpng}
                style={{alignItems: 'center'}}
              />
              <CustomComponent
                text="giftcard"
                image={giftcard}
                style={{alignItems: 'center'}}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
