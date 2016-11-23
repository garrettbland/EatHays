import React from 'react';
import { View, TextInput } from 'react-native';

const SearchBar = (props) => (
  <View style={{padding: 8, flexDirection:'row', alignItems:'center', backgroundColor:'#C1C1C1'}}>
    <TextInput
      style={{flex: 1, height: 30, paddingHorizontal: 8, fontSize: 15, backgroundColor:'#FFFFFF', borderRadius:2,}}
      placeholder="Search..."
      onChangeText={(text) => console.log('searching for ', text)}
    />
  </View>
);

export default SearchBar;
