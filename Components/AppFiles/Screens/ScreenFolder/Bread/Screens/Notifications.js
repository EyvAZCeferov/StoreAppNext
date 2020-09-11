import React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
    FlatList,
    Alert,
    Modal,
} from 'react-native';
import {
    Button,
    List,
    ListItem,
    Thumbnail,
    Left,
    Right,
    Body,
    Content,
    Container,
    Header,
    Card,
    CardItem,
    Badge,
} from 'native-base';
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {t} from '../../../../Lang';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {
    AntDesign,
    Feather,
    Entypo,
    FontAwesome,
} from '@expo/vector-icons';
import {StatusBar} from "expo-status-bar";

export default class Notifications extends React.Component {
    state = {
        notifies: [
            {
                image:
                    'https://banker.az/wp-content/uploads/2018/02/Kapital_Bank_-e1518595902278.png',
                content: [{title: 'Baki Store', desc: '100 Azn lik Alisveris'}],
                price: 50,
                date: '20.07.2020',
                id: 1,
                read: true,
            },
            {
                image:
                    'https://banker.az/wp-content/uploads/2018/02/Kapital_Bank_-e1518595902278.png',
                content: [{title: 'BazarStore', desc: '20 Azn lik Alisveris'}],
                price: 50,
                date: '20.07.2020',
                id: 2,
                read: false,
            },
            {
                image:
                    'https://banker.az/wp-content/uploads/2018/02/Kapital_Bank_-e1518595902278.png',
                content: [{title: 'ArazStore', desc: '30 Azn lik Alisveris'}],
                price: 50,
                date: '20.07.2020',
                id: 3,
                read: false,
            },
        ],
        notifications: [],
        refreshing: true,
        loading: true,
        active: false,
    };

    getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        var datas = [];
        if (user) {
            firebase
                .database()
                .ref('users/' + user.uid + '/notifications')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({
                        notifications: datas,
                        refreshing: false,
                        loading: false,
                    });
                });
        } else {
            this.props.navigation.navigate('Home');
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillUnmount() {
        firebase.database().goOffline();
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

    renderItem({item, index}) {
        function read(index) {
            var user = firebase.auth().currentUser;
            if (user) {
                firebase
                    .database()
                    .ref('users/' + user.uid + '/notifications/' + index)
                    .update({
                        read: true,
                    });
            } else {
                this.props.navigation.navigate('Login');
            }
        }

        function viewInfo(index) {
            var user = firebase.auth().currentUser;
            var notifyData = null;
            if (user) {
                firebase
                    .database()
                    .ref('users/' + user.uid + '/notifications/' + index)
                    .on('value', (data) => {
                        var newData = data.toJSON();
                        notifyData = newData.description;
                        return notifyData;
                    });
                Alert.alert(notifyData);
            } else {
                this.props.navigation.navigate('Login');
            }
        }

        return (
            <ListItem
                style={styles.firstList}
                thumbnai
                key={index}
                onPress={() => viewInfo(item.id)}>
                <Left style={styles.left}>
                    <Thumbnail
                        square
                        source={{
                            uri: item.image,
                        }}
                        style={styles.thumbImage}
                    />
                </Left>
                <Body style={styles.body}>
                    <Text style={styles.cardNumbText}>{item.content[0].title}</Text>
                    <Text style={styles.cardNumbText}>{item.date}</Text>
                </Body>
                <Right style={styles.right}>
                    <Button transparent onPress={() => read(item.id)}>
                        <FontAwesome name="check" size={24} color="#7c9d32"/>
                    </Button>
                    {item.read === false ? (
                        <Badge primary>
                            <Entypo name="unread" size={24} color="#fff"/>
                        </Badge>
                    ) : null}
                </Right>
            </ListItem>
        );
    }

    renderItem2({item, index}) {
        function read(index) {
            var user = firebase.auth().currentUser;
            if (user) {
                firebase
                    .database()
                    .ref('users/' + user.uid + '/notifications/' + index)
                    .update({
                        read: true,
                    });
            }
        }

        function viewInfo(index, bool = false) {
            return (
                <View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            marginTop: 70,
                            width: width,
                            height: height,
                        }}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            visible={bool}
                            onRequestClose={() => {
                                Alert.alert('Modal has been closed.');
                            }}>
                            <Card style={{marginTop: 30}}>
                                <CardItem header>
                                    <Body>
                                        <Text>ArazStore notify </Text>
                                    </Body>
                                    <Right>
                                        <Button transparent onPress={() => (bool = false)}>
                                            <AntDesign name="close" size={24} color="#D50000"/>
                                        </Button>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>100 azn lik alış veriş etdiniz</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Modal>
                    </View>
                </View>
            );
        }

        return (
            <ListItem
                style={styles.firstList}
                thumbnai
                key={index}
                onPress={() => viewInfo(item.id, true)}>
                <Left style={styles.left}>
                    <Thumbnail
                        square
                        source={{
                            uri: item.image,
                        }}
                        style={styles.thumbImage}
                    />
                </Left>
                <Body style={styles.body}>
                    <Text style={styles.cardNumbText}>
                        {item.content[0].title}
                        {item.read === false ? (
                            <Entypo name="dot-single" size={28} color="#BF360C"/>
                        ) : null}
                    </Text>
                    <Text style={styles.cardNumbText}>{item.date}</Text>
                </Body>
                <Right style={styles.right}>
                    <Button transparent onPress={() => read(item.id)}>
                        {item.read === false ? (
                            <FontAwesome name="check" size={24} color="#6d7587"/>
                        ) : (
                            <FontAwesome name="check" size={24} color="#7c9d32"/>
                        )}
                    </Button>
                </Right>
            </ListItem>
        );
    }

    deleteNotifies() {
        var user = firebase.auth().currentUser;
        if (user) {
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
                        onPress: () =>
                            firebase
                                .database()
                                .ref('users/' + user.uid + '/notifications')
                                .remove(),
                        style: 'destructive',
                    },
                ],
                {cancelable: true}
            );
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    readNotifies() {
        var user = firebase.auth().currentUser;
        if (user) {
            Alert.alert(
                t('readyReadNotify'),
                [
                    {
                        text: t('cancel'),
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: t('delete'),
                        onPress: () =>
                            firebase
                                .database()
                                .ref('users/' + user.uid + '/notifications')
                                .remove(),
                        style: 'destructive',
                    },
                ],
                {cancelable: true}
            );
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    render() {
        return (
            <View style={styles.f1}>
                <StatusBar backgroundColor="#fff" style="dark"/>
                <Container style={styles.f1}>
                    <Header
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 12,
                            backgroundColor: "#fff",
                            alignItems: "center",
                            alignContent: "center",
                            textAlign: "center"
                        }}>
                        <View
                            style={{
                                alignItems: "center",
                                alignContent: "center",
                                textAlign: "center",
                                justifyContent: "center"
                            }}
                        >
                            <Button
                                style={{
                                    alignItems: "center",
                                    alignContent: "center",
                                    textAlign: "center",
                                    justifyContent: "center"
                                }}

                                transparent
                                onPress={() => this.props.navigation.goBack()}>
                                <AntDesign name="back" size={24} color="#7c9d32"/>
                            </Button>
                        </View>
                        <View style={{
                            alignItems: "center",
                            alignContent: "center",
                            textAlign: "center",
                            justifyContent: "center"
                        }}>
                            <Text style={styles.headerTitle}>{t('notifications')}</Text>
                        </View>
                        <View style={{
                            alignItems: "center",
                            alignContent: "center",
                            textAlign: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}>
                            <Button transparent onPress={() => this.deleteNotifies}>
                                <Feather name="trash-2" size={24} color="#7c9d32"/>
                            </Button>
                            <Button transparent onPress={() => this.readNotifies}>
                                <Feather name="user-check" size={24} color="#7c9d32"/>
                            </Button>
                        </View>
                    </Header>
                    <Content>
                        <View>
                            <ScrollView style={styles.scrollrecent}>
                                {this.state.refreshing === true ||
                                this.state.loading === true ||
                                this.state.notifications === null ? (
                                    <List style={styles.w100}>
                                        <Text style={styles.nullObject}>{t('noResult')}</Text>
                                    </List>
                                ) : (
                                    <List style={styles.w100}>
                                        <FlatList
                                            style={styles.w100}
                                            data={this.state.notifies}
                                            renderItem={this.renderItem2}
                                            keyExtractor={(item, index) => index.toString()}
                                            refreshing={this.state.refreshing}
                                            onRefresh={this.handleRefresh}
                                        />
                                    </List>
                                )}
                            </ScrollView>
                        </View>
                    </Content>
                </Container>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    f1: {
        width: width,
        height: height,
    },
    scrollrecent: {
        flex: 1,
        width: width,
    },
    headerTitle: {
        color: '#7c9d32',
        fontWeight: 'bold',
        fontSize: 19,
        marginLeft: 20
    },
    w100: {
        width: width,
    },
    body: {
        marginLeft: -150,
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
    nullObject: {
        color: '#D50000',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
