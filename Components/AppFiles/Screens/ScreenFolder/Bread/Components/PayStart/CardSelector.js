import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import {Picker} from 'native-base'
import {StatusBar} from "expo-status-bar";
import firebase from "../../../../../Functions/FireBase/firebaseConfig";
import {AntDesign} from '@expo/vector-icons';
import DropdownAlert from "react-native-dropdownalert";
import {t} from "../../../../../Lang";

const {width, height} = Dimensions.get("window");
export default class CardSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allCards: null,
            selectedCard: null,
            refresh: true,
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    getInfo() {
        firebase.database().goOnline();
        let user = firebase.auth().currentUser;
        if (user) {
            let datas = []
            firebase
                .database()
                .ref('users/' + user.uid + '/cards')
                .on('value', (data) => {
                    data.forEach(element => {
                        datas.push(element.val())
                    })
                })
            firebase
                .database()
                .ref('users/' + user.uid + '/bonuses')
                .on('value', (data) => {
                    data.forEach(element => {
                        datas.push(element.val())
                    })
                })
            this.setState({allCards: datas})
            this.setState({refresh: false})
        }
    }

    goBack() {
        this.setState({
            allCards: null,
            selectedCard: null,
        })
        this.props.navigation.goBack();
    }

    updateShoppingData() {
        firebase.database().goOnline();
        let user = firebase.auth().currentUser;
        const params = this.props.route.params;
        firebase.database().ref('users/' + user.uid + '/checks/' + params.checkid).set({
            card: this.state.selectedCard
        })
    }

    goNext() {
        if (this.state.selectedCard != null) {
            this.updateShoppingData()
            const params = this.props.route.params;
            this.props.navigation.navigate('OtherPages', {
                screen: "Buy",
                params: {
                    checkid: params.checkid,
                    selectedCard: this.state.selectedCard
                }
            })
        } else {
            this.dropDownAlertRef.alertWithType('info', t('cardsSelections.selectRetry'));
        }
    }

    renderCards() {
        function hideNumb(e) {
            var numb = e;
            //use slice to remove first 12 elements
            let first12 = numb.slice(4, 10);
            //define what char to use to replace numbers
            let char = '*'
            let repeatedChar = ""
            if (numb.length == 16 || numb.length == 12 || numb.length > 12) {
                repeatedChar = char.repeat(numb.length - 14);
            } else {
                repeatedChar = char.repeat(numb.length - 8);
            }
            // replace numbers with repeated char
            first12 = first12.replace(first12, repeatedChar);
            //concat hidden char with last 4 digits of input
            let hiddenNumbers = numb.slice(0, 4) + first12 + numb.slice(numb.length - 4);
            //return
            return hiddenNumbers;
        }

        if (this.state.allCards != null) {
            return this.state.allCards.map(car => {
                let l = hideNumb(car.cardInfo.number)
                return (
                    <Picker.Item
                        label={l}
                        value={car.cardId}
                        color="#7c9d32"/>
                )
            })
        }
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
                                                  style={[styles.center, styles.button, styles.goBack]}>
                                    <AntDesign name="left" color="#7c9d32" size={25}/>
                                </TouchableOpacity>
                                <Text style={styles.title}>Kart seçərək davam edin</Text>
                                <Picker
                                    iosHeader="Kart Seç"
                                    mode="dropdown"
                                    selectedValue={this.state.selectedCard}
                                    onValueChange={(text) => this.setState({selectedCard: text})}
                                    focusable={true}
                                >
                                    <Picker.Item label="Kart seç" color="#7c9d32"
                                                 value=""/>
                                    {this.renderCards()}
                                </Picker>

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
    buttonTExt: {
        color: "#7c9d32",
        fontSize: 17,
        fontWeight: "bold",
        paddingVertical: 11
    },
    content: {
        height: height / 2.2
    },
    title: {
        color: "rgba(0,0,0,.8)",
        fontSize: 20,
        fontWeight: "bold",
        lineHeight: 20,
        textAlign: "center",
    }
})