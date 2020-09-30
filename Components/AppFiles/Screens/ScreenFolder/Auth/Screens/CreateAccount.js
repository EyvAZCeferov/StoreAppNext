import React from 'react';
import {Image, StyleSheet, Dimensions, Keyboard, View, Text} from 'react-native';
import {
    Button,
    Item,
    Form,
    Input,
} from 'native-base';
import {LiteCreditCardInput} from 'react-native-credit-card-input';
import {t} from '../../../../Lang';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

var {width} = Dimensions.get('window');
const icon = require('../../../../../../assets/icon.png');
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {StatusBar} from "expo-status-bar";
import DropdownAlert from "react-native-dropdownalert";
import {CreateAccContext} from '../../../../Functions/Hooks/Authentication/CreateAccount/CreateAccContext';

const succesImage = require('../../../../../../assets/images/Alert/tick.png');

export default class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumb: null,
            pincode: null,
            cardInfos: [],
            data: [],
        };
    }

    static contextType = CreateAccContext

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

    signUp = () => {
        Keyboard.dismiss();
        let cardId = this.makeid(15)
        let uid = firebase.database().key
        if (this.state.phoneNumb !== null) {
            const user = {
                bonuses: null,
                pleaseCreateAcc: "dontCreate",
                cards: {
                    cardId: {
                        cardId: cardId,
                        cardPass: this.state.pincode,
                        cardInfo: this.state.cardInfos,
                    },
                },
                checks: null,
                notifications: null,
                userInfos: {
                    email: this.state.phoneNumb,
                    uid: uid,
                    profPic: null,
                    push_id: null,
                }
            };
            const {userData, setUserData} = this.context
            setUserData(user)
            this.props.navigation.navigate('SetPass', {prevPage: "CreateAccount"})
        }
    };

    _onChange = (data) => {
        this.setState({cardInfos: data.values});
    };


    render() {
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView>
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
                    <View style={[styles.center, styles.mt]}>
                        <View>
                            <View style={styles.center}>
                                <Image source={icon} style={[styles.logo, styles.mt5]}/>
                                <Text style={styles.title}>{t('payandwinregister')}</Text>
                            </View>
                        </View>
                        <View>
                            <View onPress={Keyboard.dismiss} accessible={false}>
                                <Form
                                    style={styles.container}
                                    onPress={Keyboard.dismiss}>
                                    <Item style={styles.itemStyle}>
                                        <Input
                                            keyboardShouldPersistTaps="handled"
                                            style={styles.inputstyle}
                                            placeholder={t('phoneNumb')}
                                            placeholderTextColor="#6d7587"
                                            autoCompleteType="tel"
                                            autoCorrect={false}
                                            maxLength={15}
                                            selectionColor="#7c9d32"
                                            textContentType="telephoneNumber"
                                            onChangeText={(text) => this.setState({phoneNumb: text})}
                                        />
                                    </Item>
                                    <Item style={styles.itemStyle}>
                                        <View style={[styles.inputstyle, styles.cardInput]}>
                                            <LiteCreditCardInput
                                                keyboardShouldPersistTaps="handled"
                                                keyboardType="number-pad"
                                                onChange={this._onChange}
                                            />
                                        </View>
                                    </Item>
                                    <Item style={styles.itemStyle}>
                                        <Input
                                            keyboardShouldPersistTaps="handled"
                                            autoCorrect={false}
                                            style={styles.inputstyle}
                                            placeholder={t('pincode')}
                                            placeholderTextColor="#6d7587"
                                            maxLength={9}
                                            secureTextEntry={true}
                                            onChangeText={(text) => this.setState({pincode: text})}
                                        />
                                    </Item>
                                    <Item style={styles.itemStyle}>
                                        <Button
                                            style={styles.buttonStyle}
                                            onPress={this.signUp}
                                            success
                                            rounded>
                                            <Text style={styles.continueButtonText}>
                                                {t('continue')}
                                            </Text>
                                        </Button>
                                    </Item>
                                    <Item style={styles.itemStyle}>
                                        <Button
                                            style={styles.buttonStyle}
                                            transparent
                                            onPress={() => this.props.navigation.navigate('Login')}
                                        >
                                            <Text style={styles.buttonText}>{t('backLogin')}</Text>
                                        </Button>
                                    </Item>
                                </Form>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    logo: {
        width: 110,
        height: 130,
    },
    center: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    mt: {
        marginTop: 10,
    },
    title: {
        fontSize: 19,
        color: '#7c9d32',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
    },
    itemStyle: {
        justifyContent: 'center',
        width: width - 50,
        marginVertical: 10,
        borderColor: 'transparent',
        alignItems: 'center',
        alignContent: 'center',
    },
    inputstyle: {
        width: '100%',
        justifyContent: 'center',
        height: 70,
        padding: 2,
        paddingLeft: 12,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderWidth: 3,
        color: '#6d7587',
        fontWeight: 'bold',
        fontSize: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 19,
    },
    cardInput: {
        width: '100%',
        paddingLeft: 0,
    },
    buttonText: {
        color: '#7c9d32',
        fontSize: 15,
    },
    buttonStyle: {
        paddingHorizontal: 40,
    },
    continueButtonText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff',
    },
    container: {
        backgroundColor: '#fff',
    }
});
