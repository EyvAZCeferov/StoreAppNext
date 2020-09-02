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

    render() {
        return (
            <View>
                <Header style={styles.header} backgroundColor="#7c9d32">
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="back" size={24} color="#fff"/>
                        </Button>
                    </Left>
                    <Body style={styles.headerBody}>
                        <Text style={styles.headerTitle}>{t('termsofuseoftheapplication')}</Text>
                    </Body>
                    <Right/>
                </Header>
                <ScrollView>
                    <View style={styles.justify}>
                        <Thumbnail
                            source={{uri: this.state.datas.icon}}
                            style={styles.icon}
                        />

                        <HTMLView
                            value={this.state.datas.text}
                            stylesheet={styles.textColor}
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
        backgroundColor: '#7c9d32',
    },
    headerBody: {
        flex: 1.5,
    },
    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 19,
    },
    textColor: {
        color: '#6d7587',
    },
});
