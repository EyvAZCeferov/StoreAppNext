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
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-community/async-storage";

const succesImage = require('../../../../../../assets/images/Alert/tick.png');

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

    signUp = async () => {
        Keyboard.dismiss();
        let cardId = this.makeid(15)
        if (this.state.phoneNumb !== null) {
            const cardDatas = {
                cardId: cardId,
                cardPass: this.state.pincode,
                cardInfo: this.state.cardInfos,
            }
            await AsyncStorage.setItem('haveFinger', '');
            await AsyncStorage.setItem('localAuthPass', '');
            firebase.auth()
                .createUserWithEmailAndPassword(this.state.phoneNumb, this.state.pincode).then(() => {
                    var user = firebase.auth().currentUser;
                    console.log(user)
                    firebase.database()
                        .ref('users/' + user.uid)
                        .set({
                            bonuses: null,
                            checks: null,
                            notifications: null,
                            userInfos: {
                                email: this.state.phoneNumb,
                                uid: user.uid,
                                profPic: null,
                                push_id: null,
                            }
                        });
                    firebase.database()
                        .ref('users/' + user.uid + '/cards/' + cardId)
                        .set(cardDatas);
                }
            )
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
                                <MyText style={styles.title} children={t('payandwinregister')}/>
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
                                            autoCorrect={false}
                                            maxLength={15}
                                            selectionColor="#7c9d32"
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
                                            onPress={() => this.signUp()}
                                            success
                                            rounded>
                                            <MyText style={styles.continueButtonText}
                                                    children={t('continue')}/>
                                        </Button>
                                    </Item>
                                    <Item style={styles.itemStyle}>
                                        <Button
                                            style={styles.buttonStyle}
                                            transparent
                                            onPress={() => this.props.navigation.navigate('Login')}
                                        >
                                            <MyText style={styles.buttonText} children={t('backLogin')}/>
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
