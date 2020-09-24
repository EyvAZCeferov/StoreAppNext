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

var {width} = Dimensions.get('window');
const icon = require('../../../../../../assets/icon.png');
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {StatusBar} from "expo-status-bar";
import DropdownAlert from "react-native-dropdownalert";

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
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.phoneNumb, this.state.pincode)
            .then(
                () => {
                    var user = firebase.auth().currentUser;
                    firebase
                        .database()
                        .ref('users/' + user.uid + '/userInfos')
                        .set({
                            email: this.state.phoneNumb,
                            uid: user.uid,
                        });
                    var id = this.makeid(15);
                    firebase
                        .database()
                        .ref('users/' + user.uid + '/cards/' + id)
                        .set({
                            cardInfo: this.state.cardInfos,
                            cardPass: this.state.pincode,
                            cardId: id,
                        });
                    this.dropDownAlertRef.alertWithType('success', t('signedIn'));
                },
                (err) => {
                    this.dropDownAlertRef.alertWithType('error', err.message);
                }
            );
    };
    props = this.props;
    _onChange = (data) => {
        this.setState({cardInfos: data.values});
    };

    componentDidMount() {
        firebase.database().goOnline();
    }

    componentWillUnmount() {
        firebase.database().goOffline();
    }

    render() {
        return (
            <View style={styles.container}>
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
                                type="POST"
                                action=""
                                style={styles.container}
                                onPress={Keyboard.dismiss}
                                accessible={false}>
                                <Item style={styles.itemStyle}>
                                    <Input
                                        keyboardShouldPersistTaps="handled"
                                        style={styles.inputstyle}
                                        placeholder={t('phoneNumb')}
                                        placeholderTextColor="#6d7587"
                                        autoCompleteType="tel"
                                        autoCorrect={false}
                                        maxLength={12}
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
        marginTop: 20,
    },
    title: {
        fontSize: 19,
        color: '#7c9d32',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 40,
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
        width: width - 250,
        justifyContent: 'center',
        height: 50,
        lineHeight: 20,
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
        width: width - 70,
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
