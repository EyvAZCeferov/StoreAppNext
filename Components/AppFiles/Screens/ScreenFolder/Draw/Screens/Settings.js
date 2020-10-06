import React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
    Alert,
    ActivityIndicator
} from 'react-native';
import {
    Button,
    Left,
    Right,
    ListItem,
    List,
    Body,
    Picker,
} from 'native-base';
import {Restart} from 'fiction-expo-restart';
import {
    Entypo,
    Feather,
    MaterialCommunityIcons,
    Foundation,
    AntDesign
} from '@expo/vector-icons';

import ScreensStandart from '../Component/ScreensStandart';
import * as Localization from 'expo-localization';

const succesImage = require('../../../../../../assets/images/Alert/tick.png');

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {setLang, t} from '../../../../Lang';
import {StatusBar} from "expo-status-bar";
import DropdownAlert from "react-native-dropdownalert";
import AsyncStorage from "@react-native-community/async-storage";
import * as LocalAuthentication from "expo-local-authentication";

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: Localization.locale,
            haveFinger: null,
            refresh: true,
            hasFingerPrintHardware: false
        };
    }

    onValueChange(sel) {
        this.dropDownAlertRef.alertWithType('success', t('changedLang'));
        setLang(sel);
        this.setState({selected: sel});
        Restart();
    }

    componentDidMount() {
        this.getFingStat()
        this.hasHardware()
    }

    async hasHardware() {
        let permission = await LocalAuthentication.hasHardwareAsync()
        if (permission) {
            let type = await LocalAuthentication.supportedAuthenticationTypesAsync();
            let isFinger = type.includes(1)
            if (isFinger) {
                this.setState({
                    hasFingerPrintHardware: isFinger
                });
            }
        }
    }

    async getFingStat() {
        await AsyncStorage.getItem('haveFinger').then((a) => {
            this.setState({haveFinger: a, refresh: false})
            console.log(a)
        })
        this.renderContent()
    }

    deleteFinger() {
        var that = this;
        Alert.alert(
            t('wantDelete'),
            t('neverRecover'),
            [
                {
                    text: t('cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: t('delete'),
                    onPress: () => doAnything(),
                    style: 'destructive',
                },
            ],
            {cancelable: true}
        );

        async function doAnything() {
            await AsyncStorage.setItem('haveFinger', '')
            await AsyncStorage.getItem('haveFinger').then((a) => {
                that.getFingStat();
                that.dropDownAlertRef.alertWithType('success', t('deleted'));
            })
        }
    }

    addFinger() {
        var that = this;
        Alert.alert(
            t('addCard'),
            t('fingerprintaccesstotheapplicationUseyourfingerprinttologin'),
            [
                {
                    text: t('cancel'),
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: t('addCard'),
                    onPress: () => doAnything(),
                    style: 'destructive',
                },
            ],
            {cancelable: true}
        );

        async function doAnything() {
            await AsyncStorage.setItem('haveFinger', 'Haved')
            await AsyncStorage.getItem('haveFinger').then((a) => {
                that.getFingStat()
                that.dropDownAlertRef.alertWithType('success', t('added'));
            })
        }
    }

    renderFingerStat() {
        if (this.state.haveFinger != null) {
            return (
                <Right>
                    <Button danger style={[styles.center, {width: width / 8}]} onPress={() => this.deleteFinger()}>
                        <Feather name="trash" color="#fff" size={22}/>
                    </Button>
                </Right>
            );
        } else {
            return (
                <Right>
                    <Button success style={[styles.center, {width: width / 8}]} onPress={() => this.addFinger()}>
                        <AntDesign name="plus" color="#fff" size={22}/>
                    </Button>
                </Right>
            )
        }
    }

    renderContent() {
        if (this.state.refresh) {
            return (<View
                style={{flex: 1, justifyContent: "center", alignContent: "center", alignItems: "center"}}>
                <ActivityIndicator size="large" animating={true} color="#7c9d32"/>
            </View>)
        } else {
            return (
                <View style={{backgroundColor: "#fff"}}>
                    <StatusBar backgroundColor="#fff" style="dark"/>
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
                    <View style={{marginTop: '10%'}}>
                        <StatusBar backgroundColor="#fff" style="dark"/>
                        <ScreensStandart {...this.props} name={t('setting')}/>
                    </View>
                    <ScrollView>
                        <StatusBar backgroundColor="#fff" style="dark"/>
                        <View style={styles.content}>
                            <List style={styles.lists}>
                                <ListItem style={styles.listitemDivider} itemDivider>
                                    <Text style={styles.listitemDividerText}>{t('general')}</Text>
                                </ListItem>
                                <ListItem style={styles.listitemDivider} itemDivider>
                                    <Entypo name="language" size={24} color="#6d7587"/>
                                    <Picker
                                        mode="dropdown"
                                        iosIcon={
                                            <Entypo
                                                name="chevron-down"
                                                size={24}
                                                style={styles.pickerIcon}
                                                color="#6d7587"
                                            />
                                        }
                                        androidIcon={
                                            <Entypo
                                                name="chevron-down"
                                                size={24}
                                                style={styles.pickerIcon}
                                                color="#6d7587"
                                            />
                                        }
                                        icon={
                                            <Entypo
                                                name="chevron-down"
                                                size={24}
                                                style={styles.pickerIcon}
                                                color="#6d7587"
                                            />
                                        }
                                        placeholder={t('language')}
                                        placeholderStyle={{color: '#bfc6ea'}}
                                        placeholderIconColor="#6d7587"
                                        style={{
                                            color: '#6d7587',
                                            width: 150,
                                        }}
                                        selectedValue={this.state.selected}
                                        onValueChange={(val) => this.onValueChange(val)}>
                                        <Picker.Item
                                            label="    Az"
                                            color="#6d7587"
                                            icon={
                                                <Feather name="check-circle" size={24} color="black"/>
                                            }
                                            value="az"
                                        />
                                        <Picker.Item
                                            label="    En"
                                            color="#6d7587"
                                            icon={
                                                <Feather name="check-circle" size={24} color="black"/>
                                            }
                                            value="en"
                                        />
                                        <Picker.Item
                                            label="    Ru"
                                            color="#6d7587"
                                            icon={
                                                <Feather name="check-circle" size={24} color="black"/>
                                            }
                                            value="ru"
                                        />
                                    </Picker>
                                </ListItem>
                                <ListItem style={styles.listitemDivider} itemDivider>
                                    <Text style={styles.listitemDividerText}>
                                        {t('security')}
                                    </Text>
                                </ListItem>
                                <ListItem
                                    style={[styles.listitem, styles.active]}
                                    icon
                                    onPress={() => this.props.navigation.navigate('SettedPass', {prevPage: "Settings"})}
                                >
                                    <Left style={styles.left}>
                                        <MaterialCommunityIcons
                                            name="textbox-password"
                                            size={24}
                                            color="#6d7587"
                                        />
                                    </Left>
                                    <Body style={styles.body}>
                                        <Text style={styles.text}>
                                            {t('changetheloginpassword')}
                                        </Text>
                                    </Body>
                                </ListItem>
                                {this.state.hasFingerPrintHardware ? (
                                    <ListItem style={styles.listitem} icon>
                                        <Left style={styles.left}>
                                            <Entypo name="fingerprint" size={24} color="#6d7587"/>
                                        </Left>
                                        <Body style={styles.body}>
                                            <Text style={styles.text}>{t('fingerprintlogin')}</Text>
                                        </Body>
                                        {this.renderFingerStat()}
                                    </ListItem>
                                ) : null}
                                <ListItem style={styles.listitemDivider} itemDivider last>
                                    <Text style={styles.listitemDividerText}>
                                        {t('abouttheapplication')}
                                    </Text>
                                </ListItem>
                                <ListItem
                                    style={styles.listitem}
                                    icon
                                    onPress={() => this.props.navigation.navigate('TermOfUses')}>
                                    <Left
                                        style={styles.left}
                                    >
                                        <Foundation name="page-doc" size={24} color="#6d7587"/>
                                    </Left>
                                    <Body
                                        style={styles.body}
                                    >
                                        <Text style={styles.text}>
                                            {t('termsofuseoftheapplication')}
                                        </Text>
                                    </Body>
                                </ListItem>
                                <ListItem
                                    style={styles.listitemDivider}
                                    itemDivider
                                    last
                                    onPress={() => this.props.navigation.navigate('TermOfUses')}>
                                    <Text style={styles.listitemDividerText}>
                                        {t('versionoftheapplication')}
                                    </Text>
                                </ListItem>
                                <ListItem style={styles.listitem} icon>
                                    <Left style={styles.left}>
                                        <MaterialCommunityIcons
                                            name="cloud-print-outline"
                                            size={24}
                                            color="#6d7587"
                                        />
                                    </Left>
                                    <Body style={styles.body}>
                                        <Text style={styles.text}>{t('version')} 1.0.0</Text>
                                    </Body>
                                </ListItem>
                            </List>
                        </View>
                    </ScrollView>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#fff',
        flex: 1,
        width: width,
        height: height,
    },
    center: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center"
    },
    ptop: {
        marginTop: 20,
    },
    lists: {
        width: width,
        height: height,
        marginLeft: 0,
        backgroundColor: '#fff',
    },
    listitem: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 0,
        width: width,
        height: 50,
        marginLeft: 0,
    },
    listitemDivider: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 0,
        width: width,
        height: 40,
        marginLeft: 0,
    },
    listitemDividerText: {
        fontSize: 14,
        color: '#6d7587',
        fontWeight: '500',
    },
    left: {
        paddingHorizontal: 15,
        marginRight: 15,
    },
    pickerIcon: {
        position: 'absolute',
        right: -150,
    },
    body: {
        borderColor: 'transparent',
    },
    text: {
        fontSize: 18,
        color: '#7c9d32',
        fontWeight: '600',
    },
    active: {
        backgroundColor: '#fff',
    },
});
