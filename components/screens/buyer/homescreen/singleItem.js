import React from 'react';
import {
  View,
  Text,
  Container,
  Content,
  ListItem,
  Badge,
  Icon,
} from 'native-base';
import {ImageBackground, TouchableHighlight, TouchableOpacity} from 'react-native';
import {mylink} from '../../apollo_config/config';

const SingleItem = props => {
  console.log('props :', props);
  return (
    <TouchableOpacity
      style={{
        width: props.width,
        height: props.height,
        margin: 10,
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor:'transparent',
      }}
      onPress={() => props.selectedItemIdUpdateMethod(props.item)}>
      <View>
        <ImageBackground
          source={{uri: mylink + props.item.pictures[0].url}}
          style={{height: 120, width: '100%'}}
          fadeDuration={400}
          resizeMode={'stretch'}>
          <View>
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    width: '50%',
                    flexDirection: 'row',
                  }}>
                  <Badge style={{borderRadius: 0, backgroundColor: 'orange'}}>
                    <Text style={{fontSize: 12}}>Featured</Text>
                  </Badge>
                </View>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'flex-end',
                    paddingHorizontal: 2,
                  }}>
                  <Icon name="ios-heart-empty" style={{color:'red'}} />
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{height: '40%', padding: 2, justifyContent: 'space-between'}}>
          <View style={{width: '50%', height: '50%'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              {props.item.price}
            </Text>
            <Text style={{flexWrap: 'nowrap', fontSize: 12}}>
              {props.item.name}
            </Text>
          </View>
          <View
            style={{
              height: '50%',
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'flex-end',
            }}>
            <View style={{flexDirection: 'row', paddingHorizontal: 1}}>
              <Icon name="ios-pin" style={{fontSize: 12, paddingTop: 2}} />
              <Text style={{fontSize: 12, paddingLeft: 2}}>
                {props.item.location.city}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 12,
                  paddingHorizontal: 4,
                  paddingBottom: 2,
                }}>
                Today
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SingleItem;
