import React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    View,
    FlatList,
    Modal,
    Alert, ScrollView,
} from 'react-native';
import {
    Button,
    List,
    ListItem,
    Thumbnail,
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
import {AntDesign, EvilIcons} from '@expo/vector-icons';
import firebase from '../../../../Functions/FireBase/firebaseConfig';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {t} from '../../../../Lang';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
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
                            <ListItem style={styles.firstList} key={index}>
                                <Left style={styles.left}>
                                    <Thumbnail
                                        square
                                        source={{
                                            uri:
                                                'https://kapitalbank.az/images/cards/M/mastercard-platinum1594371040.png',
                                        }}
                                        style={styles.thumbImage}
                                    />
                                </Left>
                                <Body style={styles.body}>
                                    <Text style={styles.cardNumbText}>{item.number}</Text>
                                    <Text>{item.price} Azn</Text>
                                </Body>
                                <Right style={styles.right}>
                                    <Button transparent onPress={() => deleteItem(item.cardId)}>
                                        <EvilIcons name="trash" size={24} color="#BF360C"/>
                                    </Button>
                                </Right>
                            </ListItem>
                        )
                }
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
            Alert.alert('Kart kodu boşdur');
        } else {
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
                        alert(t('added'));
                    },
                    (err) => {
                        alert(err.message);
                        this.handleRefresh();
                    }
                );
        }
    };

    renderRefreshLists() {
        if (this.state.refreshing || this.state.loading) {
            return (
                <ScrollView>
                    <ShimmerPlaceholder
                        visible={false}
                        delay={1000}
                        duration={1000}
                        isInteraction={true}
                        style={{width: width, height: 50, marginBottom: 15}}
                    />
                    <ShimmerPlaceholder
                        visible={false}
                        delay={1000}
                        duration={1000}
                        isInteraction={true}
                        style={{width: width, height: 50, marginBottom: 15}}
                    />
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <View>
                <ScreensStandart {...this.props} name={t('mybonuses')}/>
                <View>
                    <View style={styles.f1}>
                        {this.renderRefreshLists()}
                        {this.state.cardCount == 0 ||
                        this.state.bonuses == null ? (
                            <List style={styles.w100}>
                                <Text style={styles.nullObject}>{t('noResult')}</Text>
                            </List>
                        ) : (
                            this.listComponent()
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
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={this.state.active}
                                    onRequestClose={() => {
                                        Alert.alert('Modal has been closed.');
                                    }}>
                                    <Card style={{marginTop: 30}}>
                                        <CardItem header>
                                            <Body>
                                                <Text>{t('addNewCard')}</Text>
                                            </Body>
                                            <Right>
                                                <Button
                                                    transparent
                                                    onPress={() => this.setState({active: false})}>
                                                    <AntDesign name="close" size={24} color="#D50000"/>
                                                </Button>
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
                                                        rounded
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
    body: {
        marginLeft: -100,
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
    nullObject: {
        color: '#D50000',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
