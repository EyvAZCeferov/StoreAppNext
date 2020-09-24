import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {StatusBar} from "expo-status-bar";
import {AntDesign, Entypo} from '@expo/vector-icons'
import {t} from "../../../../../Lang";
import AsyncStorage from '@react-native-community/async-storage';
import * as LocalAuthentication from "expo-local-authentication";

const {width, height} = Dimensions.get("window");

export default class SetFinger extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setFinger: false
        }
    }

    componentDidMount() {
        this.getStat();
    }

    async getStat() {
        await AsyncStorage.getItem('haveFinger').then((a) => {
            if (a != null) {
                this.setState({setFinger: true})
            } else {
                this.hasHardware()
            }
        });
    }

    async onScanned() {
        await AsyncStorage.setItem('haveFinger', 'Haved');
    }

    async onCancel() {
        await AsyncStorage.setItem('haveFinger', null)
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

    async hasHardware() {
        let permission = await LocalAuthentication.hasHardwareAsync()
        if (permission) {
            let type = await LocalAuthentication.supportedAuthenticationTypesAsync(1);
            let isFinger = type.includes(1)
            if (isFinger) {
                this.callFinger();
            }
        }
    }

    async callFinger() {
        let enroll = await LocalAuthentication.isEnrolledAsync();
        if (enroll) {
            let authenticate = await LocalAuthentication.authenticateAsync({
                disableDeviceFallback: true,
                cancelLabel: t('cancel'),
                promptMessage: t('fingerprintlogin'),
                fallbackLabel: t('fingerprintlogin')
            });
            if (authenticate != null) {
                if (authenticate.success) {
                    this.setState({setFinger: true})
                    this.onScanned()
                }
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#7c9d32" style="light"/>
                <View style={styles.panel}>
                    <StatusBar backgroundColor="#7c9d32" style="light"/>
                    <View style={styles.topPanel}>
                        <TouchableOpacity onPress={() => this.onCancel()} style={styles.cancelButton}>
                            <AntDesign name="close" color="#fff" size={30}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.panel, {height: height / 4}]}>
                    <StatusBar backgroundColor="#7c9d32" style="light"/>
                    {this.renderStateIcon()}
                </View>
                <View style={styles.panel}>
                    <StatusBar backgroundColor="#7c9d32" style="light"/>
                    <Text
                        style={styles.desc}>{t('fingerprintaccesstotheapplicationUseyourfingerprinttologin')}</Text>
                </View>
                <View style={styles.panel}/>
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
        marginRight: 10
    },
    desc: {
        fontSize: 14,
        color: "rgba(255,255,255,.8)",
        textTransform: "capitalize",
        textAlign: "center",
        paddingHorizontal: 60
    }
})