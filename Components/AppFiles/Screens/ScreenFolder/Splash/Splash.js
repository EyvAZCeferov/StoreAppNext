import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import {StatusBar} from 'expo-status-bar';

const {width} = Dimensions.get("window")
const splashIcon = require('../../../../../assets/icon-ios.png')
export default class Splash extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                <StatusBar style="dark" backgroundColor="#fff"/>
                <Image
                    source={splashIcon}
                    defaultSource={splashIcon}
                    style={{width: (width / 2) + 1, height: (width / 2) + 1}}
                />
            </View>
        )
    }

}