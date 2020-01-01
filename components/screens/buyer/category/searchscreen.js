import React,{useState} from 'react';
import {SearchBar} from 'react-native-elements';

const SearchBarComponent = () => {

const [search,setState] = useState('')
 const updateSearch = search => {
    setState({search});
  };

  return (
    <SearchBar
      containerStyle={{backgroundColor:'white', borderBottomWidth: 0, borderTopWidth: 0}}
      inputContainerStyle={{backgroundColor:'white',borderWidth: 2,borderBottomWidth: 2, borderColor:'red',borderRadius: 5, width: '103%', alignSelf:'center'}}
      placeholder="Search..."
      onChangeText={updateSearch}
      value={search}
      showLoading={false}
    />
  );
};

export default SearchBarComponent;
