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
    TouchableOpacity
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

import ScreensStandart from '../Component/ScreensStandart';
import {AntDesign, EvilIcons, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import firebase from '../../../../Functions/FireBase/firebaseConfig';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {t} from '../../../../Lang';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import {StatusBar} from "expo-status-bar";
import DropdownAlert from "react-native-dropdownalert";

const succesImage = require('../../../../../../assets/images/Alert/tick.png');

export default class Bonuses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bonuses: null,
            cardCount: 0,
            active: false,
            cardCode: null,
            loading: true,
            refreshing: true,
            showToast: false,
        };
    }

    async getInfo() {
        firebase.database().goOnline();
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
                        <Text style={styles.cardNumbText}>{item.number}</Text>
                        <Text>{item.price} Azn</Text>
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
                <Text style={styles.nullObject}>{t('noResult')}</Text>
            </List>)
        } else {
            return (
                <List style={styles.w100}>
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
        if (this.state.cardCode == null) {
            this.dropDownAlertRef.alertWithType('info', t('pinCodeNull'));
        } else {
            this.setState({active: false})
            var user = firebase.auth().currentUser;
            var uid = this.makeid(15);
            firebase
                .database()
                .ref('users/' + user.uid + '/bonuses/' + uid)
                .set({
                    number: this.state.cardCode,
                    price: 30,
                    cardId: uid,
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
                <StatusBar backgroundColor="#fff" style="dark" />
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
                        <StatusBar backgroundColor="#fff" style="dark" />
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
                                        <Text style={styles.modalTitle}>{t('addNewCard')}</Text>
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
                                                <Text style={styles.buttonText}>
                                                    {t('addCard')}
                                                </Text>
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
