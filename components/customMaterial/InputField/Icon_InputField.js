import React, {Component} from 'react';
import {View, TextInput, Image} from 'react-native';
import {Icon} from 'native-base';
import {styles} from './style';

const IconInputFiled = props => {
  return (
    <View style={styles.container}>
      <View style={styles.SectionStyle}>
        {/* <Image source={props.Image} style={styles.ImageStyle} /> */}
        {props.Image && (
          <Icon
            name={`${props.Image}`}
            style={{...styles.ImageStyle, ...props.iconStyle}}
          />
        )}
        <TextInput
          style={{flex: 1, ...props.style}}
          placeholder={props.placeholder}
          placeholderTextColor={'black'}
          secureTextEntry={props.password ? props.password : false}
          // underlineColorAndroid="transparent"
          onChangeText={e => props.changeText(e)}
        />
      </View>
    </View>
  );
};

export {IconInputFiled};
