import React from 'react';
import {View, ImageBackground} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const splashIcon = require('../../../../../assets/icon.png')
export default class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                <StatusBar style="dark" backgroundColor="#fff"/>
                <ImageBackground source={splashIcon} style={{width:190,height:190}} resizeMode="contain"/>
            </View>
        )
    }

}