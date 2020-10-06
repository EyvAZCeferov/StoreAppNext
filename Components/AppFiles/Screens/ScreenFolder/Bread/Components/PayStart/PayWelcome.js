import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import {Picker} from 'native-base'
import {StatusBar} from "expo-status-bar";
import firebase from "../../../../../Functions/FireBase/firebaseConfig";
import {Entypo, AntDesign} from '@expo/vector-icons';
import DropdownAlert from "react-native-dropdownalert";
import {t} from "../../../../../Lang";
import {Camera} from "expo-camera";
import BarcodeMask from "react-native-barcode-mask";

const {width, height} = Dimensions.get("window");
export default class PayWelcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allMarkets: [
                {name: "Araz", id: 1},
                {name: "Bazar Store", id: 2},
                {name: "Bravo", id: 3}
            ],
            selectedMarket: null,
            refresh: true,
            checkid: null,
            openQr: false,
            flashMode: "off"
        }
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

    setId() {
        let id = this.makeid(15);
        this.setState({checkid: id})
    }

    componentDidMount() {
        this.getMarkets()
    }

    getMarkets() {
        setTimeout(() => {
            this.setState({refresh: false})
        }, 300)
        this.setId()
    }

    goBack() {
        firebase.database().goOnline();
        let user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid + '/checks/' + this.state.checkid).remove()
        this.setState({
            selectedMarket: null,
            checkid: null,
        })
        this.props.navigation.goBack();
    }

    setShoppingData() {
        firebase.database().goOnline();
        let user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid + '/checks/' + this.state.checkid).set({
            id: this.state.checkid,
            market: this.state.selectedMarket
        })
    }

    goNext() {
        if (this.state.selectedMarket != null) {
            if (this.state.checkid != null) {
                this.setShoppingData()
                this.props.navigation.navigate('OtherPages', {
                    screen: "SelectCard",
                    params: {
                        checkid: this.state.checkid
                    }
                })
            }
        } else {
            this.dropDownAlertRef.alertWithType('info', t('market.selectRetry'));
        }
    }

    renderMarkets() {
        if (this.state.allMarkets != null) {
            return this.state.allMarkets.map(market => {
                return (
                    <Picker.Item
                        label={market.name}
                        value={market.name}
                        color="#7c9d32"/>
                )
            })
        }
    }

    flashToggle() {
        if (this.state.flashMode == "torch") {
            this.setState({flashMode: "off"})
        } else {
            this.setState({flashMode: "torch"})
        }
    }

    iconRender() {
        if (this.state.flashMode == "torch") {
            return <Entypo name="flash" style={{paddingHorizontal: 5, paddingVertical: 2}} size={40}
                           color="rgb(255,255,255)"/>
        } else {
            return <Entypo name="flash" style={{paddingHorizontal: 5, paddingVertical: 2}} size={40}
                           color="rgba(255,255,255,.3)"/>;
        }
    }

    qrCodeScanned(item) {
        this.setState({openQr: false})
        console.log(item)
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.refresh ? (
                        <View style={{flex: 1, justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                            <StatusBar backgroundColor="#fff" style="dark"/>
                            <ActivityIndicator size="large" color="#7c9d32"/>
                        </View>
                    ) : (
                        <View style={[styles.container, styles.center]}>
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
                            />
                            <View style={styles.content}>
                                <TouchableOpacity onPress={() => this.goBack()}
                                                  style={[styles.button, styles.goBack]}>
                                    <AntDesign name="left" color="#7c9d32" size={25}/>
                                </TouchableOpacity>
                                <Text style={styles.title}>Marketi seçərək davam edin</Text>
                                <Picker
                                    iosHeader="Market Seç"
                                    mode="dialog"
                                    selectedValue={this.state.selectedMarket}
                                    onValueChange={(text) => this.setState({selectedMarket: text})}
                                >
                                    <Picker.Item label="Market seç" color="#7c9d32"
                                                 value=""/>
                                    {this.renderMarkets()}
                                </Picker>
                                <Text style={styles.qrCodeScan}>və ya Qr Kodu Oxudun</Text>
                                <TouchableOpacity
                                    onPress={() => this.setState({openQr: true})}
                                    style={[styles.center, styles.button, styles.goBack]}
                                >
                                    <AntDesign name="camera" size={26} color="#7c9d32"/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => this.goNext()}
                                    style={[styles.center, styles.button]}
                                >
                                    <Text style={styles.buttonTExt}>{t('continue')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
                <Modal visible={this.state.openQr} animated={true} animationType="slide" statusBarTranslucent={true}
                       onRequestClose={() => alert('closed')} hardwareAccelerated={true} transparent={false}
                       presentationStyle="fullScreen" supportedOrientations="portrait">
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
                    />
                    <View style={[styles.container, styles.center]}>
                        <StatusBar hidden={true}/>
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
                        />
                        <Camera style={{width: width, height: height}} type="back"
                                videoStabilizationMode={20}
                                focusable={true}
                                onBarCodeScanned={(item) => this.qrCodeScanned(item)}
                                flashMode={this.state.flashMode}
                        >
                            <BarcodeMask
                                outerMaskOpacity={0.6}
                                edgeBorderWidth={3}
                                edgeColor={'#7c9d32'}
                                animatedLineColor="#DD2C00"
                                animatedLineHeight={2}
                                showAnimatedLine={true}
                                animated={false}
                                animatedLineWidth={'90%'}
                                lineAnimationDuration={1400}
                                useNativeDriver={true}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    alignContent: 'center',
                                    textAlign: 'center',
                                    margin: "auto",
                                    padding: "auto"
                                }}
                            />
                        </Camera>
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            top: 15,
                            width: width,
                            height: 140,
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
                                    this.setState({openQr: false});
                                }}>
                                <AntDesign name="left" size={25} color="#fff"/>
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
                                    this.flashToggle()
                                }}>
                                {this.iconRender()}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            bottom: 15,
                            right: 0,
                            left: 0,
                            width: width,
                            height: 80,
                        }}>
                    </View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: "#fff",
    },
    center: {
        justifyContent: "space-around",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        backgroundColor: "transparent",
        flexDirection: "column"
    },
    button: {
        backgroundColor: "transparent",
        borderColor: "#7c9d32",
        borderWidth: 1.45,
        borderRadius: 6,
        flexDirection: "row"
    },
    goBack: {
        borderColor: "#fff",
        borderWidth: 0,
        borderRadius: 0,
        marginBottom: height / 15
    },
    qrCodeScan: {
        color: "rgba(0,0,0,.8)",
        fontSize: 15,
        textAlign: "center",
        fontWeight: "bold",
        paddingLeft: 15,
        marginBottom: height / 22
    },
    cameraButton: {
        borderRadius: 0,
        borderWidth: 0,
        marginTop: height / 23
    },
    buttonTExt: {
        color: "#7c9d32",
        fontSize: 17,
        fontWeight: "bold",
        paddingVertical: 11
    },
    content: {
        height: height / 1.7
    },
    title: {
        color: "rgba(0,0,0,.8)",
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 20,
        textAlign: "left",
    }
})