import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Modal,
    TouchableOpacity
} from 'react-native';
import {Picker, Item} from 'native-base'
import RecentOperation from '../Components/PayStart/RecentOperation';
import {StatusBar} from "expo-status-bar";
import PayCards from "../Components/PayStart/Paying";
import firebase from "../../../../Functions/FireBase/firebaseConfig";
import {Entypo, AntDesign} from '@expo/vector-icons';
import {Tooltip} from 'react-native-elements';
import {t} from "../../../../Lang";
import DropdownAlert from "react-native-dropdownalert";

const succesImage = require('../../../../../../assets/images/Alert/tick.png');

const {width, height} = Dimensions.get("window");
export default class BarCodeReader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCards: null,
            selectedCard: null,
            refresh: true,
            okay: false,
            checkid:null,
        }
    }

    async getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = []
            firebase
                .database()
                .ref('users/' + user.uid + '/cards')
                .on('value', (data) => {
                    data.forEach(element => {
                        datas.push(element.val())
                    })
                    this.setState({
                        allCards: datas
                    });
                    if (this.state.allCards != null) {
                        this.setState({refresh: false})
                    }
                    this.renderSelectedCard();
                    this.renderCards();
                });
        } else {
            alert('connection Error');
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

    componentDidMount() {
        this.getInfo();
        let id=this.makeid(15);
        this.setState({checkid:id})
    }

    componentWillUnmount() {
        firebase.database().goOffline();
        this.setState({
            allCards: null,
            selectedCard: null,
            refresh: true,
            okay: false,
        });
        this.renderSelectedCard();
        this.setState({checkid:null})
    }

    renderCards() {
        if (this.state.refresh) {
            //
        }
        if (this.state.allCards != null) {
            return this.state.allCards.map(element => {
                var label = this.hideNumb(element.cardInfo.number);
                return (
                    <Picker.Item
                        label={label}
                        value={element.cardId}
                        color="#7c9d32"/>
                )
            })
        }

    }

    hideNumb(e) {
        var numb = e;
        //use slice to remove first 12 elements
        let first12 = numb.slice(4, 14);
        //define what char to use to replace numbers
        let char = '*'
        let repeatedChar = char.repeat(numb.length - 14);
        // replace numbers with repeated char
        first12 = first12.replace(first12, repeatedChar);
        //concat hidden char with last 4 digits of input
        let hiddenNumbers = numb.slice(0, 4) + first12 + numb.slice(numb.length - 4);
        //return
        return hiddenNumbers;
        this.dropDownAlertRef.alertWithType('success', t('cardSelected'));

    }

    goBack() {
        this.setState({
            allCards: null,
            selectedCard: null,
            refresh: true,
            okay: false,
            checkid:null,
        })
        this.props.navigation.navigate('Home');
    }

    renderSelectedCard() {
        if (this.state.okay == true && this.state.selectedCard != null) {
            return (
                <View>
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
                    <View style={styles.upperView}>
                        <PayCards cardNumb={this.state.selectedCard}/>
                    </View>
                    <View style={styles.downerView}>
                        <RecentOperation checkid={this.state.checkid} {...this.props} />
                    </View>
                </View>
            )
        } else {
            return (
                <View>
                    <StatusBar backgroundColor="#fff" style="dark"/>
                    <Modal animationType="slide" animated={true} transparent={false}
                           onRequestClose={() => console.log('Close')} presentationStyle="fullScreen"
                           visible={true} statusBarTranslucent={true}>
                        <View style={{
                            width: width,
                            height: height,
                            justifyContent: "center",
                            alignContent: "center",
                            alignItems: "center",
                            textAlign: "center"
                        }}>
                            <View style={{marginTop: -20, marginBottom: 30}}>
                                <TouchableOpacity onPress={() => this.goBack()}>
                                    <AntDesign name="back" size={30} color="black"/>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                justifyContent: "space-around",
                                width: width,
                                height: 80,
                                flexDirection: "row"
                            }}>
                                <Text style={{fontSize: 20, color: "#010101"}}>Alışverişə kart seçərək başlayın</Text>
                                <Tooltip popover={<Text>Info here</Text>}>
                                    <Entypo name="help-with-circle" size={27} color="#7c9d32"/>
                                </Tooltip>
                            </View>
                            <View style={{width: 300, height: 120}}>
                                <Item picker>
                                    <Picker
                                        iosHeader="Kart Seç"
                                        itemStyle={{
                                            padding: 15,
                                        }}
                                        itemTextStyle={{
                                            fontSize: 18
                                        }}
                                        mode="dropdown"
                                        iosIcon={<Entypo name="credit-card" size={24} color="black"/>}
                                        icon={<Entypo name="credit-card" size={24} color="black"/>}
                                        androidIcon={<Entypo name="credit-card" size={24} color="black"/>}
                                        placeholder="Select your card"
                                        placeholderStyle={{color: "#bfc6ea"}}
                                        placeholderIconColor="#007aff"
                                        selectedValue={this.state.selectedCard}
                                        onValueChange={(text) => this.setState({selectedCard: text})}
                                    >
                                        <Picker.Item label="Kart Secin" color="#7c9d32" value=""/>
                                        {this.renderCards()}
                                    </Picker>
                                </Item>
                            </View>
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.setState({okay: true})}
                                    style={{
                                        backgroundColor: "transparent",
                                        borderColor: "#7c9d32",
                                        borderWidth: 2,
                                        borderRadius: 8
                                    }}
                                ><Text style={{
                                    color: "#7c9d32",
                                    fontSize: 16,
                                    fontWeight: "bold",
                                    paddingHorizontal: 15,
                                    paddingVertical: 10
                                }}>Davam
                                    Et</Text></TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.content}>
                {this.renderSelectedCard()}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
    },
    upperView: {
        height: 250,
        backgroundColor: "#f1f1f1"
    },
    downerView: {
        height: height,
        backgroundColor: "red"
    }
});
