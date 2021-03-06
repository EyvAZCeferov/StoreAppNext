import React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Keyboard,
    StatusBar,
    Text,
} from 'react-native';
import {
    Button,
    Item,
    Header,
    Form,
    Input,
    Container,
    Content,
    Body,
    Thumbnail,
} from 'native-base';
import customStyle from '../../../../../../assets/Theme';
import {t} from '../../../../Lang';

const succesImage = require('../../../../../../assets/images/Alert/tick.png');

var width = Dimensions.get('window').width;
const icon = require('../../../../../../assets/icon.png');
import firebase from '../../../../Functions/FireBase/firebaseConfig';
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

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumb: '',
        };
    }

    componentDidMount() {
        firebase.database().goOnline();
    }

    sendLink = () => {
        Keyboard.dismiss();
        firebase
            .auth()
            .sendPasswordResetEmail(this.state.phoneNumb)
            .then(
                () => {
                    this.dropDownAlertRef.alertWithType('success', t('sendVerify'));
                },
                (err) => {
                    this.dropDownAlertRef.alertWithType('error', err.message);
                }
            );
    };

    render() {
        return (
            <View style={customStyle.container}>
                <StatusBar backgroundColor="#7c9d32" style="light"/>
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
                <Container>
                    <StatusBar backgroundColor="#7c9d32" style="light"/>
                    <Header style={customStyle.loginheader}>
                        <StatusBar backgroundColor="#7c9d32" style="light"/>
                        <Thumbnail source={icon}/>
                    </Header>
                    <Body>
                        <StatusBar backgroundColor="#7c9d32" style="light"/>
                        <Content>
                            <StatusBar backgroundColor="#7c9d32" style="light"/>
                            <View>
                                <View>
                                    <View>
                                        <MyText style={customStyle.centerPageName}
                                                children={t('forgetPass')}/>
                                    </View>
                                    <View>
                                        <Form style={styles.form}>
                                            <Item style={styles.itemStyle}>
                                                <Input
                                                    style={styles.inputstyle}
                                                    onChangeText={(text) =>
                                                        this.setState({phoneNumb: text})
                                                    }
                                                    onSubmitEditing={() => Keyboard.dismiss}
                                                    placeholder={t('phoneNumb')}
                                                />
                                            </Item>
                                        </Form>
                                    </View>
                                    <View>
                                        <Button
                                            rounded
                                            onPress={this.sendLink}
                                            full
                                            success
                                            large
                                            style={[
                                                customStyle.mVer15,
                                                customStyle.mHor15,
                                                customStyle.brad8,
                                            ]}>
                                            <MyText style={[styles.buttonText, {color: '#fff'}]}
                                                    children={t('continue').toUpperCase()}
                                            />
                                        </Button>
                                    </View>

                                    <View>
                                        <Button
                                            rounded
                                            onPress={() => this.props.navigation.goBack()}
                                            full
                                            success
                                            large
                                            bordered
                                            style={[
                                                customStyle.mVer15,
                                                customStyle.mHor15,
                                                customStyle.brad8,
                                            ]}>
                                            <MyText style={[styles.buttonText, {color: '#7c9d32'}]}
                                                    children={t('backLogin').toUpperCase()}
                                            />
                                        </Button>
                                    </View>
                                </View>
                            </View>
                        </Content>
                    </Body>
                </Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        padding: 0,
        margin: 0,
        marginTop: 15,
        width: width,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    itemStyle: {
        width: width - 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        marginVertical: 10,
        borderColor: 'transparent',
    },
    inputstyle: {
        height: 50,
        width: width,
        flex: 1,
        lineHeight: 20,
        borderColor: '#fff',
        backgroundColor: '#fff',
        borderWidth: 3,
        paddingLeft: 10,
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
    remember: {
        color: '#33691E',
        fontSize: 18,
        fontWeight: 'bold',
    },
    forgotPass: {
        paddingHorizontal: 5,
    },
});
