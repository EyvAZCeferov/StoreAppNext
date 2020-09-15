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
            refresh: true,
            checkid: this.props.checkid,
        }
    }

    getInfo() {
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/checks/' + this.props.checkid)
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({checks: datas, refresh: false});
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
        if (this.state.checks != null) {
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
                                screen: "Barcode",
                                params: {
                                    uid: this.state.checkid
                                }
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
            </List>
        )
    }

    renderFullList() {
        return (
            <List style={styles.w100}>
                <View style={{backgroundColor: "transparent", position: 'absolute', right: 30, top: 0, zIndex: 15}}>
                    <View style={{justifyContent: "flex-end", marginLeft: "auto", marginRight: 15, marginVertical: 2}}>
                        <Button
                            onPress={() => this.props.navigation.navigate('OtherPages', {
                                screen: "Barcode",
                                params: {
                                    uid: this.state.checkid
                                }
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
                <FlatList
                    data={this.state.checks}
                    renderItem={this.renderItems.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    refreshing={this.state.refresh}
                    onRefresh={this.handleRefresh}
                />
            </List>
        )
    }

    renderItems({item, index}) {
        var that = this;

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
                .ref('users/' + user.uid + '/checks/' + that.state.checkid + '/' + index)
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
                        <Text style={styles.listTitle}>{item.name}</Text>
                        <Text style={styles.listSubtitle}>
                            &nbsp;&nbsp;&nbsp;&nbsp; {t('qty')} - {item.qty ? item.qty : 1}
                        </Text>
                    </View>
                    <Text note numberOfLines={1}>
                        {item.price} Azn
                    </Text>
                </Body>
                <Right>
                    <Button transparent onPress={() => deleteItem(item.barcode)}>
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