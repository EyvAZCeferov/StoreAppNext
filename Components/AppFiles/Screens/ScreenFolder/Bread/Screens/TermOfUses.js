import React from 'react';
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    View,
    Text
} from 'react-native';
import {
    Thumbnail,
    Header,
    Left,
    Right,
    Body,
    Button,
} from 'native-base';
import {AntDesign} from '@expo/vector-icons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import HTMLView from 'react-native-htmlview';
import {t} from '../../../../Lang';
import {StatusBar} from "expo-status-bar";
import * as Localization from "expo-localization";

export default class TermOfUses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillUnmount() {
        firebase.database().goOffline()
    }

    getInfo() {
        firebase.database().goOnline()
        firebase
            .database()
            .ref('termOfUse/1')
            .on('value', (data) => {
                this.setState({datas: data.toJSON()});
            });
    }

    langConvert(e) {
        if (Localization.locale == 'en' || Localization.locale === 'en') {
            return e.en_text;
        } else if (Localization.locale == 'ru' || Localization.locale === 'ru') {
            return e.ru_text;
        } else if (Localization.locale == 'az' || Localization.locale === 'az') {
            return e.az_text;
        }
    }

    render() {
        return (
            <View>
                <StatusBar style="dark" backgroundColor="#fff"/>
                <Header style={styles.header}>
                    <View>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="back" size={24} color="#7c9d32"/>
                        </Button>
                    </View>
                    <View style={styles.headerBody}>
                        <Text style={styles.headerTitle}>{t('termsofuseoftheapplication')}</Text>
                    </View>
                    <View/>
                </Header>
                <ScrollView>
                    <View style={styles.justify}>
                        <Thumbnail
                            source={{uri: this.state.datas.icon}}
                            style={styles.icon}
                        />
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "bold",
                            color: '#010101',
                            width: width,
                            height: 20
                        }}>
                            Pay And Way
                        </Text>
                        <HTMLView
                            value={this.langConvert(this.state.datas)}
                            stylesheet={styles.textColor}
                            addLineBreaks={true}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    justify: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 20,
    },
    icon: {
        marginVertical: 40,
        width: width / 4,
        height: height / 6,
    },
    header: {
        backgroundColor: '#fff',
        justifyContent: "space-around",
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 59,
    },
    headerBody: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    headerTitle: {
        color: '#7c9d32',
        fontWeight: 'bold',
        fontSize: 19,
    },
    textColor: {
        color: '#6d7587',
    },
});
