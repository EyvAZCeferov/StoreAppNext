import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import {Toast, Root} from 'native-base';
import {t} from "../../../Lang";

const {width, height} = Dimensions.get('window');
const icon = require('../../../../../assets/images/logo1.png');
export default class Splash extends React.Component {

    render() {
        return (
            <Root>
                <View style={styles.gradient}>
                    <View style={styles.gradient}>
                        <View style={[styles.centerItems, styles.gradient]}>
                            <View>
                                <Image source={icon} style={styles.icon}/>
                            </View>
                        </View>
                    </View>
                </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    gradient: {
        width: width,
        height: height,
    },
    centerItems: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    icon: {
        width: 170,
        height: 200,
        borderRadius: 15,
        marginTop: -50,
    },
});
