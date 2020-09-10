import * as React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Linking,
    Text,
    Share
} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Button,
} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import {AntDesign} from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import {StatusBar} from 'expo-status-bar';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import HTMLView from 'react-native-htmlview';
import DropdownAlert from "react-native-dropdownalert";

const succesImage = require('../../../../../../assets/images/Alert/tick.png');
export default class OneCampaign extends React.Component {
    state = {
        active: false,
        oneCampaign: null,
        newImages: null,
    };

    getInfo() {
        var user = firebase.auth().currentUser;
        const params = this.props.route.params;
        if (user) {
            firebase
                .database()
                .ref('campaigns/' + params.uid)
                .on('value', (data) => {
                    this.setState({
                        oneCampaign: data.toJSON(),
                    });
                });
            firebase
                .database()
                .ref('campaigns/' + params.uid + '/images')
                .on('value', (data) => {
                    var datas = [];
                    var newDatas = data.toJSON();
                    for (var i = 0; i < data.numChildren(); i++) {
                        datas.push(newDatas[i]['src']);
                    }
                    this.setState({newImages: datas});
                });
        } else {
            this.props.navigation.navigate('Home');
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    async share(title, desc, url) {
        console.log(title, desc, url)
        try {
            const result = await Share.share({
                    title: title,
                    message: desc,
                    url: url != null ? url : 'https://payandwin.az',
                }, {
                    dialogTitle: title + " Paylaşmaq üçün hazırdır.",
                    subject: title,
                    tintColor: "7c9d32"
                })
            ;

            if (result.action === Share.sharedAction) {
                this.dropDownAlertRef.alertWithType('success', 'Paylaşmaq üçün hazırdır.');
            } else if (result.action === Share.dismissedAction) {
                this.dropDownAlertRef.alertWithType('error', 'Post paylaşıla bilmədi.', 'Təkrar yoxlayın.');
            }
        } catch (error) {
            this.dropDownAlertRef.alertWithType('error', 'Xəta', error.message);
        }
    };

    name(item) {
        if (Localization.locale == 'en' || Localization.locale === 'en') {
            return item.en_title;
        } else if (Localization.locale == 'ru' || Localization.locale === 'ru') {
            return item.ru_title;
        } else if (Localization.locale == 'az' || Localization.locale === 'az') {
            return item.az_title;
        }
    }

    desc(item) {
        if (Localization.locale == 'en' || Localization.locale === 'en') {
            return item.en_description;
        } else if (Localization.locale == 'ru' || Localization.locale === 'ru') {
            return item.ru_description;
        } else if (Localization.locale == 'az' || Localization.locale === 'az') {
            return item.az_description;
        }
    }

    render() {
        return (
            <Container>
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
                <View style={styles.header}>
                    <View>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="back" size={24} color="#7c9d32"/>
                        </Button>
                    </View>
                    <View style={styles.headerBody}>
                        <Text
                            style={styles.headerTitle}>
                            {this.state.oneCampaign != null ? this.name(this.state.oneCampaign) : null}
                        </Text>
                    </View>
                    <View/>
                </View>
                <View style={styles.f1}>
                    <Content>
                        <ScrollView style={styles.f1}>
                            <Card style={styles.card}>
                                <CardItem>
                                    <Left>
                                        {this.state.oneCampaign != null ? (
                                            <Thumbnail
                                                source={{
                                                    uri: this.state.oneCampaign.marketIcon,
                                                }}
                                            />
                                        ) : null}

                                        <Body>
                                            <Text style={styles.titleColor}>
                                                {this.state.oneCampaign != null ? this.state.oneCampaign.marketName : null}
                                            </Text>
                                            <Text note>
                                                {this.state.oneCampaign != null ? this.state.oneCampaign.created_at : null}
                                            </Text>
                                        </Body>
                                    </Left>
                                </CardItem>
                                <CardItem cardBody>
                                    {this.state.newImages != null ? (
                                        <SliderBox
                                            images={this.state.newImages}
                                            dotColor="#7c9d32"
                                            inactiveDotColor="#6d7587"
                                            circleLoop={true}
                                            imageLoadingColor="#7c9d32"
                                            sliderBoxHeight={300}
                                        />
                                    ) : null}
                                </CardItem>
                                <CardItem>
                                    <View style={styles.fabArena}>
                                        <Text
                                            style={styles.title}>{this.state.oneCampaign != null ? this.name(this.state.oneCampaign) : null}</Text>
                                        <Button
                                            style={styles.shareButton}
                                            onPress={
                                                () =>
                                                    this.share(
                                                        this.name(this.state.oneCampaign),
                                                        this.desc(this.state.oneCampaign),
                                                        this.state.oneCampaign.slug
                                                    )
                                            }>
                                            <AntDesign name="sharealt" size={27} color="#fff"/>
                                        </Button>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <Body style={{marginBottom: 20}}>
                                        {this.state.oneCampaign != null ? (<HTMLView
                                            value={this.desc(this.state.oneCampaign)}
                                            onLinkPress={() => Linking.openURL(this.state.oneCampaign.slug)}
                                            stylesheet={styles.textColor}
                                        />) : null}
                                    </Body>
                                </CardItem>
                            </Card>
                        </ScrollView>
                    </Content>
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
    header: {
        justifyContent: "space-between",
        flexDirection: "row",
        paddingHorizontal: 10,
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        width: width
    },
    headerBody: {
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    headerTitle: {
        color: '#7c9d32',
        fontSize: 19,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 40,
        width: width,
        marginTop: 0,
    },
    titleColor: {
        color: '#7c9d32',
        fontSize: 17,
        fontWeight: 'bold',
    },
    title: {
        color: '#010101',
        fontWeight: 'bold',
        fontSize: 20,
    },
    fabArena: {
        width: width,
        minHeight: 50,
        maxHeight: 150,
        flexDirection: "row",
        backgroundColor: "transparent",
        justifyContent: "space-around",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        borderRadius: 13
    },
    shareButton: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        width: 50,
        height: "100%",
        backgroundColor: "#7c9d32",
        borderRadius: 13,
        marginRight: '5%'
    },
    textColor: {
        color: '#6d7587',
        fontSize: 17,
        padding: 5,
    },
});
