import * as React from 'react';
import {
    View,
    ScrollView,
    StyleSheet,
    Dimensions,
    Linking,
    Text,
} from 'react-native';
import {
    Container,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Right,
    Body,
    Button,
    Fab,
    Header,
} from 'native-base';
import {SliderBox} from 'react-native-image-slider-box';
import {AntDesign} from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as Localization from 'expo-localization';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import HTMLView from 'react-native-htmlview';

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

    async share() {
        this.setState({active: !this.state.active});
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Paylaşım etməyiniz gözlənilir`);
            return null;
        }
        Sharing.shareAsync('https://www.google.com');
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
                <Header style={styles.header} backgroundColor="#7c9d32">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="back" size={24} color="#fff"/>
                        </Button>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Text
                            style={styles.headerTitle}>
                            {this.state.oneCampaign != null ? this.name(this.state.oneCampaign) : null}
                        </Text>
                    </Body>
                    <Right/>
                </Header>
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
                                        <Fab
                                            active={this.state.active}
                                            direction="up"
                                            style={{backgroundColor: '#7c9d32'}}
                                            position="bottomRight"
                                            onPress={() => this.share}>
                                            <AntDesign name="sharealt" size={27} color="#fff"/>
                                        </Fab>
                                    </View>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text
                                            style={styles.title}>{this.state.oneCampaign != null ? this.name(this.state.oneCampaign) : null}</Text>
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
        backgroundColor: '#7c9d32',
    },
    headerBody: {
        flex: 2.5,
    },
    headerTitle: {
        color: '#fff',
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
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
        width: width,
        maxHeight: 140,
        marginBottom: 25,
    },
    fabArena: {
        width: width / 4,
        height: 40,
        position: 'absolute',
        top: -2,
        right: 0,
    },
    textColor: {
        color: '#6d7587',
        fontSize: 17,
        padding: 5,
    },
});
