import React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    FlatList,
    Modal,
    TouchableOpacity,
    Alert,
    ScrollView,
    StatusBar,
} from 'react-native';
import {
    Button,
    List,
    ListItem,
    Left,
    Right,
    Body,
    Card,
    CardItem,
    Fab,
    Form,
    Item,
    Input,
} from 'native-base';

const succesImage = require('../../../../../../assets/images/Alert/tick.png');

import {LiteCreditCardInput} from 'react-native-credit-card-input';
import ScreensStandart from '../Component/ScreensStandart';
import {AntDesign, EvilIcons, MaterialCommunityIcons, FontAwesome, FontAwesome5} from '@expo/vector-icons';
import firebase from '../../../../Functions/FireBase/firebaseConfig';

const {width, height} = Dimensions.get('window');
import {t} from '../../../../Lang';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
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
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    } else {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                fontFamily: "Poppins_400Regular"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    }
}

export default class CardsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: [],
            cardCount: 1,
            active: false,
            cardInfos: [],
            pinCode: null,
            loading: true,
            refreshing: true,
        };
    }

    async getInfo() {
        firebase.database().goOnline()
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/cards')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({
                        cards: datas,
                        loading: false,
                        refreshing: false,
                        cardCount: data.numChildren(),
                    });
                    this.listComponent();
                });
        } else {
            this.listComponent();
            this.props.navigation.navigate('Home');
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillUnmount() {
        firebase.database().goOffline();
    }

    renderItems({item, index}) {
        var that = this;

        function deleteItem(index) {
            Alert.alert(
                t('wantDelete'),
                t('neverRecover'),
                [
                    {
                        text: t('cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: t('delete'),
                        onPress: () => deleteYes(index),
                        style: 'destructive',
                    },
                ],
                {cancelable: true}
            );
        }

        function deleteYes(index) {
            var user = firebase.auth().currentUser;
            if (that.state.cardCount < 2 || that.state.cardCount == 1 || that.state.cardCount === 1) {
                that.dropDownAlertRef.alertWithType('error', t('minimalCard'));
            } else {
                firebase
                    .database()
                    .ref('users/' + user.uid + '/cards/' + index)
                    .remove()
                    .then(
                        () => {
                            that.setState({cards: null, cardCount: 1, refreshing: true});
                            that.dropDownAlertRef.alertWithType('success', t('deleted'));
                            that.handleRefresh();
                        },
                        (err) => {
                            that.dropDownAlertRef.alertWithType('error', err.message);
                            that.handleRefresh();
                        }
                    );
            }
        }

        function cardTypeFunc() {
            switch (item.cardInfo.type) {
                case "visa":
                    return <FontAwesome name="cc-visa" size={30} color="#7c9d32"/>
                    break;
                case "master-card":
                    return <FontAwesome name="cc-mastercard" size={30} color="#7c9d32"/>
                    break;
                case 'american-express':
                    return <FontAwesome name="cc-amex" size={30} color="#7c9d32"/>
                    break;
                case 'discover':
                    return <FontAwesome name="cc-discover" size={30} color="#7c9d32"/>
                    break;
                case 'jcb':
                    return <FontAwesome name="cc-jcb" size={30} color="#7c9d32"/>
                    break;
                case 'diners-club-north-america':
                    return <FontAwesome name="cc-diners-club" size={30} color="#7c9d32"/>
                    break;
                case 'diners-club':
                    return <FontAwesome name="cc-diners-club" size={30} color="#7c9d32"/>
                    break;
                case 'diners-club-carte-blanche':
                    return <FontAwesome name="cc-diners-club" size={30} color="#7c9d32"/>
                    break;
                case 'diners-club-international':
                    return <FontAwesome name="cc-diners-club" size={30} color="#7c9d32"/>
                    break;
                case 'maestro':
                    return <FontAwesome name="credit-card-alt" size={30} color="#7c9d32"/>
                    break;
                case 'visa-electron':
                    return <FontAwesome5 name="cc-visa" size={30} color="#7c9d32"/>
                    break;
                default:
                    return <FontAwesome name="credit-card" size={30} color="#7c9d32"/>
            }
        }

        return (
            <View>
                {
                    this.state.refreshing || this.state.loading ?
                        (
                            <ScrollView>
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: width, height: 50, marginBottom: 15}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: width, height: 50, marginBottom: 15}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: width, height: 50, marginBottom: 15}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: width, height: 50, marginBottom: 15}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: width, height: 50, marginBottom: 15}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: width, height: 50, marginBottom: 15}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: width, height: 50, marginBottom: 15}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: width, height: 50, marginBottom: 15}}
                                />
                            </ScrollView>
                        )
                        :
                        (
                            <ListItem style={styles.firstList} thumbnail key={index + 1}>
                                <Left style={styles.left}>
                                    {cardTypeFunc()}
                                </Left>
                                <Body style={styles.body}>
                                    <View>
                                        <MyText style={styles.cardNumbText} children={item.cardInfo.number}/>
                                    </View>
                                    <View>
                                        <MyText children={item.cardInfo.cvc + ' Azn'}/>
                                    </View>
                                </Body>
                                <Right style={styles.right}>
                                    <Button transparent onPress={() => deleteItem(item.cardId)}>
                                        <EvilIcons name="trash" size={30} color="#BF360C"/>
                                    </Button>
                                </Right>
                            </ListItem>
                        )
                }
            </View>
        );
    }

    async handleRefresh() {
        this.setState(
            {
                refreshing: true,
                loading: true,
            },
            () => {
                this.getInfo();
            }
        );
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

    addCard = () => {
        if (this.state.pinCode == null) {
            this.setState({active: false});
            this.dropDownAlertRef.alertWithType('info', t('pinCodeNull'));
        } else {
            this.setState({active: false});
            var user = firebase.auth().currentUser;
            var uid = this.makeid(15);
            firebase
                .database()
                .ref('users/' + user.uid + '/cards/' + uid)
                .set({
                    cardInfo: this.state.cardInfos,
                    cardPass: this.state.pinCode,
                    cardId: uid,
                })
                .then(
                    () => {
                        this.setState({
                            active: false,
                            cardInfos: null,
                            pinCode: null,
                            refreshing: true,
                        });
                        this.dropDownAlertRef.alertWithType('success', t('added'));
                        this.handleRefresh();
                    },
                    (err) => {
                        this.dropDownAlertRef.alertWithType('error', err.message);
                        this.handleRefresh();
                    }
                );
        }
    };
    _onChange = (data) => {
        this.setState({cardInfos: data.values});
    };

    listComponent() {
        return (
            <FlatList
                data={this.state.cards}
                renderItem={this.renderItems.bind(this)}
                keyExtractor={(item, index) => index.toString()}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
            />
        );
    }

    renderRefreshLists() {
        if (this.state.refreshing || this.state.loading) {
            return (
                <ScrollView>
                    <ShimmerPlaceholder
                        visible={false}
                        isInteraction={true}
                        style={{width: width, height: 50, marginBottom: 15}}
                    />
                    <ShimmerPlaceholder
                        visible={false}
                        isInteraction={true}
                        style={{width: width, height: 50, marginBottom: 15}}
                    />
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View style={styles.f1}>
                <StatusBar backgroundColor="#ffffff" style="dark"/>
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
                <ScreensStandart {...this.props} name={t('cards')}/>
                <View style={styles.f1}>
                    <StatusBar backgroundColor="#ffffff" style="dark"/>
                    {this.renderRefreshLists()}
                    {this.state.cardCount == 0 ||
                    this.state.cards == null ? (
                        <List style={styles.w100}>
                            <MyText style={styles.nullObject} children={t('noResult')}/>
                        </List>
                    ) : (
                        <ScrollView>
                            <List style={[styles.w100, {marginBottom: 80}]}>
                                {this.listComponent()}
                            </List>
                        </ScrollView>
                    )}
                    <View style={{flex: 1}}>
                        <Fab
                            active={this.state.active}
                            direction="up"
                            style={{backgroundColor: '#7c9d32'}}
                            position="bottomRight"
                            containerStyle={{marginBottom: 50, marginRight: 10}}
                            onPress={() => this.setState({active: !this.state.active})}>
                            <AntDesign name="plus" size={24} color="#fff"/>
                        </Fab>
                    </View>

                    <View>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignContent: 'center',
                                marginTop: 22,
                                width: width,
                                height: height,
                            }}>
                            <StatusBar backgroundColor="#ffffff" style="dark"/>
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
                            <Modal
                                style={{width: width, height: height, backgroundColor: "#fff"}}
                                animationType="slide"
                                transparent={false}
                                visible={this.state.active}
                                onRequestClose={() => {
                                    Alert.alert('Modal has been closed.');
                                }}>
                                <Card style={{
                                    width: width,
                                    height: height,
                                    backgroundColor: "#fff",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center"
                                }}>
                                    <CardItem header style={styles.cardItemheader}>
                                        <Body>
                                            <MyText style={styles.modalTitle} children={t('addNewCard')}/>
                                        </Body>
                                        <Right>
                                            <TouchableOpacity
                                                style={styles.cardItemRightButton}
                                                onPress={() => this.setState({active: false})}>
                                                <MaterialCommunityIcons name="window-close" size={24} color="#D50000"/>
                                            </TouchableOpacity>
                                        </Right>
                                    </CardItem>
                                    <CardItem>
                                        <Form>
                                            <Item style={styles.itemStyle}>
                                                <View style={[styles.inputstyle, styles.cardInput]}>
                                                    <LiteCreditCardInput
                                                        keyboardShouldPersistTaps="handled"
                                                        keyboardType="number-pad"
                                                        onChange={this._onChange}
                                                    />
                                                </View>
                                            </Item>
                                            <Item style={styles.itemStyle}>
                                                <Input
                                                    style={styles.inputstyle}
                                                    keyboardType="number-pad"
                                                    keyboardShouldPersistTaps="handled"
                                                    placeholder={t('pincode')}
                                                    maxLength={4}
                                                    secureTextEntry={true}
                                                    onChangeText={(text) =>
                                                        this.setState({pinCode: text})
                                                    }
                                                />
                                            </Item>
                                        </Form>
                                    </CardItem>
                                    <CardItem footer>
                                        <View>
                                            <Item style={styles.itemStyle}>
                                                <Button
                                                    rounded
                                                    style={styles.buttonStyle}
                                                    onPress={this.addCard}
                                                    success>
                                                    <MyText style={styles.buttonText}
                                                            children={t('addCard')}
                                                    />
                                                </Button>
                                            </Item>
                                        </View>
                                    </CardItem>
                                </Card>
                            </Modal>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    f1: {
        width: width,
        height: height,
    },
    w100: {
        width: width,
    },
    firstList: {
        marginTop: 15,
    },
    cardNumbText: {
        fontSize: 17,
        color: '#6d7587',
        fontWeight: 'bold',
    },
    thumbImage: {
        borderRadius: 100,
    },
    right: {
        marginLeft: -40,
    },
    cardItemheader: {
        backgroundColor: "#fff",
        width: width - 30
    },
    modalTitle: {
        fontSize: 23,
        color: "#010101",
        fontWeight: "bold",
    },
    cardItemRightButton: {
        backgroundColor: "transparent",
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    itemStyle: {
        width: width - 50,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        marginVertical: 2,
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
        elevation: 4,
    },
    buttonStyle: {
        width: width - 75,
        marginTop: 0,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 8
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff',
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 0
    },
    cardInput: {
        width: width - 50,
    },
    nullObject: {
        color: '#D50000',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
