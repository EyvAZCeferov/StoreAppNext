import React from 'react';
import {View,Text} from 'react-native';


export default class ScannedResult extends React.Component{
  constructor(props){
    super(props)
    this.state={
      checkid:null,
      checks:null,
      edv:null,
      money:null,
    }
  }


  render(){
    return(
      <View>
          <Text>Style</Text>
      </View>
    );
  }

}
