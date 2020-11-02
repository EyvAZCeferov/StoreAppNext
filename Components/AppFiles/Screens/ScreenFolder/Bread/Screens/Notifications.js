import React from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
    FlatList,
    Alert,
    Platform
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
} from 'native-base';
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {t} from '../../../../Lang';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {
    AntDesign,
    Feather,
    Entypo,
} from '@expo/vector-icons';
import {StatusBar} from "expo-status-bar";
import * as Permissions from "expo-permissions";
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
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

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function Notification(props) {
    const [notifies, setNotifies] = React.useState([
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
    ])
    const [notification, setNotification] = React.useState(null)
    const [refresh, setRefresh] = React.useState(true)
    const [token, setToken] = React.useState(null)

    async function getNotifyPerform() {
        registerForPushNotificationsAsync().then(token => setTokenFunction(token));

        function setTokenFunction(token) {
            var user = firebase.auth().currentUser;
            firebase.database().ref('users/' + user.uid + '/userInfos/push_id').set(token)
            setToken(token)
        }
    }

    function getInfo() {
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

                    setNotification(datas)
                    setRefresh(false)
                    renderContent()
                });
        }
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
        return token
    }

    React.useEffect(() => {
        getInfo()
        getNotifyPerform()
    }, [])

    async function handleRefresh() {
        setRefresh(true)
        getInfo()
    }

    function renderItem2({item, index}) {

        return (
            <ListItem
                style={styles.firstList}
                thumbnail
                key={index}
                onPress={(index) => props.navigation.navigate("OtherPages", {
                    screen: 'AboutNotify',
                    params: {
                        uid: index,
                    }
                })}>
                <Left>
                    <Thumbnail
                        square
                        source={{
                            uri: item.image,
                        }}
                        style={styles.thumbImage}
                    />
                </Left>
                <Body>
                    <MyText style={styles.cardNumbText} children={item.content[0].title}/>
                    <MyText style={{fontSize: 15, color: "rgba(0,0,0,.5)"}} children={item.date}/>
                </Body>
                <Right>
                    {item.read === false ? (
                        <Entypo name="dot-single" size={33} color="#BF360C"/>
                    ) : (
                        <Entypo name="dot-single" size={33} color="#7c9d32"/>
                    )}
                </Right>
            </ListItem>
        );
    }

    function deleteNotifies() {
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
        }
    }

    function readNotifies() {
        var user = firebase.auth().currentUser;
        if (user) {
            Alert.alert(
                t('readyReadNotify'),
                '',
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
                                .ref('users/' + user.uid + '/notifications').orderByValue('noOrder').isEqual('yea').limitToFirst(100),
                        style: 'destructive',
                    },
                ],
                {cancelable: true}
            );
        }
    }

    function renderContent() {
        return (
            <View>
                <ScrollView style={styles.scrollrecent}>
                    {refresh ||
                    notification === null ? (
                        <List style={styles.w100}>
                            <MyText style={styles.nullObject} children={t('noResult')}/>
                        </List>
                    ) : (
                        <List style={styles.w100}>
                            <FlatList
                                style={styles.w100}
                                data={notifies}
                                renderItem={renderItem2}
                                keyExtractor={(item, index) => index.toString()}
                                refreshing={refresh}
                                onRefresh={handleRefresh}
                            />
                        </List>
                    )}
                </ScrollView>
            </View>
        )
    }

    return (
        <View style={styles.f1}>
            <StatusBar backgroundColor="#fff" style="dark"/>
            <Container style={styles.f1}>
                <StatusBar backgroundColor="#fff" style="dark"/>
                <Header
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "#fff",
                        alignItems: "center",
                        alignContent: "center",
                        textAlign: "center"
                    }}>
                    <StatusBar backgroundColor="#fff" style="dark"/>
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
                            onPress={() => props.navigation.goBack()}>
                            <AntDesign name="left" size={24} color="#7c9d32"/>
                        </Button>
                    </View>
                    <View style={{
                        alignItems: "center",
                        alignContent: "center",
                        textAlign: "center",
                        justifyContent: "center"
                    }}>
                        <MyText style={styles.headerTitle} children={t('notifications')}/>
                    </View>
                    <View style={{
                        alignItems: "center",
                        alignContent: "center",
                        textAlign: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                    }}>
                        <Button transparent onPress={() => deleteNotifies()}>
                            <Feather name="trash-2" size={24} color="#7c9d32"/>
                        </Button>
                        <Button transparent onPress={() => readNotifies()}>
                            <Feather name="user-check" size={24} color="#7c9d32"/>
                        </Button>
                    </View>
                </Header>
                <Content>
                    {renderContent()}
                </Content>
            </Container>
        </View>
    );
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
    firstList: {
        marginBottom: 5,
    },
    cardNumbText: {
        fontSize: 17,
        marginBottom: 3,
        color: '#6d7587',
        fontWeight: 'bold',
    },
    thumbImage: {
        borderRadius: 50,
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
