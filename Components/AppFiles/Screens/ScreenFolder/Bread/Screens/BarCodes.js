import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Keyboard, Modal} from 'react-native';
import {Camera} from 'expo-camera';
import {StatusBar} from "expo-status-bar";
import {Entypo, AntDesign} from '@expo/vector-icons';
import {InputGroup, Input} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

const {width, height} = Dimensions.get('window');
export default function BarCodes({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [flashMode, setFlashMode] = useState("off");
    const [modalState, setModalState] = useState(false);
    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    function flashToggle() {
        if (flashMode == "torch") {
            setFlashMode("off");
        } else {
            setFlashMode("torch");
        }
    }

    function toggleModal() {
        setModalState(!modalState)
    }

    function iconRender() {
        if (flashMode == "torch") {
            return <Entypo name="flash" style={{paddingHorizontal: 5, paddingVertical: 2}} size={40}
                           color="rgb(255,255,255)"/>
        } else {
            return <Entypo name="flash" style={{paddingHorizontal: 5, paddingVertical: 2}} size={40}
                           color="rgba(255,255,255,.3)"/>;
        }
    }

    function barcodeWrited() {
        Keyboard.dismiss();
        setModalState(false);
    }

    return (
        <View
            style={{flex: 1}}>
            <StatusBar
                hidden={true}
            />
            <Camera style={{flex: 1}} type="back" flashMode={flashMode} onBarCodeScanned={(item) => alert(item.data)}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                    }}>
                    <View style={{
                        width: width,
                        height: 50,
                        marginTop: 30,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        alignContent: "center",
                        textAlign: "center",
                    }}>
                        <TouchableOpacity
                            style={{
                                minHeight: 45,
                                maxHeight: 60,
                                minWidth: 45,
                                maxWidth: 60,
                                marginLeft: 30,
                                borderRadius: 5,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                textAlign: "center",
                                backgroundColor: "rgba(0,0,0,.5)"
                            }}
                            onPress={() => {
                                navigation.goBack();
                            }}>
                            <AntDesign name="back" size={25} color="#fff"/>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                minHeight: 45,
                                maxHeight: 60,
                                minWidth: 45,
                                maxWidth: 60,
                                marginRight: 30,
                                borderRadius: 5,
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center",
                                textAlign: "center",
                                backgroundColor: "#7c9d32"
                            }}
                            onPress={() => {
                                flashToggle()
                            }}>
                            {iconRender()}
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: 300,
                        height: 180,
                        borderWidth: 3,
                        borderColor: "#7c9d32",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                        textAlign: "center"
                    }}>
                        <View style={{borderWidth: 1.5, width: '100%', height: 1, borderColor: "#DD2C00"}}/>
                    </View>
                    <View
                        style={{
                            width: width,
                            height: 80,
                            justifyContent: "center",
                            alignItems: "center",
                            alignContent: "center",
                            textAlign: "right",
                        }}>
                        <TouchableOpacity
                            style={{
                                minHeight: 45,
                                maxHeight: 60,
                                minWidth: 150,
                                maxWidth: 200,
                                borderRadius: 5,
                                flexDirection: "row",
                                justifyContent: "space-around",
                                alignItems: "center",
                                alignContent: "center",
                                textAlign: "center",
                                backgroundColor: "#7c9d32"
                            }}
                            onPress={() => toggleModal()}
                        >
                            <AntDesign name="edit" style={{paddingHorizontal: 15, paddingVertical: 10}} size={30}
                                       color="#fff"/>
                            <Text style={{color: "#fff", fontSize: 14, fontWeight: "bold"}}>No Barcode?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Modal animationType="slide" animated={true} transparent={false}
                           onRequestClose={() => console.log('Close')} presentationStyle="fullScreen"
                           visible={modalState} statusBarTranslucent={true}>
                        <KeyboardAwareScrollView>
                            <View style={{
                                width: width, height: 90, justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center", textAlign: "center"
                            }}>
                                <TouchableOpacity style={{
                                    marginTop: 40
                                }} onPress={() => setModalState(false)}>
                                    <AntDesign name="back" size={24} color="black"/>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                marginTop: 50,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignContent: "center",
                                alignItems: "center"
                            }}>
                                <View style={{
                                    alignContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    justifyContent: "center",
                                    flexDirection: "column"
                                }}>
                                    <InputGroup style={{
                                        width: width - 50,
                                        marginTop: width / 5,
                                        flexDirection: "column",
                                        alignContent: "center",
                                        alignItems: "center",
                                        textAlign: "center",
                                        justifyContent: "center",
                                        height: 140,
                                        borderColor: "transparent",
                                    }}>
                                        <Input style={{
                                            alignContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            borderColor: "rgba(0,0,0,.7)",
                                            borderWidth: 3,
                                            width: "100%",
                                            height: 80,
                                        }} autoCapitalize="none" placeholder="Type BarCode"
                                               placeholderTextColor="rgba(0,0,0,.5)"/>
                                        <TouchableOpacity onPress={() => barcodeWrited()} style={{
                                            backgroundColor: "#7c9d32",
                                            width: width - 50,
                                            borderRadius: 8,
                                            height: 50,
                                            marginTop: 15,
                                            alignContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                            justifyContent: "center",
                                        }}>
                                            <Text style={{
                                                color: "#fff",
                                                fontWeight: "bold",
                                                fontSize: 24,
                                                paddingHorizontal: 0,
                                                paddingVertical: 20,
                                            }}>Send</Text>
                                        </TouchableOpacity>
                                    </InputGroup>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </Modal>
                </View>
            </Camera>


        </View>

    )
}