import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {AntDesign, Entypo} from '@expo/vector-icons'
import {t} from "../../../../../Lang";
import AsyncStorage from '@react-native-community/async-storage';
import * as LocalAuthentication from "expo-local-authentication";
import {PasswordSetAndFingerSetContext} from "../../../../../Functions/Hooks/Authentication/FingerAndSetPass/PasswordSetAndFingerSetContext";

const {width, height} = Dimensions.get("window");

export default class SetFinger extends React.Component {
    static contextType = PasswordSetAndFingerSetContext

    constructor(props) {
        super(props);
        this.state = {
            setFinger: false,
            refresh: true
        }
    }

    componentDidMount() {
        this.setState({refresh: true})
        this.getStat()
    }

    async getStat() {
        await AsyncStorage.setItem('haveFinger', '')
        AsyncStorage.getItem('haveFinger').then((a) => {
            if (a !== null) {
                this.setState({setFinger: true})
            } else {
                hasHardware()
            }
        });

        async function hasHardware() {
            let permission = await LocalAuthentication.hasHardwareAsync()
            if (permission) {
                let type = await LocalAuthentication.supportedAuthenticationTypesAsync();
                let isFinger = type.includes(1)
                if (isFinger) {
                    let enroll = await LocalAuthentication.isEnrolledAsync();
                    if (enroll) {
                        let authenticate = await LocalAuthentication.authenticateAsync({
                            disableDeviceFallback: true,
                            cancelLabel: t('cancel'),
                            promptMessage: t('fingerprintlogin'),
                            fallbackLabel: t('fingerprintlogin')
                        });
                        if (authenticate !== null) {
                            if (authenticate.success) {
                                await AsyncStorage.setItem('haveFinger', 'Haved');
                                const {haveLocalAuth, sethaveLocalAuth} = this.context
                                sethaveLocalAuth(false)
                                this.setState({setFinger: true})
                            }
                        }
                    }
                }
            }
        }

        this.setState({refresh: false})
    }

    async onCancel() {
        await AsyncStorage.setItem('haveFinger', null)
        const {haveLocalAuth, sethaveLocalAuth} = this.context
        sethaveLocalAuth(false)
    }

    renderStateIcon() {
        if (this.state.setFinger) {
            return (
                <AntDesign name='checkcircle' color="#fff" size={100}/>
            )
        } else {
            return (
                <Entypo name='fingerprint' color="#fff" size={100}/>
            )
        }
    }

    renderContent() {
        if (this.state.refresh) {
            return (
                <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                    <StatusBar backgroundColor="#fff" style="dark"/>
                    <ActivityIndicator size="large" color="#7c9d32"/>
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <StatusBar backgroundColor="#7c9d32" style="light"/>
                    <View style={styles.panel}>
                        <View style={styles.topPanel}>
                            <TouchableOpacity onPress={() => this.onCancel()} style={styles.cancelButton}>
                                <AntDesign name="close" color="#fff" size={30}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.panel, {height: height / 4}]}>
                        {this.renderStateIcon()}
                    </View>
                    <View style={styles.panel}>
                        <Text
                            style={styles.desc}>{t('fingerprintaccesstotheapplicationUseyourfingerprinttologin')}</Text>
                    </View>
                    <View style={styles.panel}/>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: "#7c9d32",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
    },
    panel: {
        width: width,
        height: height / 5,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        backgroundColor: "transparent",
    },
    topPanel: {
        flexDirection: "row",
        backgroundColor: "transparent",
        alignItems: "flex-end",
        marginLeft: "auto",
    },
    cancelButton: {
        padding: 10,
        marginRight: 10,
        backgroundColor: "red",
    },
    desc: {
        fontSize: 14,
        color: "rgba(255,255,255,.8)",
        textTransform: "capitalize",
        textAlign: "center",
        paddingHorizontal: 60
    }
})