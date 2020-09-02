import * as React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    Keyboard,
    TouchableOpacity
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

export default class ContactUs extends React.Component {
    state = {
        subject: null,
        message: null,
        isSender: false,
    };
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
            <View style={{width: width, height: height, marginTop: -150, backgroundColor: "#fff"}}>
                <View style={styles.content}>
                    <ScreensStandart {...this.props} name={t('contactus')}/>
                    <View>
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
                            <View
                                style={[
                                    styles.row,
                                    customStyle.centerItems,
                                    customStyle.mt30,
                                    {marginTop: 40}
                                ]}>
                                <View onPress={Keyboard.dismiss} accessible={false}>
                                    {this.state.isSender === true ? (
                                        <Spinner color="#7c9d32" size={36}/>
                                    ) : (
                                        <Form
                                            style={[styles.container, styles.form]}
                                        >
                                            <Item style={styles.itemStyle}>
                                                <Input
                                                    style={styles.inputstyle}
                                                    placeholder={t('subject')}
                                                    autoCorrect={false}
                                                    autoCapitalize={false}
                                                    autoFocus={false}
                                                    onChangeText={(val) => {
                                                        this.setState({subject: val});
                                                    }}
                                                />
                                            </Item>
                                            <Item style={styles.itemStyle}>
                                                <Textarea
                                                    style={[styles.inputstyle, styles.textarea]}
                                                    placeholder={t('message')}
                                                    autoCorrect={false}
                                                    autoCapitalize={false}
                                                    autoFocus={false}
                                                    onChangeText={(val) => {
                                                        this.setState({message: val});
                                                    }}
                                                />
                                            </Item>
                                            <View style={{
                                                marginTop: 10,
                                                alignItems: "center",
                                                alignContent: "center",
                                                justifyContent: "center"
                                            }}>
                                                <TouchableOpacity
                                                    style={styles.buttonStyle}
                                                    onPress={() => this.sendMessage}
                                                >
                                                    <Text style={styles.buttonText}>
                                                        {t('sendMessageButton')}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </Form>
                                    )}
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <ContactUsFooter {...this.props} />
            </View>
        )
            ;
    }
}

const styles = StyleSheet.create({
    row: {
        height: 120,
    },
    content: {
        backgroundColor: '#fff',
        width: width,
        height: height - 50,
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
    form: {
        marginTop: 80,
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
        height: 130,
        paddingTop: 14
    },
    buttonStyle: {
        paddingHorizontal: 45,
        marginTop: 10,
        zIndex: 5,
        backgroundColor: "#7c9d32",
        width: width / 1.8,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        textAlign: "center",
        borderRadius: width / 2.4
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff',
    },
});
