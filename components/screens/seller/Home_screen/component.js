import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {View, Text} from 'native-base';
import {useQuery} from 'react-apollo';
import gql from 'graphql-tag';
function CustomComponent(props) {
  const {data, loading, error} = useQuery(gql`
    {
      login(email: "horroona@gmail.com", password: "123123") {
        fname
      }
    }
  `);

  console.log('data is ', data, ' error ', error, ' loading ', loading);
  return (
    <TouchableOpacity style={props.style}>
      <Image source={props.image} />
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
}

export default CustomComponent;
