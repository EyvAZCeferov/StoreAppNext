import React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {Button, Footer, FooterTab} from 'native-base';

var width = Dimensions.get('window').width;
import {Entypo, FontAwesome5} from '@expo/vector-icons';

export default class FooterBar extends React.Component {
    render() {
        return (
            <View>
                <Footer style={styles.bgCol}>
                    <FooterTab style={styles.bgCol}>
                        <Button vertical transparent>
                            <Entypo name="lock" size={24} color="#6d7587"/>
                            <Text style={styles.colorAndFontSize}>
                                Forgot the access code
                            </Text>
                        </Button>
                        <Button vertical transparent>
                            <FontAwesome5 name="fingerprint" size={24} color="#6d7587"/>
                            <Text style={styles.colorAndFontSize}>Use your finger print</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bgCol: {
        borderColor: '#fff',
        backgroundColor: "#fff",
        width: width,
        height: 70,
        textAlign: 'center',
    },
    colorAndFontSize: {
        color: '#6d7587',
        fontSize: 16,
        textAlign: 'center',
    },
});
