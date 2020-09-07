import * as React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    Keyboard,
    TouchableOpacity,
} from 'react-native';
import {
    Button,
    Form,
    Item,
    Input,
    Textarea,
    Spinner,
} from 'native-base';
import customStyle from '../../../../../../assets/Theme';
import ScreensStandart from '../Component/ScreensStandart';
import {Col, Grid, Row} from 'react-native-easy-grid';
import ContactUsFooter from '../Component/ContactUsFooter';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {t} from '../../../../Lang';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {StatusBar} from "expo-status-bar";

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: null,
            message: null,
            isSender: false,
        };
    }

    sendMessage = () => {
        Keyboard.dismiss();
        this.setState({isSender: true});
        if (this.state.subject === null || this.state.message === null) {
            alert(t('fillInput'))
            this.setState({isSender: false});
        } else {
            var user = firebase.auth().currentUser;
            firebase
                .database()
                .ref('contactus/' + user.uid)
                .set({
                    userId: user.uid,
                    userEmail: user.email,
                    subject: this.state.subject,
                    message: this.state.message,
                })
                .then(
                    () => {
                        this.setState({isSender: false});
                        this.setState({subject: null});
                        this.setState({message: null});
                        alert(t('sendMessage'))
                    },
                    (err) => {
                        this.setState({isSender: false});
                        alert(err.message);
                    }
                );
        }
    };

    render() {
        return (
            <View style={{flex: 1, position: "relative", backgroundColor: "#fff"}}>
                <StatusBar backgroundColor="#fff" style="dark" animated={true}/>
                <View style={{position: 'absolute', top: -80}}>
                    <ScreensStandart {...this.props} name={t('contactus')}/>
                </View>
                <View style={styles.content}>
                    <View style={{flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                        <View style={styles.row}>
                            <Grid style={{width: width, height: 50}}>
                                <Col style={styles.colCenter}>
                                    <Button
                                        style={[styles.button, styles.colCenter]}
                                        transparent>
                                        <Grid style={styles.colCenter}>
                                            <Row>
                                                <MaterialCommunityIcons
                                                    name="gmail"
                                                    size={27}
                                                    color="#6d7587"
                                                />
                                            </Row>
                                            <Row>
                                                <Text style={styles.text}>G-Mail</Text>
                                            </Row>
                                        </Grid>
                                    </Button>
                                </Col>
                                <Col style={styles.colCenter}>
                                    <Button
                                        style={[styles.button, styles.colCenter]}
                                        transparent>
                                        <Grid style={styles.colCenter}>
                                            <Row>
                                                <MaterialCommunityIcons
                                                    name="facebook-messenger"
                                                    size={27}
                                                    color="#6d7587"
                                                />
                                            </Row>
                                            <Row>
                                                <Text style={styles.text}>Fb Messenger</Text>
                                            </Row>
                                        </Grid>
                                    </Button>
                                </Col>
                            </Grid>
                        </View>
                        <View style={styles.row}>
                            <View>
                                {this.state.isSender === true ? (
                                    <Spinner color="#7c9d32" size={36}/>
                                ) : (
                                    <View>
                                        <Form style={{
                                            alignItems: "center",
                                            width: width,
                                        }}>
                                            <Item style={styles.itemStyle}>
                                                <Input
                                                    style={styles.inputstyle}
                                                    placeholder={t('subject')}
                                                    autoCorrect={false}
                                                    autoCapitalize={false}
                                                    keyboardAppearance="dark"
                                                    keyboardType="default"
                                                    autoFocus={false}
                                                    onChangeText={(val) => {
                                                        this.setState({subject: val});
                                                    }}
                                                />
                                            </Item>
                                            <Item style={styles.itemStyle}>
                                                <Textarea
                                                    style={styles.textarea}
                                                    placeholder={t('message')}
                                                    autoCorrect={false}
                                                    autoCapitalize={false}
                                                    autoFocus={false}
                                                    onChangeText={(val) => {
                                                        this.setState({message: val});
                                                    }}
                                                />
                                            </Item>
                                            <Item style={styles.itemStyle}>
                                                <Button style={styles.buttonStyle}
                                                        onPress={() => alert('Pressed')}><Text
                                                    style={styles.buttonText}>Send</Text></Button>
                                            </Item>
                                        </Form>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{position: 'absolute', bottom: 0}}>
                    <ContactUsFooter {...this.props} />
                </View>
            </View>
        )
            ;
    }
}

const styles = StyleSheet.create({
    row: {
        height: 80,
    },
    content: {
        backgroundColor: '#fff',
        width: width,
        position: "absolute",
        top: 80
    },
    colCenter: {
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
        justifyContent: "center",
    },
    button: {
        height: 80,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 18,
        color: '#6d7587',
        textAlign: 'center',
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
        paddingLeft: 20,
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
    textarea: {
        width: width - 70,
        height: 100,
        paddingTop: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingLeft: 15,
        fontWeight: 'bold',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 9,
        },
        shadowOpacity: 0.5,
        shadowRadius: 12.35,
        elevation: 19,
    },
    buttonStyle: {
        paddingHorizontal: 45,
        backgroundColor: "#7c9d32",
        width: width / 2,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        textAlign: "center",
        borderRadius: width / 2.4
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#fff',
        paddingVertical: 15
    },
});
