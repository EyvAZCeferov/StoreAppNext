import * as React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Keyboard,
    Text,
} from 'react-native';
import {
    Button,
    Item,
    Header,
    Form,
    Input,
    Container,
    Body,
    Thumbnail,
    Toast,
} from 'native-base';
import customStyle from '../../../../../../assets/Theme';
import {t} from '../../../../Lang';

var width = Dimensions.get('window').width;

const icon = require('../../../../../../assets/images/logo.jpeg');
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {StatusBar} from "expo-status-bar";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumb: null,
            password: null,
        };
    }

    login = () => {
        Keyboard.dismiss();
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.phoneNumb, this.state.password)
            .then(
                () => {
                    alert(t('signedIn'))
                },
                (err) => {
                   alert(err.message)
                }
            );
    };

    componentDidMount() {
        firebase.database().goOnline()
    }

    componentWillUnmount() {
        firebase.database().goOffline()
    }

    render() {
        return (
            <View style={customStyle.container}>
                <Container>
                    <Header style={customStyle.loginheader}>
                        <Thumbnail source={icon}/>
                    </Header>
                    <Body>

                        <View>
                            <View>
                                <View>
                                    <Text style={customStyle.centerPageName}>
                                        {t('signIn')}
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
                                        <Item style={styles.itemStyle}>
                                            <Input
                                                style={styles.inputstyle}
                                                placeholder={t('password')}
                                                onChangeText={(text) =>
                                                    this.setState({password: text})
                                                }
                                                onSubmitEditing={() => Keyboard.dismiss}
                                                secureTextEntry={true}
                                            />
                                        </Item>
                                    </Form>
                                </View>
                                <View style={customStyle.pVer15}>
                                    <View style={[{flexDirection: "row"}, customStyle.pHor15]}>
                                        <View style={customStyle.pHor15}>
                                            <Text
                                                style={[styles.remember, styles.forgotPass]}
                                                onPress={() =>
                                                    this.props.navigation.navigate('ForgotPass')
                                                }>
                                                {t('forgetPass')}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <Button
                                        rounded
                                        onPress={this.login}
                                        full
                                        success
                                        large
                                        style={[
                                            customStyle.mVer15,
                                            customStyle.mHor15,
                                            customStyle.brad8,
                                        ]}>
                                        <Text style={[styles.buttonText, {color: '#fff'}]}>
                                            {t('signIn').toUpperCase()}
                                        </Text>
                                    </Button>
                                </View>

                                <View>
                                    <Button
                                        rounded
                                        onPress={() =>
                                            this.props.navigation.navigate('CreateAccount')
                                        }
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
                                            {t('createAccount').toUpperCase()}
                                        </Text>
                                    </Button>
                                </View>
                            </View>
                        </View>

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
