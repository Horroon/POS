import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Card, Badge, Icon} from 'native-base';
import spareImg1 from '../../../../assests/spr1.jpg';
const AprrovedOrder = item => {
  return (
    <Card>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '30%'}}>
          <Image
            source={spareImg1}
            style={{height: 100, width: '100%', padding: 3}}
          />
        </View>
        <View
          style={{
            flexDirection: 'column',
            paddingHorizontal: 5,
            width: '70%',
            justifyContent: 'space-around',
          }}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Badge>
              <Text style={{fontWeight: 'bold'}}>100 PKR</Text>
            </Badge>
            <Icon name="heart" style={{color: 'red'}} />
          </View>
          <View>
            <Text style={{fontSize: 13}}>
              Description khakdfh akdsfhkja kjasdjf
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="ios-pin" style={{fontSize: 16, color: 'gray'}} />
              <Text
                style={{
                  marginLeft: '2%',
                  fontStyle: 'italic',
                  color: 'gray',
                  paddingLeft: 4,
                  fontSize: 12,
                }}>
                Location
              </Text>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: '2%',
                  fontStyle: 'italic',
                  color: 'gray',
                  paddingLeft: 4,
                  fontSize: 12,
                }}>
                5 days ago
              </Text>
            </View>
          </View>

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={{padding: 3, backgroundColor: 'green', borderRadius: 5}}>
              <Text style={{color: 'white', fontStyle: 'italic'}}>
                Approved
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default AprrovedOrder;
