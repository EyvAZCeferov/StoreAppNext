import React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    Keyboard,
} from 'react-native';
import {
    Thumbnail,
    Content,
    Form,
    Input,
    Button,
    Item,
} from 'native-base';
import ScreensStandart from '../Component/ScreensStandart';
import customStyle from '../../../../../../assets/Theme';
import {t} from '../../../../Lang';
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Feather} from '@expo/vector-icons';
import {StatusBar} from "expo-status-bar";
import DropdownAlert from "react-native-dropdownalert";

var width = Dimensions.get('window').width;
const succesImage = require('../../../../../../assets/images/Alert/tick.png');

export default class AccountSettings extends React.Component {
    state = {
        email: null,
        profPic: null,
        telephoneNumb: null,
        nameSurname: null,
        isReady: false,
    };

    componentDidMount() {
        this.getInfo();
        setTimeout(() => {
            this.renderImage();
        }, 5000);
        this.getPermissionAsync();
    }

    componentWillUnmount() {
        firebase.database().goOffline();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert(t('permNotReqCam'));
            }
        }
    };

    getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user != null) {
            firebase
                .database()
                .ref('users/' + user.uid + '/userInfos')
                .on('value', (data) => {
                    var newData = data.toJSON();
                    if (newData.profPic != null) {
                        this.setState({
                            profPic: newData.profPic,
                        });
                    } else {
                        this.setState({profPic: null});
                    }
                    this.renderImage();
                    this.setState({email: newData.email});
                    this.setState({telephoneNumb: newData.telephoneNumb});
                });
        }
    }

    updateAccount = () => {
        Keyboard.dismiss();
        var user = firebase.auth().currentUser;
        if (user != null) {
            firebase
                .database()
                .ref('users/' + user.uid + '/userInfos')
                .update({
                    email: this.state.email,
                    telephoneNumb: this.state.telephoneNumb,
                })
                .then(
                    () => {
                        this.dropDownAlertRef.alertWithType('success', t('refreshDatas'));
                        this.getInfo();
                    },
                    (err) => {
                        this.dropDownAlertRef.alertWithType('error', err.message);
                    }
                );
        }
    };

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [3, 4],
                quality: 0.75,
            });
            if (!result.cancelled) {
                this.setState({image: result.uri});
            }
            if (result.type == 'image') {
                var user = firebase.auth().currentUser;
                if (user) {
                    const response = await fetch(result.uri);
                    const blob = await response.blob();
                    var ref = firebase
                        .storage()
                        .ref()
                        .child('users/' + user.uid + '/profile.jpg');
                    ref.put(blob).on(
                        firebase.storage.TaskEvent.STATE_CHANGED,
                        (data) => {
                            var downloadPP = data.downloadURL();
                            this.setState({profPic: downloadPP});
                        },
                        () => {
                            firebase
                                .storage()
                                .ref('users/' + user.uid + '/profile.jpg')
                                .snapshot.ref.getDownloadURL()
                                .then(function (downloadURL) {
                                    this.setState({profPic: downloadURL});
                                    var user = firebase.auth().currentUser;
                                    firebase
                                        .database()
                                        .ref('users/' + user.uid + '/userInfos')
                                        .set({
                                            profPic: downloadURL,
                                        });
                                    this.setState({profPic: downloadURL()});
                                });
                        }
                    );
                    ref.getDownloadURL().then((url) => {
                        this.setState({profPic: url});
                        var user = firebase.auth().currentUser;
                        firebase
                            .database()
                            .ref('users/' + user.uid + '/userInfos')
                            .update({
                                profPic: url,
                            })
                            .then(
                                () => {
                                    firebase
                                        .database()
                                        .ref('users/' + user.uid + '/userInfos')
                                        .on('value', (data) => {
                                            var newData = data.toJSON();
                                            this.setState({profPic: newData.profPic});
                                            this.renderImage();
                                        });
                                    this.dropDownAlertRef.alertWithType('success', t('ppUploaded'));
                                },
                                (err) => {
                                    this.dropDownAlertRef.alertWithType('success', err.message);
                                }
                            );
                    });
                } else {
                    this.props.navigation.navigate('Home');
                }
            } else {
                this.dropDownAlertRef.alertWithType('error', t('ppChoise'));
            }
        } catch (E) {
            this.dropDownAlertRef.alertWithType('error', E.message);
        }
    };

    renderImage() {
        return (
            <Thumbnail
                style={styles.image}
                source={{
                    uri: this.state.profPic,
                }}
            />
        );
    }

    render() {
        return (
            <View style={[customStyle.f1, {backgroundColor: "#fff"}]}>
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
                <ScreensStandart {...this.props} name={t('mypersonalinformation')}/>
                <View>
                    <View style={styles.header}>
                        <View style={customStyle.headerArena}>
                            <View style={styles.imagePickerArena}>
                                <View style={styles.imageArena}>
                                    {this.state.profPic === null ||
                                    this.state.profPic == null ? (
                                        <Thumbnail
                                            style={styles.image}
                                            source={{
                                                uri:
                                                    'https://firebasestorage.googleapis.com/v0/b/storeapp1-ea810.appspot.com/o/WP%2F11111111111111111111111111111111111111111.png?alt=media&token=5f0aa05e-6eaf-4945-a5f4-c9b0f917892f',
                                            }}
                                        />
                                    ) : (
                                        this.renderImage()
                                    )}
                                </View>
                                <View style={styles.pickerArena}>
                                    <Button style={{padding: 10, marginLeft: 10}} danger rounded small
                                            onPress={this._pickImage}>
                                        <Feather name="edit" size={18} color="#fff"/>
                                    </Button>
                                </View>
                            </View>
                            <Text style={styles.nameSurname}>
                                {this.state.nameSurname != null
                                    ? this.state.nameSurname
                                    : t('namesurname')}
                            </Text>
                        </View>
                    </View>
                    <View style={customStyle.f1}>
                        <Content style={styles.content}>
                            <Form style={[customStyle.m0p0, customStyle.centerItems]}>
                                <Item style={styles.itemStyle}>
                                    <Input
                                        style={styles.inputstyle}
                                        keyboardType="numeric"
                                        placeholder={t('phoneNumb')}
                                        keyboardShouldPersistTaps="handled"
                                        onChangeText={(text) =>
                                            this.setState({telephoneNumb: text})
                                        }
                                        value={
                                            this.state.telephoneNumb != null
                                                ? this.state.telephoneNumb
                                                : t('phoneNumb')
                                        }
                                        defaultValue={
                                            this.state.telephoneNumb != null
                                                ? this.state.telephoneNumb
                                                : t('phoneNumb')
                                        }
                                    />
                                </Item>
                                <Item style={styles.itemStyle}>
                                    <Input
                                        style={styles.inputstyle}
                                        keyboardType="email"
                                        keyboardShouldPersistTaps="handled"
                                        placeholder={t('email')}
                                        onChangeText={(text) => this.setState({email: text})}
                                        value={
                                            this.state.email != null
                                                ? this.state.email
                                                : t('email')
                                        }
                                        defaultValue={
                                            this.state.email != null
                                                ? this.state.email
                                                : t('email')
                                        }
                                    />
                                </Item>
                                <Item style={styles.itemStyle}>
                                    <Button
                                        rounded
                                        style={styles.buttonStyle}
                                        onPress={this.updateAccount}
                                        success>
                                        <Text style={styles.buttonText}>
                                            {t('refreshButton')}
                                        </Text>
                                    </Button>
                                </Item>
                            </Form>
                        </Content>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#7c9d32',
        height: 150,
        width: width,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderRadius: 40,
    },
    imagePickerArena: {
        position: 'relative',
        width: 85,
        height: 85,
        backgroundColor: '#fff',
        borderRadius: 43,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    imageArena: {
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 100,
        backgroundColor: "#fff",
    },
    pickerArena: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: "transparent",
    },
    nameSurname: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        paddingBottom: 20,
        backgroundColor: '#7c9d32',
        marginVertical: 10,
    },
    content: {
        padding: 0,
        margin: 0,
        marginTop: 60,
        backgroundColor: '#fff',
        width: width,
    },
    itemStyle: {
        width: width - 80,
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
    buttonStyle: {
        paddingHorizontal: 40,
        marginTop: 15,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff',
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 0,
    },
});
