import React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    FlatList,
    Modal,
    Alert,
    ScrollView,
    TouchableOpacity,
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
    Thumbnail
} from 'native-base';

import ScreensStandart from '../Component/ScreensStandart';
import {AntDesign, EvilIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import firebase from '../../../../Functions/FireBase/firebaseConfig';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {t} from '../../../../Lang';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import {StatusBar} from "expo-status-bar";
import DropdownAlert from "react-native-dropdownalert";
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";

const pinImage = require('../../../../../../assets/images/pin/pinImage.jpeg')
const succesImage = require('../../../../../../assets/images/Alert/tick.png');

function MyText(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });
    if (!fontsLoaded) {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                textAlign: "center"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    } else {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                textAlign: "center",
                fontFamily: "Poppins_400Regular"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    }
}


export default class Bonuses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bonuses: null,
            standartPin: null,
            cardCount: 0,
            active: false,
            cardCode: null,
            loading: true,
            refreshing: true,
        };
    }

    async getInfo() {
        firebase.database().goOnline();
        this.createOrGetCard()
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/bonuses')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({
                        bonuses: datas,
                        loading: false,
                        refreshing: false,
                        cardCount: data.numChildren(),
                    });
                    this.listComponent();
                });
        } else {
            this.listComponent();
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    createOrGetCard() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user) {
            var standartPin = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/pinArena/1')
                .on('value', (data) => {
                    standartPin = data.toJSON()
                    var cardNumb = this.makeid(16, 'number')
                    var stripedNumb = this.toCardStr(cardNumb)
                    if (data.numChildren() == 0) {
                        firebase.database().ref('users/' + user.uid + '/pinArena/1').set({
                            cardInfo: {
                                price: 0,
                                number: stripedNumb,
                                type: "Pin",
                                expiry: '∞/∞'
                            },
                            cardId: 1
                        }).then(() => {
                            firebase
                                .database()
                                .ref('users/' + user.uid + '/pinArena/1')
                                .on('value', (data) => {
                                    standartPin = data.toJSON()
                                })
                            this.setState({
                                standartPin: standartPin,
                                loading: false,
                                refreshing: false,
                            });
                        }, (err) => {
                            alert(err.message())
                        })
                    } else {
                        this.setState({
                            standartPin: standartPin,
                            loading: false,
                            refreshing: false,
                        });
                    }
                    this.listComponent();
                });
        }
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
            firebase
                .database()
                .ref('users/' + user.uid + '/bonuses/' + index)
                .remove()
                .then(
                    () => {
                        that.setState({bonuses: null, cardCount: 0, refreshing: true});
                        that.dropDownAlertRef.alertWithType('success', t('deleted'));
                        that.handleRefresh();
                    },
                    (err) => {
                        that.dropDownAlertRef.alertWithType('error', err.message);
                        that.handleRefresh();
                    }
                );
        }

        return (
            <View>
                <ListItem thumbnail style={styles.firstList} key={index}>
                    <Left>
                        <Entypo name="price-tag" color="#7c9d32" size={30}/>
                    </Left>
                    <Body>
                        <Text style={styles.cardNumbText}>{item.cardInfo.number}</Text>
                        <Text>{item.cardInfo.price} Azn</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => deleteItem(item.cardId)}>
                            <EvilIcons name="trash" size={30} color="#BF360C"/>
                        </Button>
                    </Right>
                </ListItem>
            </View>
        )
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

    listComponent() {
        if (this.state.cardCount == 0) {
            return (<List style={styles.w100}>
                {this.state.standartPin != null ? (
                    <ListItem thumbnail style={styles.firstList} key={1}
                              onPress={() => this.props.navigation.navigate('PinAbout')}>
                        <Left>
                            <Thumbnail source={pinImage} circular={true} resizeMethod="auto" large/>
                        </Left>
                        <Body>
                            <Text style={styles.cardNumbText}>{this.state.standartPin.cardInfo.number}</Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>{this.state.standartPin.cardInfo.price} Azn</Text>
                            </Button>
                        </Right>
                    </ListItem>
                ) : null}
            </List>)
        } else {
            return (
                <List style={styles.w100}>
                    {this.state.standartPin != null ? (
                        <ListItem thumbnail style={[styles.firstList, styles.pinArena]} key={1}
                                  onPress={() => this.props.navigation.navigate('PinAbout')}>
                            <Left>
                                <Thumbnail source={pinImage} style={{maxWidth: 50, maxHeight: 50}}
                                           circular={true} resizeMethod="auto" large/>
                            </Left>
                            <Body>
                                <Text style={styles.cardNumbText}>{this.state.standartPin.cardInfo.number}</Text>
                            </Body>
                            <Right>
                                <Text>{this.state.standartPin.cardInfo.price} Azn</Text>
                            </Right>
                        </ListItem>
                    ) : null}
                    <FlatList
                        data={this.state.bonuses}
                        renderItem={this.renderItems.bind(this)}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh}
                    />
                </List>
            );
        }
    }

    makeid(length, type) {
        var result = '';
        var characters = null
        if (type == "number") {
            characters = '0123456789'
        } else {
            characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        }
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    toCardStr(e) {
        var v = e.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        var matches = v.match(/\d{4,16}/g)
        var match = matches && matches[0] || ''
        var parts = []
        for (var i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }
        if (parts.length) {
            return parts.join(' ')
        } else {
            return e
        }
    }

    addCard = () => {
        if (this.state.cardCode == null) {
            this.dropDownAlertRef.alertWithType('info', t('pinCodeNull'));
        } else {
            this.setState({active: false})
            var user = firebase.auth().currentUser;
            var uid = this.makeid(15);
            var numb = this.toCardStr(this.state.cardCode)
            console.log(numb)
            firebase
                .database()
                .ref('users/' + user.uid + '/bonuses/' + uid)
                .set({
                    cardId: uid,
                    cardInfo: {
                        number: numb,
                        price: 30,
                        type: "bonuse",
                        expiry: "10 / 20",
                    },
                })
                .then(
                    () => {
                        this.setState({active: false, cardCode: null, refreshing: true});
                        this.handleRefresh();
                        this.dropDownAlertRef.alertWithType('success', t('added'));
                    },
                    (err) => {
                        this.dropDownAlertRef.alertWithType('error', err.message);
                        this.handleRefresh();
                    }
                );
        }
    };

    renderRefreshLists() {
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
    }

    render() {
        return (
            <View style={styles.f1}>
                <StatusBar backgroundColor="#fff" style="dark"/>
                <ScreensStandart {...this.props} name={t('mybonuses')}/>
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
                {this.state.refreshing || this.state.loading ?
                    this.renderRefreshLists() : this.listComponent()}
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
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.active}
                        >
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
                                            <Input
                                                style={styles.inputstyle}
                                                keyboardType="number-pad"
                                                keyboardShouldPersistTaps="handled"
                                                placeholder={t('cardCode')}
                                                onChangeText={(text) =>
                                                    this.setState({cardCode: text})
                                                }
                                            />
                                        </Item>
                                    </Form>
                                </CardItem>
                                <CardItem footer>
                                    <View>
                                        <Item style={styles.itemStyle}>
                                            <Button
                                                style={styles.buttonStyle}
                                                onPress={this.addCard}
                                                success>
                                                <MyText style={styles.buttonText} children={t('addCard')}/>
                                            </Button>
                                        </Item>
                                    </View>
                                </CardItem>
                            </Card>
                        </Modal>
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
    pinArena: {
        borderBottomWidth: 0,
        borderBottomColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 3
    },
    cardNumbText: {
        fontSize: 17,
        color: '#6d7587',
        fontWeight: 'bold',
    },
    thumbImage: {
        borderRadius: 100,
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
    nullObject: {
        color: '#D50000',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
