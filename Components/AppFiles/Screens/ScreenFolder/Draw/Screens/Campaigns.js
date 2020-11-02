import * as React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    FlatList,
    ImageBackground,
    Text,
    TouchableOpacity
} from 'react-native';
import {
    Container,
    Left,
    Right,
    Thumbnail,
    Body,
    Button,
    Card,
    CardItem,
} from 'native-base';
import {
    FontAwesome,
} from '@expo/vector-icons';
import * as Localization from 'expo-localization';

import firebase from '../../../../Functions/FireBase/firebaseConfig';
import ShimmerPlaceholder from "react-native-shimmer-placeholder";
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

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

export default class Campaigns extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceData: null,
            newsData: null,
            refresh: true,
        };
    }

    getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            var services = [];
            firebase
                .database()
                .ref('campaigns')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({
                        newsData: datas,
                        refresh: false
                    });
                });
            firebase
                .database()
                .ref('services')
                .on('value', (data) => {
                    data.forEach((data) => {
                        services.push(data.val());
                    });
                    this.setState({
                        serviceData: services,
                        refresh: false
                    });
                });
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillUnmount() {
        firebase.database().goOffline();
    }

    renderService({item, index}) {
        var that = this;

        function serviceName(item) {
            if (Localization.locale == 'en' || Localization.locale === 'en') {
                return item.en_title;
            } else if (Localization.locale == 'ru' || Localization.locale === 'ru') {
                return item.ru_title;
            } else if (Localization.locale == 'az' || Localization.locale === 'az') {
                return item.az_title;
            }
        }

        return (
            <View style={{backgroundColor: "transparent", marginHorizontal: 5, width: 90, height: 90}} key={index}>
                <TouchableOpacity onPress={() => that.props.navigation.navigate("OtherPages", {
                    screen: 'OneService',
                    params: {
                        uid: item.id,
                    }
                })}>
                    <ImageBackground
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 5,
                            marginTop: 7,
                            position: "relative",
                        }}
                        source={{uri: "https://picsum.photos/200/300.jpg"}}/>

                    <View style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        marginTop: 5,
                        backgroundColor: "rgba(0,0,0,.3)"
                    }}>
                        <MyText
                            style={{fontSize: 20, fontWeight: "bold", color: "#fff", width: "100%", marginTop: 20}}
                            children={serviceName(item)}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderCards(nav) {
        function name(item) {
            if (Localization.locale == 'en' || Localization.locale === 'en') {
                return item.en_title;
            } else if (Localization.locale == 'ru' || Localization.locale === 'ru') {
                return item.ru_title;
            } else if (Localization.locale == 'az' || Localization.locale === 'az') {
                return item.az_title;
            }
        }

        if (this.state.newsData != null) {
            return this.state.newsData.map((item) => {
                return (
                    <Card style={styles.card}>
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
                                <MyText note children={item.created_at}/>
                            </Body>
                            <Right>
                                <Button
                                    transparent
                                    onPress={() =>
                                        nav.navigate("OtherPages", {
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
            });
        } else {
            this.getInfo();
        }
    }

    render() {
        return (
            <Container>
                <View style={styles.f1}>
                    {this.state.refresh ? (
                        <View style={styles.services}>
                            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}
                                        scrollEnabled={true} bounces={true} bouncesZoom={true}
                            >
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: 90, height: 90, marginTop: 10, marginRight: 10}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: 90, height: 90, marginTop: 10, marginRight: 10}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: 90, height: 90, marginTop: 10, marginRight: 10}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: 90, height: 90, marginTop: 10, marginRight: 10}}
                                />
                                <ShimmerPlaceholder
                                    visible={false}
                                    isInteraction={true}
                                    style={{width: 90, height: 90, marginTop: 10, marginRight: 10}}
                                />

                            </ScrollView>
                        </View>
                    ) : (
                        <ScrollView>
                            <View style={styles.services}>
                                <FlatList
                                    data={this.state.serviceData}
                                    renderItem={this.renderService.bind(this)}
                                    keyExtractor={(index) => index}
                                    horizontal={true}
                                />
                            </View>
                        </ScrollView>
                    )}
                    {this.state.refresh ? (
                        <ScrollView>
                            <ShimmerPlaceholder
                                visible={false}
                                isInteraction={true}
                                style={{width: width, height: 325, marginTop: 10}}
                            />
                            <ShimmerPlaceholder
                                visible={false}
                                isInteraction={true}
                                style={{width: width, height: 325, marginTop: 10}}
                            />
                            <ShimmerPlaceholder
                                visible={false}
                                isInteraction={true}
                                style={{width: width, height: 325, marginTop: 10}}
                            />
                            <ShimmerPlaceholder
                                visible={false}
                                isInteraction={true}
                                style={{width: width, height: 325, marginTop: 10}}
                            />

                        </ScrollView>
                    ) : (
                        <ScrollView style={{marginBottom: 70}}>{this.renderCards(this.props.navigation)}</ScrollView>
                    )}
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    f1: {
        width: width,
        height: height,
    },
    color: {
        color: '#6d7587',
    },
    services: {
        width: width,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: "flex-start",
        textAlign: 'center',
        height: 110,
        backgroundColor: "#fff",
    },
    serviceName: {
        fontSize: 18,
    },
    thumbBIgImage: {
        width: width,
        height: 150,
    },
    body: {
        marginLeft: -70,
        marginTop: 1,
    },
    titleColor: {
        color: '#7c9d32',
        fontSize: 17,
        fontWeight: 'bold',
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
});
