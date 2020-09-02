import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
} from 'react-native';
import {
    Container,
    Left,
    Right,
    Thumbnail,
    Body,
    Button,
    List,
    ListItem,
} from 'native-base';
import ScreensStandart from '../Component/ScreensStandart';
import {AntDesign} from '@expo/vector-icons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {t} from '../../../../Lang';
import firebase from '../../../../Functions/FireBase/firebaseConfig';

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {chosenDate: new Date()};
        this.setDate = this.setDate.bind(this);
        this.state = {
            history: [
                {
                    image:
                        'https://banker.az/wp-content/uploads/2018/02/Kapital_Bank_-e1518595902278.png',
                    title: 'Bazar Store 1',
                    price: 80,
                    date: '24.07.2020',
                    ficsalId: '#a42565456',
                },
                {
                    image:
                        'https://banker.az/wp-content/uploads/2018/02/Kapital_Bank_-e1518595902278.png',
                    title: 'Bazar Store 1',
                    price: 80,
                    date: '24.07.2020',
                    ficsalId: '#a42565456',
                },
                {
                    image:
                        'https://banker.az/wp-content/uploads/2018/02/Kapital_Bank_-e1518595902278.png',
                    title: 'Bazar Store 1',
                    price: 80,
                    date: '24.07.2020',
                    ficsalId: '#a42565456',
                },
            ],
            checks: null,
        };
    }

    async getInfo() {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/checks')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({
                        checks: datas,
                    });
                });
        } else {
            this.props.navigation.navigate('CreateAccount');
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillUnmount() {
        firebase.database().goOffline()
    }

    setDate(newDate) {
        this.setState({chosenDate: newDate});
    }

    renderList(props) {
        if (this.state.checks !== null) {
            return this.state.checks.map((element) => {
                return (
                    <ListItem first style={styles.firstList} thumbnail>
                        <Left>
                            <Thumbnail
                                square
                                source={{
                                    uri: element.image,
                                }}
                                style={styles.thumbImage}
                            />
                        </Left>
                        <Body>
                            <Text style={styles.listtitle}>{element.title}</Text>
                            <Text>
                                {element.price} AZN {element.date}
                            </Text>
                        </Body>
                        <Right>
                            <Button
                                transparent
                                onPress={() =>
                                    props.navigate('OneCheck', {
                                        ficsalId: element.ficsalId,
                                        title: element.title,
                                    })
                                }>
                                <AntDesign name="eyeo" size={24} color="#7c9d32"/>
                            </Button>
                        </Right>
                    </ListItem>
                );
            });
        }
    }

    render() {
        return (
            <View>
                <ScreensStandart {...this.props} name={t('history')}/>
                <Container>
                    <View style={styles.f1}>
                        <ScrollView>
                            <List style={styles.w100}>
                                {this.renderList(this.props.navigation)}
                            </List>
                        </ScrollView>
                    </View>
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
    scrollSearch: {
        width: width,
        height: 50,
    },
    listtitle: {
        color: '#6d7587',
        fontWeight: 'bold',
    },
    w100: {
        width: width,
    },
    firstList: {
        marginTop: 15,
    },
    thumbImage: {
        borderRadius: 100,
    },
    timEPickerText: {
        color: '#6d7587',
        fontSize: 15,
        marginTop: 7,
        marginLeft: -15,
        paddingLeft: 0,
    },
});
