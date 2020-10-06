import React from 'react';
import {
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    Text,
    SafeAreaView
} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

const {width, height} = Dimensions.get('window');

import {Col, Grid} from 'react-native-easy-grid';
import {Button} from 'native-base';
import {QRCode as CustomQRCode} from 'react-native-custom-qr-codes-expo';
import {StatusBar} from "expo-status-bar";
import firebase from "../../../../Functions/FireBase/firebaseConfig";

function Simple() {
    return (
        <CustomQRCode
            style={styles.w1h1}
            content="http://google.com"
            color="#101010"
            codeStyle="circle"
            innerEyeStyle="circle"
            outerEyeStyle="circle"
        />
    );
}

export default class OneCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkid: null,
            check: null,
            products: null
        }
    }

    getInfo() {
        const params = this.props.route.params;
        var checkid = params.checkid;
        this.setState({checkid})
        let user = firebase.auth().currentUser;
        if (user) {
            var check = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/checks/' + this.state.checkid)
                .on('value', (data) => {
                    if (data.numChildren() > 0 && data != null) {
                        data.forEach((data) => {
                            check.push(data.val());
                        });
                    }
                });
            this.setState({check})
            var products = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/checks/' + this.state.checkid + '/products')
                .on('value', (data) => {
                    if (data.numChildren() > 0 && data != null) {
                        data.forEach((data) => {
                            products.push(data.val());
                        });
                    }
                });
            this.setState({products})
        }
        this.renderContent()
    }

    renderContent() {
        return (<View/>)
    }

    render() {
        return (
            <View style={
                {
                    width: width,
                    backgroundColor: "green"
                }}>
                <StatusBar style="dark" backgroundColor="#fff"/>
                <SafeAreaView>
                    <View style={[styles.f1, styles.bgWhite]}>
                        <View
                            style={[styles.center, styles.headerArena]}>
                            <View>
                                <Button transparent large onPress={() => this.props.navigation.goBack()}>
                                    <AntDesign name="back" size={24} color="#7c9d32"/>
                                </Button>
                            </View>
                            <View>
                                <Text
                                    style={styles.headerTitle}>Yazi Mektub</Text>
                            </View>
                        </View>
                        <ScrollView style={[styles.f1, styles.mt, styles.check]}>
                            <View style={styles.ph}>
                                <View style={styles.header}>
                                    <View style={styles.checkheaderInfo}>
                                        <Text style={styles.normalText}>Ts adı: Araz Market</Text>
                                        <Text style={styles.normalText}>
                                            Ts ünvanı: Sumqayıt Şəhər 41 A
                                        </Text>
                                        <Text style={styles.normalText}>Tel: 0186445252</Text>
                                    </View>
                                    <View style={styles.checkheaderInfo}>
                                        <Text style={styles.normalText}>
                                            VO adı: "Araz Supermarket" MƏHDUD MƏSULİYYƏTLİ CƏMİYYƏTİ
                                        </Text>
                                        <Text style={styles.normalText}>VÖEN: 10050565456</Text>
                                        <Text style={styles.normalText}>
                                            Obyektin Kodu:105151616516-5065065
                                        </Text>
                                    </View>
                                    <View style={styles.checkheaderInfo}>
                                        <Text style={styles.normalText}>Satış çeki № 151516</Text>
                                    </View>
                                </View>
                                <View style={styles.topBody}>
                                    <View style={styles.topBodyTextArena}>
                                        <Grid>
                                            <Col>
                                                <Text style={[styles.normalText, styles.textFlex]}>
                                                    Kassir
                                                </Text>
                                            </Col>
                                            <Col>
                                                <Text style={[styles.normalText, styles.textFlex]}>
                                                    Tarix
                                                </Text>
                                            </Col>
                                            <Col>
                                                <Text style={[styles.normalText, styles.textFlex]}>
                                                    15.12.2020
                                                </Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.topBodyTextArena}>
                                        <Grid>
                                            <Col>
                                                <Text style={[styles.normalText, styles.textFlex]}>
                                                    Eyvaz Cəfərov Kazım
                                                </Text>
                                            </Col>
                                            <Col>
                                                <Text style={[styles.normalText, styles.textFlex]}>
                                                    Saat
                                                </Text>
                                            </Col>
                                            <Col>
                                                <Text style={[styles.normalText, styles.textFlex]}>
                                                    18:07:21
                                                </Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                </View>
                                <View style={styles.seperator}>
                                    <Text style={styles.center}>
                                        ********************************************************
                                    </Text>
                                </View>
                                <View style={styles.items}>
                                    <View style={styles.itemHeader} sticky first>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.listHeaderText}>Məhsul</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.listHeaderText}>Say</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.listHeaderText}>Qiymət</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.listHeaderText}>Cəmi</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                    <View style={styles.itemOne}>
                                        <Grid>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>Ariel 15 kq</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>1.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                            <Col style={styles.center}>
                                                <Text style={styles.normalText}>15.00</Text>
                                            </Col>
                                        </Grid>
                                    </View>
                                </View>
                                <View style={styles.seperator}>
                                    <Text style={styles.center}>
                                        ********************************************************
                                    </Text>
                                </View>
                                <View style={styles.result}>
                                    <Grid>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>Cəmi</Text>
                                        </Col>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>150.80</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>*ƏDV 18% =0.87</Text>
                                        </Col>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>5.71</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>*ƏDV -dən azad</Text>
                                        </Col>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>7.65</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>*Cəmi Vergi</Text>
                                        </Col>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>0.87</Text>
                                        </Col>
                                    </Grid>
                                </View>
                                <View style={styles.seperator}>
                                    <Text style={styles.center}>
                                        ********************************************************
                                    </Text>
                                </View>
                                <View style={styles.result}>
                                    <Grid>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>Ödəniş Üsulu</Text>
                                        </Col>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>Kart</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>Nağdsız</Text>
                                        </Col>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>15.00</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>Bonus</Text>
                                        </Col>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>7.65</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>Fiksal İd: </Text>
                                        </Col>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>{this.state.checkid}</Text>
                                        </Col>
                                    </Grid>
                                    <Grid>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>
                                                NMQ-nun qeydiyyat nömrəsi:
                                            </Text>
                                        </Col>
                                        <Col style={styles.center}>
                                            <Text style={styles.normalText}>0000015540</Text>
                                        </Col>
                                    </Grid>
                                </View>
                                <View style={styles.barcodearena}>
                                    <Simple/>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    f1: {
        flex: 1,
        backgroundColor: "red",
    },
    headerArena: {
        width: width,
        maxHeight: 60,
        minHeight: 40,
        backgroundColor: "red",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    headerTitle: {
        color: "#7c9d32",
        fontSize: 20,
        fontWeight: "bold",
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
    },
    bgWhite: {
        backgroundColor: 'transparent',
        borderColor: "transparent",
    },
    check: {
        borderColor: '#eee',
        borderWidth: 2,
        width: width,
    },
    mt: {
        marginTop: 40,
    },
    ph: {
        paddingVertical: 20,
        width: width - 20,
    },
    header: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        width: width,
        height: 190,
    },
    checkheaderInfo: {
        width: width,
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        paddingHorizontal: 50,
    },
    normalText: {
        fontSize: 15,
        color: '#000',
        paddingVertical: 1,
    },
    topBody: {
        width: width,
        height: 80,
        marginVertical: 40,
        paddingHorizontal: 3,
    },
    topBodyTextArena: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    seperator: {
        marginBottom: 15,
    },
    items: {
        backgroundColor: 'transparent',
    },
    itemHeader: {
        width: width - 5,
        borderColor: 'transparent',
        paddingBottom: 15,
        borderBottomWidth: 2,
    },
    itemOne: {
        paddingVertical: 5,
    },
    listHeaderText: {
        fontSize: 20,
    },
    result: {
        marginVertical: 10,
    },
    barcodearena: {
        marginVertical: 40,
        marginBottom: 90,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});
