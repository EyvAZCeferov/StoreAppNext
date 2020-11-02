import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    ScrollView,
    FlatList,
    ActivityIndicator
} from 'react-native';
import firebase from "../../../../Functions/FireBase/firebaseConfig";
import {StatusBar} from 'expo-status-bar';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import * as Localization from "expo-localization";
import {t} from "../../../../Lang";
import {Body, Button, Card, CardItem, Left, Right, Thumbnail} from "native-base";
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

const {width, height} = Dimensions.get('window');
export default class OneService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            oneService: null,
            campaigns: null,
            refresh: true
        }
    }

    async getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        const params = this.props.route.params;
        if (params.uid != null) {
            if (user) {
                firebase
                    .database()
                    .ref('services/' + params.uid)
                    .on('value', (data) => {
                        this.setState({
                            oneService: data.toJSON(),
                        });
                    });
                firebase
                    .database()
                    .ref('campaigns')
                    .orderByChild("category_id")
                    .limitToFirst(10)
                    .on('value', data => {
                        var keys = [];
                        var cards = [];
                        data.forEach(element => {
                            keys.push(element.key)
                        });
                        keys.map((element) => {
                            firebase
                                .database()
                                .ref('campaigns/' + element + '/category_id/' + params.uid)
                                .on('value', data => {
                                    console.log(data)
                                    data.forEach(d => {
                                        cards.push(d.val())
                                    });
                                })
                        })

                        this.setState({
                            campaigns: null,
                            refresh: false
                        })
                    })
            }
        }
    }

    componentDidMount() {
        this.getInfo()
    }

    componentWillUnmount() {
        firebase.database().goOffline();
    }

    name(item) {
        if (Localization.locale == 'en' || Localization.locale === 'en') {
            return item.en_title;
        } else if (Localization.locale == 'ru' || Localization.locale === 'ru') {
            return item.ru_title;
        } else if (Localization.locale == 'az' || Localization.locale === 'az') {
            return item.az_title;
        }
    }

    renderCards({item, index}) {
        var that = this;

        function name(item) {
            if (Localization.locale == 'en' || Localization.locale === 'en') {
                return item.en_title;
            } else if (Localization.locale == 'ru' || Localization.locale === 'ru') {
                return item.ru_title;
            } else if (Localization.locale == 'az' || Localization.locale === 'az') {
                return item.az_title;
            }
        }

        if (this.state.campaign != null) {
            return (
                <Card style={styles.card} key={index}>
                    <CardItem header>
                        <Left>
                            <Thumbnail
                                source={{
                                    uri: item.marketIcon,
                                }}
                                style={{maxWidth: 50, maxHeight: 50, padding: 2, margin: 0}}
                            />
                        </Left>
                        <Body style={styles.body}>
                            <MyText style={styles.titleColor} children={item.marketName}/>
                            <MyText textColor="rgba(0,0,0,0,.5)" children={item.created_at}/>
                        </Body>
                        <Right>
                            <Button
                                transparent
                                onPress={() =>
                                    that.props.navigate("OtherPages", {
                                        screen: 'OneCampaign',
                                        params: {
                                            uid: item.id,
                                        }
                                    })
                                }
                                style={{
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center",
                                    textAlign: "center",
                                    marginTop: -10
                                }}
                            >
                                <FontAwesome name="eye" size={24} color="#6d7587"/>
                            </Button>
                        </Right>
                    </CardItem>
                    <CardItem cardBody>
                        <Thumbnail
                            style={styles.thumbBIgImage}
                            source={{
                                uri: item.images[0]['src'],
                            }}
                            square
                        />
                    </CardItem>
                    <CardItem footer>
                        <Body>
                            <MyText style={styles.subTitle} children={name(item)}/>
                        </Body>
                    </CardItem>
                </Card>
            );

        } else {
            that.getInfo();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" backgroundColor="#fff"/>
                <View style={styles.page}>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => this.props.navigation.goBack()}>
                            <Ionicons name="ios-arrow-back" size={24} color="#7c9d32"/>
                        </TouchableOpacity>
                        <View style={styles.headerBody}>
                            <MyText
                                children={this.state.refresh ? null : this.name(this.state.oneService)}
                                style={styles.headerBodyText}/>
                        </View>
                        <View/>
                    </View>
                    <View style={styles.serviceAbout}>
                        {this.state.refresh ? (
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                alignContent: "center"
                            }}>
                                <ActivityIndicator size="large" focusable={true} accessibilityLabel="Hay?"
                                                   color="#7c9d32"/>
                            </View>
                        ) : (
                            <ImageBackground
                                source={{uri: "https://picsum.photos/200/300.jpg"}}
                                resizeMode='cover'
                                resizeMethod="auto"
                                fadeDuration={1000}
                                accessibilityLabel={this.name(this.state.oneService)}
                                accessibilityComponentType="button"
                                style={{width: width / 2, height: '100%'}}/>
                        )}
                        {this.state.refresh ? null : (
                            <MyText style={{
                                color: "#010101",
                                fontSize: 25,
                                fontWeight: "bold",
                                width: width / 2,
                                textAlign: "center",
                            }} children={this.name(this.state.oneService)}/>
                        )}
                    </View>
                    <View style={styles.otherPost}>
                        <ScrollView>
                            {this.state.refresh || this.state.campaigns == null ? (
                                <View style={{
                                    width: width,
                                    height: height - height / 3,
                                    alignContent: "center",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "transparent"
                                }}>
                                    <MyText style={{
                                        color: "red",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bold"
                                    }} children={t('noResult')}/>
                                </View>
                            ) : (
                                <FlatList
                                    data={this.state.campaigns}
                                    renderItem={this.renderCards.bind(this)}
                                    keyExtractor={(item, index) => index.toString()}
                                    windowSize={width}
                                    zoomScale={1.5}
                                    scrollEnabled={true}
                                    horizontal={false}/>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        backgroundColor: "#fff",
        borderColor: "#fff",
    },
    page: {
        width: '100%',
        height: '100%',
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
    header: {
        width: '100%',
        height: '10%',
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
    backButton: {
        width: 40,
        height: '100%',
        paddingTop: '5%',
        paddingLeft: '2%',
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
    headerBody: {
        width: '80%',
        height: '100%',
        paddingTop: '5%',
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
    headerBodyText: {
        color: "#7c9d32",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    serviceAbout: {
        width: width,
        height: '17%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
    otherPost: {
        width: '100%',
        height: '73%',
        backgroundColor: "transparent",
        borderColor: "transparent",
    },
    subTitle: {
        color: 'rgba(0,0,0,.5)',
        fontWeight: 'bold',
        fontSize: 15,
        marginVertical: 10,
        width: width - 30,
        marginLeft: 2,
        maxHeight: 20,
    },
    card: {
        margin: 0,
        borderColor: "#fff",
    }
})