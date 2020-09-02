import * as React from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    SafeAreaView,
    ScrollView,
    FlatList,
} from 'react-native';
import {
    Button,
    Left,
    Right,
    Content,
    Picker,
    Form,
    Item,
    Input,
    List,
    ListItem,
} from 'native-base';
import {AntDesign, Feather} from '@expo/vector-icons';
import {t} from '../../../../Lang';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import firebase from '../../../../Functions/FireBase/firebaseConfig';

export default class PayPre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'key1',
            yourCards: [
                {
                    title: 'Kapital',
                    val: 'Kap',
                },
                {
                    title: 'Kapital Kredit',
                    val: 'KapKred',
                },
            ],
            cards: null,
            resultSumm: 20,
        };
    }

    onValueChange(value) {
        this.setState({
            selected: value,
        });
    }

    async getInfo() {
        firebase.database().goOnline()
        var user = firebase.auth().currentUser;
        var datas = [];
        if (user) {
            firebase
                .database()
                .ref('users/' + user.uid + '/cards')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({
                        cards: datas,
                    });
                });
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillUnmount() {
        firebase.database().goOffline();
    }


    renderItem({buyedElements}) {
        buyedElements.map((element, key) => {
            return (
                <ListItem style={[styles.listitem]} key={key}>
                    <Left>
                        <Text style={[styles.listtitle, styles.boldWeight]}>
                            {element.title}
                        </Text>
                        <Text style={styles.listtitle}>
                            {element.qty} {t('qty')}
                        </Text>
                    </Left>
                    <Right>
                        <Text style={styles.money}> {element.price} AZN </Text>
                    </Right>
                </ListItem>
            );
        });
    }

    rendered({item, key}) {
        return (
            <ListItem style={[styles.listitem, {backgroundColor: 'red'}]} key={key}>
                <Left>
                    <Text style={[styles.listtitle, styles.boldWeight]}>
                        {item.title}
                    </Text>
                    <Text style={styles.listtitle}>
                        {item.qty} {t('qty')}
                    </Text>
                </Left>
                <Right>
                    <Text style={styles.money}> {item.price} AZN </Text>
                </Right>
            </ListItem>
        );
    }

    list = () => {
        return this.state.yourCards.map((element) => {
            return (
                <Picker.Item
                    style={styles.pickerItem}
                    label={element.title}
                    value={element.type}
                />
            );
        });
    };

    render() {
        const params = this.props.route.params;
        const summary = params.summary;
        const buyedElements = params.buyedElements;
        return (
            <View style={styles.f1}>
                <View style={styles.f1}>
                    <SafeAreaView style={styles.f1}>
                        <View style={styles.scrollChecks}>
                            <ScrollView>
                                <View>
                                    <View style={styles.check}>
                                        <List style={styles.list}>
                                            <FlatList
                                                data={buyedElements}
                                                renderItem={this.rendered}
                                            />
                                        </List>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        <Content style={styles.content}>
                            <Form style={styles.form}>
                                <Item style={styles.itemStyle}>
                                    <Picker
                                        note
                                        mode="dropdown"
                                        style={[styles.inputstyle, styles.picker]}
                                        selectedValue={this.state.selected}
                                        iosIcon={
                                            <AntDesign name="down" size={15} color="#6d7587"/>
                                        }
                                        androidIcon={
                                            <AntDesign name="down" size={15} color="#6d7587"/>
                                        }
                                        icon={<AntDesign name="down" size={15} color="#6d7587"/>}
                                        placeholder="Select your SIM"
                                        placeholderStyle={{color: '#bfc6ea'}}
                                        onValueChange={this.onValueChange.bind(this)}>
                                        {this.list()}
                                    </Picker>

                                    <Input
                                        style={[
                                            styles.inputstyle,
                                            styles.widthThen,
                                            styles.moneyInput,
                                        ]}
                                        disabled
                                        placeholder={summary != null ? summary : null}
                                    />
                                </Item>
                                <Item style={styles.itemStyle}>
                                    <Button
                                        rounded
                                        style={styles.continBtn}
                                        success
                                        iconRight
                                        {...this.props}
                                        onPress={() =>
                                            this.props.navigation.navigate('PayThanks', {
                                                link: 'https://www.facebook.com',
                                            })
                                        }>
                                        <Text style={styles.btnText}>{t('continue')}</Text>
                                        <Feather name="check-circle" size={24} color="#fff"/>
                                    </Button>
                                </Item>
                            </Form>
                        </Content>
                    </SafeAreaView>
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
    scrollChecks: {
        width: width,
        height: 340,
    },
    content: {
        padding: 0,
        margin: 0,
        marginTop: 10,
        backgroundColor: '#fff',
    },
    list: {
        width: width,
        marginVertical: 10,
        borderColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    listtitle: {
        color: '#fff',
    },
    boldWeight: {
        fontWeight: 'bold',
    },
    listitem: {
        width: width - 30,
        borderColor: 'transparent',
    },
    money: {
        color: '#7c9d32',
        fontWeight: '600',
        fontSize: 15,
    },
    form: {
        padding: 0,
        margin: 0,
        width: width,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    itemStyle: {
        width: width - 50,
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
        flex: 1,
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
    picker: {
        width: width - 190,
        flex: 0.5,
        marginRight: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6d7587',
    },
    widthThen: {
        width: width,
        flex: 1,
    },
    moneyInput: {
        padding: 0,
        paddingLeft: 20,
    },
    pickerItem: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#6d7587',
        paddingLeft: 0,
        textAlign: 'left',
    },
    continBtn: {
        width: width - 160,
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50,
        fontSize: 15,
    },
    btnText: {
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        color: '#fff',
        fontSize: 15,
        paddingRight: 15,
    },
});
