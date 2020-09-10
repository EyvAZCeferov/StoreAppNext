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
const icon = require('../../../../../../assets/images/logo.jpeg');
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import DropdownAlert from "react-native-dropdownalert";

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

    componentWillUnmount() {
        firebase.database().goOffline();
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
                    <Header style={customStyle.loginheader}>
                        <Thumbnail source={icon}/>
                    </Header>
                    <Body>
                        <Content>
                            <View>
                                <View>
                                    <View>
                                        <Text style={customStyle.centerPageName}>
                                            {t('forgetPass')}
                                        </Text>
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
                                            <Text style={[styles.buttonText, {color: '#fff'}]}>
                                                {t('continue').toUpperCase()}
                                            </Text>
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
                                            <Text style={[styles.buttonText, {color: '#7c9d32'}]}>
                                                {t('backLogin').toUpperCase()}
                                            </Text>
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
