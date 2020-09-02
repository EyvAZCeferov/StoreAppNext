import * as React from 'react';
import {StyleSheet, Dimensions, View, Text} from 'react-native';
import {Button} from 'native-base';

import {AntDesign} from '@expo/vector-icons';
import {t} from '../../../../Lang';

import {QRCode as CustomQRCode} from 'react-native-custom-qr-codes-expo';

const icon = require('../../../../../../assets/images/logo1.png');

function Simple() {
    return (
        <CustomQRCode
            logo={{uri: icon}}
            logoMargin={5}
            color="#101010"
            codeStyle="circle"
            innerEyeStyle="circle"
            outerEyeStyle="circle"
            style={styles.w1h1}
            logoBackgroundColor="transparent"
            logoSize={30}
            value={this.state.link != null ? this.state.link : 'https://google.com'}
        />
    );
}

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class PayThanks extends React.Component {
    state = {
        link: null,
    };

    render() {
        const params = this.props.route.params;
        const link = params ? params.link : null;
        this.setState({link: link});
        return (
            <View>
                <View style={[styles.f1, styles.bgGreen]}>
                    <View style={styles.thanksArena}>
                        <View style={styles.barcode}>
                            <Simple/>
                        </View>
                        <Text style={[styles.icon, styles.title]}>
                            {t('thanksBuying')}
                        </Text>
                        <Text style={styles.subtitle}>{t('scanCode')}</Text>
                        <View style={styles.centerItems}>
                            <Button
                                rounded
                                iconLeft
                                light
                                style={styles.btn}
                                onPress={this.props.navigation.navigate('BarcodeReader')}>
                                <AntDesign name="home" size={24} color="black"/>
                                <Text style={styles.btnText}>{t('returnHome')}</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bgGreen: {
        backgroundColor: '#7c9d32',
    },
    f1: {
        width: width,
        height: height,
    },
    thanksArena: {
        width: width,
        height: height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    icon: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold',
    },
    barcode: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    w1h1: {
        width: 500,
        height: 500,
    },
    title: {
        fontSize: 30,
        marginVertical: 10,
        marginTop: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        margin: 0,
    },
    centerItems: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    btn: {
        padding: 15,
        marginTop: 20,
    },
    btnText: {
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 5,
        color: '#000',
    },
});
