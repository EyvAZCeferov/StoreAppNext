import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Linking,
} from 'react-native';
import {Button, Footer, FooterTab} from 'native-base';
import {Feather} from '@expo/vector-icons';

var width = Dimensions.get('window').width;

export default class ContactUsFooter extends React.Component {
    render() {
        return (
            <Footer style={styles.footer}>
                <FooterTab style={styles.footerTab}>
                    <Button
                        transparent
                        onPress={() => Linking.openURL('http://twitter.com')}>
                        <View style={[styles.btn, styles.btnTwit]}>
                            <Feather name="twitter" size={22} color="#fff"/>
                        </View>
                    </Button>
                    <Button
                        transparent
                        onPress={() => Linking.openURL('http://youtube.com')}>
                        <View style={[styles.btn, styles.btnyoutube]}>
                            <Feather name="youtube" size={22} color="#fff"/>
                        </View>
                    </Button>
                    <Button
                        transparent
                        onPress={() => Linking.openURL('http://facebook.com')}>
                        <View style={[styles.btn, styles.btnFace]}>
                            <Feather name="facebook" size={22} color="#fff"/>
                        </View>
                    </Button>
                    <Button
                        transparent
                        onPress={() => Linking.openURL('http://linkedin.com')}>
                        <View style={[styles.btn, styles.btnLink]}>
                            <Feather name="linkedin" size={22} color="#fff"/>
                        </View>
                    </Button>
                    <Button
                        transparent
                        onPress={() => Linking.openURL('http://instagram.com')}>
                        <View style={[styles.btn, styles.btnInsda]}>
                            <Feather name="instagram" size={24} color="#fff"/>
                        </View>
                    </Button>
                </FooterTab>
            </Footer>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#fff',
        width: width,
        height: 80,
        justifyContent: "center",
        borderColor: '#fff',
        borderWidth: 1
    },
    footerTab: {
        width: width,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        borderColor: '#fff'
    },
    btn: {
        borderRadius: 100,
        width: 50,
        height: 50,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        marginHorizontal: 5,
    },
    btnTwit: {
        backgroundColor: '#00B0FF',
    },
    btnyoutube: {
        backgroundColor: '#DD2C00',
    },
    btnFace: {
        backgroundColor: '#01579B',
    },
    btnLink: {
        backgroundColor: '#006064',
    },
    btnInsda: {
        backgroundColor: '#FF6D00',
    },
});
