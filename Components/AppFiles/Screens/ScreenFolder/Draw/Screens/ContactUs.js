import * as React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    Keyboard,
    TouchableOpacity,
    Linking
} from 'react-native';
import {
    Button,
    Input,
    Spinner,
    Textarea
} from 'native-base';
import ScreensStandart from '../Component/ScreensStandart';
import {Col, Grid, Row} from 'react-native-easy-grid';
import ContactUsFooter from '../Component/ContactUsFooter';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const succesImage = require('../../../../../../assets/images/Alert/tick.png');

var width = Dimensions.get('window').width;
import {t} from '../../../../Lang';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {StatusBar} from "expo-status-bar";
import DropdownAlert from "react-native-dropdownalert";
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";

function MyText(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });
    if (!fontsLoaded) {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                textAlign: "center"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    } else {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                textAlign: "center",
                fontFamily: "Poppins_400Regular"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    }
}

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: null,
            message: null,
            isSender: false,
        };
    }

    makeid(length) {
        var result = '';
        var characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    sendMessage = () => {
        firebase.database().goOnline();
        Keyboard.dismiss();
        this.setState({isSender: true});
        if (this.state.subject === null && this.state.message === null) {
            this.dropDownAlertRef.alertWithType('info', t('fillInput'));
            this.setState({isSender: false});
        } else {
            var user = firebase.auth().currentUser;
            var id = this.makeid(15);
            firebase
                .database()
                .ref('contactus/' + id)
                .set({
                    userId: user.uid,
                    id: id,
                    userEmail: user.email,
                    subject: this.state.subject,
                    message: this.state.message,
                })
                .then(
                    () => {
                        this.setState({isSender: false});
                        this.setState({subject: null});
                        this.setState({message: null});
                        this.dropDownAlertRef.alertWithType('success', t('sendMessage'));
                    },
                    (err) => {
                        this.setState({isSender: false});
                        this.dropDownAlertRef.alertWithType('error', err.message);
                    }
                );
        }
    };

    render() {
        return (
            <View style={{flex: 1, position: "relative", backgroundColor: "#fff"}}>
                <DropdownAlert
                    ref={ref => this.dropDownAlertRef = ref}
                    useNativeDriver={true}
                    closeInterval={1000}
                    zIndex={5000}
                    updateStatusBar={true}
                    tapToCloseEnabled={true}
                    showCancel={true}
                    elevation={10}
                    isInteraction={true}
                    successImageSrc={succesImage}
                />
                <StatusBar backgroundColor="#fff" style="dark" animated={true}/>
                <ScreensStandart {...this.props} name={t('contactus')}/>
                <View style={[styles.content, {backgroundColor: "transparent", height: 800}]}>
                    <StatusBar backgroundColor="#fff" style="dark"/>
                    <View style={styles.row}>
                        <Grid style={{width: width, height: 50}}>
                            <Col style={styles.colCenter}>
                                <TouchableOpacity
                                    style={[styles.button, styles.colCenter]}
                                    transparent
                                    onPress={() => Linking.openURL('mailto:payandwin.az@gmail.com')}
                                >
                                    <Grid style={styles.colCenter}>
                                        <Row>
                                            <MaterialCommunityIcons
                                                name="gmail"
                                                size={27}
                                                color="#6d7587"
                                            />
                                        </Row>
                                        <Row>
                                            <MyText style={styles.text} children="G-Mail"/>
                                        </Row>
                                    </Grid>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.colCenter}>
                                <Button
                                    style={[styles.button, styles.colCenter]}
                                    transparent>
                                    <Grid style={styles.colCenter}>
                                        <Row>
                                            <MaterialCommunityIcons
                                                name="facebook-messenger"
                                                size={27}
                                                color="#6d7587"
                                            />
                                        </Row>
                                        <Row>
                                            <MyText style={styles.text} children="Fb Messenger"/>
                                        </Row>
                                    </Grid>
                                </Button>
                            </Col>
                        </Grid>
                    </View>
                    <View style={styles.row}>
                        <View>
                            {this.state.isSender === true ? (
                                <Spinner color="#7c9d32" size={36}/>
                            ) : (
                                <View>
                                    <StatusBar backgroundColor="#fff" style="dark"/>
                                    <KeyboardAwareScrollView
                                        style={{backgroundColor: 'transparent', height: 600, marginTop: 15}}>
                                        <StatusBar backgroundColor="#fff" style="dark"/>
                                        <View style={{
                                            width: width,
                                            height: 90,
                                            backgroundColor: "transparent",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center"
                                        }}>
                                            <Input
                                                style={styles.inputstyle}
                                                placeholder={t('subject')}
                                                placeholderTextColor="rgba(0,0,0,.5)"
                                                autoCorrect={false}
                                                autoCapitalize={false}
                                                keyboardAppearance="dark"
                                                keyboardType="default"
                                                autoFocus={false}
                                                onChangeText={(val) => {
                                                    this.setState({subject: val});
                                                }}
                                            />
                                        </View>
                                        <View style={{
                                            width: width,
                                            height: 110,
                                            backgroundColor: "transparent",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center"
                                        }}>
                                            <Textarea
                                                focusable={true}
                                                keyboardType="normal"
                                                keyboardAppearance="default"
                                                style={[styles.inputstyle, styles.textArea]}
                                                placeholder={t('message')}
                                                placeholderTextColor="rgba(0,0,0,.5)"
                                                autoCorrect={false}
                                                autoCapitalize={false}
                                                autoFocus={false}
                                                onChangeText={(val) => {
                                                    this.setState({message: val});
                                                }}
                                            />
                                        </View>
                                        <View style={{
                                            width: width,
                                            height: 70,
                                            backgroundColor: "transparent",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            alignContent: "center"
                                        }}>
                                            <TouchableOpacity style={styles.buttonStyle}
                                                              onPress={() => this.sendMessage()}><MyText
                                                style={styles.buttonText}
                                                children={t('sendMessageButton')}/></TouchableOpacity>
                                        </View>
                                    </KeyboardAwareScrollView>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={{position: 'absolute', bottom: 0}}>
                    <ContactUsFooter {...this.props} />
                </View>
            </View>
        )
            ;
    }
}

const styles = StyleSheet.create({
    row: {
        height: 80,
    },
    content: {
        backgroundColor: '#fff',
        width: width,
        position: "absolute",
        top: 80
    },
    colCenter: {
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: "center",
    },
    button: {
        height: 80,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 18,
        color: '#6d7587',
        textAlign: 'center',
    },
    itemStyle: {
        justifyContent: 'center',
        width: width - 70,
        marginVertical: 10,
        borderColor: 'transparent',
        alignItems: 'center',
        alignContent: 'center',
    },
    inputstyle: {
        width: width - 70,
        maxHeight: 50,
        minHeight: 40,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderWidth: 3,
        color: '#6d7587',
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 15,
        borderRadius: 10,
        marginVertical: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 10,
    },
    textArea: {
        maxHeight: 90,
        minHeight: 80,
        paddingTop: 10,
    },
    buttonStyle: {
        backgroundColor: "#7c9d32",
        borderRadius: 15
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
        padding: 15
    },
});
