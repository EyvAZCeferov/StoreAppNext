import * as React from 'react';
import {StyleSheet, Dimensions, View, Text, ActivityIndicator} from 'react-native';
import {Button} from 'native-base';

import {AntDesign} from '@expo/vector-icons';
import {t} from '../../../../Lang';
import {QRCode as CustomQRCode} from "react-native-custom-qr-codes-expo";
import {StatusBar} from "expo-status-bar";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

function Simple(props) {
    return (
        <CustomQRCode
            style={styles.barcode}
            content={props.link}
            size={width / 1.25}
            color="#fff"
            codeStyle="square"
            innerEyeStyle="square"
            outerEyeStyle="square"
        />
    );
}

export default class PayThanks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: true,
            link: null
        }
    }

    componentDidMount() {
        const params = this.props.route.params;
        if (params.checkid != null) {
            this.setState({link: params.checkid, refresh: false})
            this.renderContent()
        }
    }

    renderContent() {
        if (this.state.refresh) {
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                    <ActivityIndicator size="large" color="#7c9d32" animating={true} focusable={true}/>
                </View>
            )
        } else {
            return (
                <View style={[styles.f1, styles.bgGreen]}>
                    <View style={styles.thanksArena}>
                        <View style={styles.barcode}>
                            <Simple {...this.props} link={this.state.link}/>
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
                                onPress={() => this.props.navigation.navigate('Tabs', {screen: "Home"})}>
                                <AntDesign name="home" size={24} color="black"/>
                                <Text style={styles.btnText}>{t('returnHome')}</Text>
                            </Button>
                        </View>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                <StatusBar backgroundColor="#7c9d32" style="light"/>
                {this.renderContent()}
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
        marginVertical: 5
    },
    barcode: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 35,
        color: "#fff",
    },
    w1h1: {
        width: 500,
        height: 500,
    },
    title: {
        fontSize: 30,
        marginVertical: 10,
        marginTop: 20,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        margin: 0,
        textAlign: "center"
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
        color: '#010101',
    },
});
