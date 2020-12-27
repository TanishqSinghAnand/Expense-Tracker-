import React, { Component } from 'react';
import { View, Text , Image } from 'react-native';
import firebase from 'firebase'

const Header = (props) => {
  return (
    <View style={{ display:'flex',flexDirection:'row', backgroundColor:'#7ab54a',alignItems:'center',justifyContent:'center'}}>
      {/* <Image width={50} height={50} src={props.imageUrl}/> */}
      <Text style={{display:'flex',flexDirection:'row',flex:1,alignItems:'center',alignSelf:'center'}}> Hi , Tanishq</Text>
    </View>
  );
};

export default Header;