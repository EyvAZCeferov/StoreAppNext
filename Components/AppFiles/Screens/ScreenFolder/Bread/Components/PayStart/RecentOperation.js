import React from 'react';
import {View, Text, ScrollView, FlatList, Alert, StyleSheet, Dimensions} from 'react-native';
import firebase from "../../../../../Functions/FireBase/firebaseConfig";
import {Body, Button, Left, List, ListItem, Right} from "native-base";
import {t} from "../../../../../Lang";
import {AntDesign, Feather} from "@expo/vector-icons";

const {width, height} = Dimensions.get('window');
export default class RecentOperation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checks: null,
            onCheck: [
                {
                    id: 1,
                    title: "Eyvaz",
                    qty: 1,
                    price: 50,
                },
                {
                    id: 2,
                    title: "Konul",
                    qty: 2,
                    price: 60,
                },
                {
                    id: 3,
                    title: "Shehla",
                    qty: 3,
                    price: 1.5,
                }
            ],
            refresh: true,
        }
    }

    getInfo() {
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('users')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({checks: datas})
                });
        } else {
            alert('Connection Problem');
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillUnmount() {
        firebase.database().goOffline();
    }

    renderStateList() {
        if (this.state.check != null) {
            return this.renderFullList();
        } else {
            return this.renderNullList();
        }
    }

    async handleRefresh() {
        this.getInfo();
        this.renderStateList()
        this.setState({refresh: false})
    }

    renderNullList() {
        const nullCheck = {
            backgroundColor: "#fff",
            borderColor: "#7c9d32",
            borderWidth: 2,
            width: 50,
            height: 50,
        };
        const unnullCheck = {
            backgroundColor: "#000",
            borderColor: "#7c9d32",
            borderWidth: 2,
            width: 50,
            height: 50,
        };
        return (
            <List style={{width: width, height: height}}>
                <Text style={styles.nullObject}>{t('noResult')}</Text>
                <View style={{marginTop: 80, width: width, justifyContent: "space-around"}}>
                    <View style={{justifyContent: "flex-end", marginLeft: "auto", marginRight: 10, marginVertical: 15}}>
                        <Button
                            onPress={() => this.props.navigation.navigate('OtherPages', {
                                screen: "Barcode"
                            })}
                            style={[styles.buttonBarcode, {
                                backgroundColor: "#fff",
                                borderColor: "#7c9d32",
                                borderWidth: 2,
                                width: 50,
                                height: 50,
                            }]}
                        >
                            <AntDesign name="plus" size={24} color="#7c9d32"/>
                        </Button>
                    </View>
                    <View style={{justifyContent: "flex-end", marginLeft: "auto", marginRight: 10, marginVertical: 15}}>
                        <Button
                            onPress={() =>
                                this.state.checks != null ? this.props.navigation.navigate('OtherPages', {
                                    screen: "PayPre",
                                    params: {
                                        summary: 50
                                    }
                                }) : alert('Please Fill')}
                            style={[styles.buttonBarcode, {
                                backgroundColor: "#fff",
                                borderColor: "#7c9d32",
                                borderWidth: 2,
                                width: 50,
                                height: 50,
                            }]}
                        >
                            <AntDesign name="check" size={24} color="#7c9d32"/>
                        </Button>
                    </View>
                </View>
            </List>
        )
    }

    renderFullList() {
        return (
            <List style={styles.w100}>
                <View>
                    <View style={{flex: 1, justifyContent: "flex-end", marginLeft: "auto"}}>
                        <Button
                            onPress={() => this.props.navigation.navigate('OtherPages', {
                                screen: "Barcode"
                            })}
                            style={[styles.buttonBarcode, {
                                backgroundColor: "#fff",
                                borderColor: "#7c9d32",
                                borderWidth: 2,
                                width: 50,
                                height: 50,
                            }]}
                        >
                            <AntDesign name="plus" size={24} color="#7c9d32"/>
                        </Button>
                    </View>
                </View>
                <FlatList
                    data={this.state.onCheck}
                    renderItem={this.renderElements}
                    keyExtractor={(index) => index}
                    refreshing={this.state.refresh}
                    onRefresh={this.handleRefresh()}
                />
            </List>
        )
    }

    renderElements() {
        function deleteItem(index) {
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
                        onPress: () => deleteYes(index),
                        style: 'destructive',
                    },
                ],
                {cancelable: true}
            );
        }

        function deleteYes(index) {
            var user = firebase.auth().currentUser;
            firebase
                .database()
                .ref('users/' + user.uid + '/checks/' + index)
                .remove()
                .then(
                    () => {
                        alert(t('deleted'))
                        that.handleRefresh();
                    },
                    (err) => {
                        alert(err.message);
                    }
                );
        }

        return (
            <ListItem thumbnail key={index} style={styles.listItem}>
                <Left>
                    <AntDesign name="shoppingcart" size={25} color="#7c9d32"/>
                </Left>
                <Body>
                    <View style={styles.listNameCount}>
                        <Text style={styles.listTitle}>{element.title}</Text>
                        <Text style={styles.listSubtitle}>
                            {element.qyt} {t('qty')}
                        </Text>
                    </View>
                    <Text note numberOfLines={1}>
                        {element.price} Azn
                    </Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => deleteItem(element.id)}>
                        <Feather name="trash-2" size={24} color="#BF360C"/>
                    </Button>
                </Right>
            </ListItem>
        );
    }

    render() {
        return (
            <View style={{backgroundColor: "#fff", height: height}}>
                {this.renderStateList()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textmargin: {
        marginBottom: 0,
        maxHeight: 120,
        minHeight: 80,
        textAlign: 'center',
        marginHorizontal: 0,
        paddingTop: 1
    },
    btn: {
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginHorizontal: 30,
    },
    btnText: {
        color: '#7c9d32',
        fontSize: 17,
        padding: 5,
    },
    subtitle: {
        fontSize: 18,
        color: '#6d7587',
        fontWeight: 'bold',
        textAlign: "center"
    },
    w100: {
        width: width,
        margin: 0,
        padding: 0,
    },
    seperatorText: {
        fontSize: 15,
        color: '#7c9d32',
        marginTop: 0,
        marginBottom: 0,
        fontWeight: "bold"
    },
    listItem: {
        margin: 0,
        padding: 0,
        width: width - 15,
        height: 65,
    },
    listNameCount: {
        width: width,
        height: 20,
        flexDirection: 'row',
    },
    listTitle: {
        paddingLeft: 0,
        marginLeft: 0,
        textAlign: 'left',
        fontSize: 16,
        color: '#6d7587',
    },
    listSubtitle: {
        fontSize: 13,
        color: '#6d7587',
    },
    nullObject: {
        color: '#D50000',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        marginTop: 5,
        fontWeight: 'bold',
    },
    listHeader: {
        flexDirection: "row",
        width: width - 10,
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center"
    },
    buttonBarcode: {
        borderRadius: 40,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        shadowColor: "#7c9d32",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.38,
        shadowRadius: 9.2,
        elevation: 8,
    }
});