import React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import NumberButtons from './Components/NumberButtons';
import ProgramLockHeader from './Components/ProgramLock/ProgramLockHeader';
import FooterBar from './Components/ProgramLock/FooterBar';
import CodeFieldInput from './Components/ProgramLock/CodeField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import * as LocalAuthentication from 'expo-local-authentication';

const succesImage = require('../../../../../../../assets/images/Alert/tick.png');
import {StatusBar} from 'expo-status-bar';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import firebase from "../../../../../Functions/FireBase/firebaseConfig";
import {t} from "../../../../../Lang";
import AsyncStorage from '@react-native-community/async-storage';
import DropdownAlert from "react-native-dropdownalert";
import {ProgramLockContext} from "../../../../../Functions/Hooks/Authentication/Lock/ProgramLockContext";

var reqems = '';
export default class ProgramLock extends React.Component {
    static contextType = ProgramLockContext

    constructor(props) {
        super(props);
        this.state = {
            userName: null,
            userAvatar: null,
            hasFingerPrintHardware: false,
            pass: ''
        }
    }

    async getSoragePerm() {
        await AsyncStorage.getItem('haveFinger').then((a) => {
            if (a != null) {
                this.hasHardware()
            }
        });
    }

    async hasHardware() {
        let permission = await LocalAuthentication.hasHardwareAsync()
        if (permission) {
            let type = await LocalAuthentication.supportedAuthenticationTypesAsync();
            let isFinger = type.includes(1)
            if (isFinger) {
                this.callFinger();
                this.setState({
                    hasFingerPrintHardware: isFinger
                });
            }
        }
    }

    componentDidMount() {
        setInterval(() => {
            this.getInfo();
        }, 1000)
        this.getSoragePerm();
    }

    async getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user != null) {
            firebase
                .database()
                .ref('users/' + user.uid + '/userInfos')
                .on('value', (data) => {
                    var dat=data.toJSON()
                    this.setState({
                        userAvatar: null,
                        userName: dat.email
                    })
                })
            this.renderContent()
        }
    }

    completed() {
        const {notOpen, setNotOpen} = this.context
        this.dropDownAlertRef.alertWithType('success', t('signedIn'));
        setNotOpen(false)
    }

    async callFinger() {
        let enroll = await LocalAuthentication.isEnrolledAsync();
        if (enroll) {
            let authenticate = await LocalAuthentication.authenticateAsync({
                promptMessage: t('fingerprintaccesstotheapplicationUseyourfingerprinttologin'),
                cancelLabel: t('cancel'),
                fallbackLabel: t('password'),
                disableDeviceFallback: true
            });
            if (authenticate != null) {
                if (authenticate.success) {
                    this.dropDownAlertRef.alertWithType('success', t('signedIn'));
                    this.completed()
                }
            }
        }
    }

    fingerPrint() {
        this.callFinger()
    }

    changeVal(val) {
        reqems = reqems + val;
        if (reqems.length > 4) {
            //
        } else {
            this.setState({pass: reqems})
        }
    }

    clearVal() {
        reqems = ''
        this.setState({pass: ''})
    }

    renderContent() {
        return (
            <View style={styles.container}>
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
                <StatusBar backgroundColor="#fff" style="dark"/>
                <View style={styles.header}>
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
                    <ProgramLockHeader
                        {...this.props}
                        userName={this.state.userName}
                        userAvatar={this.state.userAvatar ? this.state.userAvatar : null}
                    />
                </View>
                <View style={styles.codefieldArena}>
                    <CodeFieldInput completed={() => this.completed()} value={this.state.pass} {...this.props} />
                </View>
                <View style={styles.buttons}>
                    <NumberButtons
                        clearVal={() => this.clearVal()}
                        changeVal={(e) => this.changeVal(e)} {...this.props} />
                </View>
                <View style={styles.footer}>
                    <FooterBar permission={this.state.hasFingerPrintHardware}
                               callFingerPrint={() => this.fingerPrint()} {...this.props} />
                </View>
            </View>
        )
    }

    render() {
        return (
            <View>
                <KeyboardAwareScrollView>
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
                    {this.renderContent()}
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: "#fff",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    header: {
        backgroundColor: "#fff",
        width: width,
        height: (height / 2) - 100
    },
    codefieldArena: {
        height: 70,
        width: width,
        backgroundColor: "#fff",
    },
    buttons: {
        height: 290,
        width: width,
    },
    footer: {
        height: 80,
        marginBottom: 15,
        left: 0,
        right: 0,
        width: width,
    },
});
