import React from 'react'
import {View, Text, StyleSheet, Dimensions, ScrollView, FlatList} from 'react-native';
import {Header, Left, Body, Button, Content, Badge} from 'native-base';

const {width, height} = Dimensions.get('window');
import {QRCode as CustomQRCode} from 'react-native-custom-qr-codes-expo';
import {StatusBar} from "expo-status-bar";
import firebase from "../../../../Functions/FireBase/firebaseConfig";
import {AntDesign} from "@expo/vector-icons";
import {t} from "../../../../Lang";

export default class OneCheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [
                {name: "Uzum", qyt: 2, price: 0.45, sum: 0.90},
                {name: "DisCopu", qyt: 3, price: 0.30, sum: 0.90},
                {name: "Pisiy mamasi", qyt: 1, price: 0.45, sum: 0.45},
                {name: "Qutab", qyt: 50, price: 0.50, sum: 25},
            ],
            edvStat: "not"
        }
    }

    getInfo() {
        const params = this.props.route.params;
        var checkid = params.checkid;
        this.setState({checkid})
        let user = firebase.auth().currentUser;
        if (user) {
            var check = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/checks/' + this.state.checkid)
                .on('value', (data) => {
                    if (data.numChildren() > 0 && data != null) {
                        data.forEach((data) => {
                            check.push(data.val());
                        });
                    }
                });
            this.setState({check})
            var products = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/checks/' + this.state.checkid + '/products')
                .on('value', (data) => {
                    if (data.numChildren() > 0 && data != null) {
                        data.forEach((data) => {
                            products.push(data.val());
                        });
                    }
                });
            this.setState({products})
        }
        this.renderContent()
    }

    renderViews() {
        return (
            <View style={[styles.bgTransparent, styles.center]}>
                <View style={[styles.bgTransparent, styles.center]}>
                    {this.renderHeader()}
                </View>
                <View style={[styles.bgTransparent, styles.center]}>
                    {this.renderContent()}
                </View>
                <View style={[styles.bgTransparent, styles.center]}>
                    {this.renderFooter()}
                </View>
            </View>
        )
    }

    renderHeader() {
        return (
            <View style={[styles.bgTransparent, styles.center]}>
                <View style={styles.headerTop}>
                    <View style={[styles.center, {
                        flexDirection: "row",
                        marginVertical: 4,
                        width: "100%",
                        paddingHorizontal: 10
                    }]}>
                        <MyText children={t('checkScreen.tsAd')} style={{fontWeight: "700", fontSize: 16}}/>
                        <MyText children=" : Araz"
                                style={{fontWeight: "700", fontSize: 16}}/>
                    </View>
                    <View style={{flexDirection: "row", marginVertical: 4, width: "100%", paddingHorizontal: 10}}>
                        <MyText
                            children={t('checkScreen.tsAddress') + " : AZ5001 Sumqayıt şəhəri Koroğlu Prospekti ev 2. Bina Ünvanı m. 41 A Məhəllə"}/>
                    </View>
                    <View style={{marginVertical: 10}}/>
                    <View style={{flexDirection: "row", marginVertical: 4, width: "100%", paddingHorizontal: 10}}>
                        <MyText
                            children={t('checkScreen.voad') + " : \"Oba Retail Chain\" Məhdud məsuliyyətli Cəmiyyəti  "}/>
                    </View>
                    <View style={{flexDirection: "row", marginVertical: 4, width: "100%", paddingHorizontal: 10}}>
                        <MyText
                            children={t('checkScreen.voen') + " 29954654654654"}/>
                    </View>
                    <View style={{flexDirection: "row", marginVertical: 4, width: "100%", paddingHorizontal: 10}}>
                        <MyText
                            children={t('checkScreen.objectCode') + " 29954654654654-2907"}/>
                    </View>
                    <View style={{marginVertical: 10}}/>
                </View>
                <View style={styles.headerCenter}>
                    <View style={[styles.center, {
                        flexDirection: "row",
                        marginVertical: 4,
                        width: "100%",
                        paddingHorizontal: 10
                    }]}>
                        <MyText children={t('checkScreen.selCheck')} style={{fontWeight: "700", fontSize: 15}}/>
                        <MyText children=" : 105565465"
                                style={{fontWeight: "700", fontSize: 15}}/>
                    </View>
                </View>
                <View style={[styles.headerFooter]}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 4,
                        width: "100%",
                        paddingHorizontal: 10
                    }}>
                        <MyText children={t('checkScreen.kassir') + ":"}/>
                        <MyText children="Orxan Cabbarov"
                        />
                    </View>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: 4,
                        width: "100%",
                        paddingHorizontal: 9
                    }}>
                        <View style={{flexDirection: "row"}}>
                            <MyText children={t('checkScreen.tarix') + ": "}
                            />
                            <MyText children="14.02.2020"
                            />
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <MyText children={t('checkScreen.saat') + ": "}
                            />
                            <MyText children="14:15:30"
                            />
                        </View>
                    </View>
                </View>
                <Seperator/>
            </View>
        )
    }

    renderContent() {
        return (
            <View style={[styles.bgTransparent, styles.center]}>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <MyText style={styles.tableBigArena} children={t('checkScreen.productName')}/>
                        <MyText children={t('checkScreen.productQyt')}/>
                        <MyText children={t('checkScreen.productPrice')}/>
                        <MyText children={t('checkScreen.productSum')}/>
                    </View>
                    <View style={styles.tableContent}>
                        <FlatList data={this.state.products} renderItem={this.renderProducts}
                                  keyExtractor={(item, index) => index.toString()} focusable={true}/>
                    </View>
                    <Seperator type="table"/>
                    <View style={styles.tableFooter}>
                        <View style={styles.tableFooterElements}>
                            <MyText children={t('checkScreen.productSum')} style={{fontSize: 16, fontWeight: "bold"}}/>
                            <MyText children="15" style={{fontSize: 16, fontWeight: "bold"}}/>
                        </View>
                        <View style={styles.tableFooterElements}>
                            <MyText children={t('checkScreen.edv18')}/>
                            <MyText children="0.23"/>
                        </View>
                        <View style={styles.tableFooterElements}>
                            <MyText children={t('checkScreen.sumVergi')}/>
                            <MyText children="0.23"/>
                        </View>
                        <View style={{marginVertical: 5}}/>
                        <Seperator/>
                        <View style={{marginVertical: 10}}/>
                    </View>
                    <View style={styles.tableFooter}>
                        <View style={styles.tableFooterElements}>
                            <MyText children={t('checkScreen.nagdsiz')}/>
                            <MyText children="15"/>
                        </View>
                        <View style={styles.tableFooterElements}>
                            <MyText children={t('checkScreen.bonus')}/>
                            <MyText children="0.00"/>
                        </View>
                        <View style={{marginVertical: 5}}/>
                        <Seperator/>
                        <View style={{marginVertical: 10}}/>
                    </View>
                    <View style={styles.tableFooter}>
                        <View style={styles.tableFooterElements}>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}}
                                    children={t('checkScreen.gunerzindevurulmuscekler')}/>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}} children={20}/>
                        </View>
                        <View style={styles.tableFooterElements}>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}}
                                    children={t('checkScreen.kassaninmodeli')}/>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}} children="Az Smart Ficsal Box"/>
                        </View>
                        <View style={styles.tableFooterElements}>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}}
                                    children={t('checkScreen.kassaAparatınınZavodNomresi')}/>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}} children={152055651561}/>
                        </View>
                        <View style={styles.tableFooterElements}>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}} children={t('checkScreen.ficsalId')}/>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}} children={5161616}/>
                        </View>
                        <View style={styles.tableFooterElements}>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}}
                                    children={t('checkScreen.nmqQeydNomresi')}/>
                            <MyText style={{maxWidth: "50%", minWidth: "10%"}} children={516891899}/>
                        </View>
                        <View style={{marginVertical: 5}}/>
                        <Seperator/>
                        <View style={{marginVertical: 10}}/>
                    </View>
                </View>
            </View>
        )
    }

    renderProducts({item, index}) {
        return (
            <View key={index} style={{width: "100%", flexDirection: "row", justifyContent: "space-between"}}>
                <MyText style={styles.tableBigArena} children={item.name}/>
                <MyText children={item.qyt}/>
                <MyText children={item.price}/>
                <MyText children={item.sum}/>
            </View>
        )
    }

    renderFooter() {
        return (
            <View style={[styles.bgTransparent, styles.center]}>
                <QrCode val={"https://www.facebook.com"}/>
                <View
                    style={[styles.center, {
                        height: 50,
                        width: width,
                        backgroundColor: "#7c9d32",
                        marginVertical: 15,
                        marginTop: 25
                    }]}>
                    <MyText children="Pay And Win" style={{color: "#fff", fontWeight: "bold", fontSize: 15}}/>
                </View>
                <MyText children={t('checkScreen.edvTitle')} style={{fontSize: 20, fontWeight: "bold"}}/>
                <Seperator/>
                <View style={{marginBottom: 20, width: width}}>
                    {this.edvGeriQaytar()}
                </View>
            </View>
        )
    }

    edvGeriQaytar() {
        if (this.state.edvStat == "not") {
            return (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
                    alignItems: "center",
                    alignContent: "center"
                }}>
                    <MyText style={{fontSize: 18, fontWeight: "bold", paddingLeft: 10}}
                            children={t('checkScreen.edvStatNot')}/>
                    <Button info focusable={true}
                            style={[styles.center, {width: 30, height: 30, borderRadius: 15}]}>
                        <AntDesign name="plus"
                                   color="#fff"
                                   size={24}/>
                    </Button>
                </View>
            )
        } else if (this.state.edvStat == "pending") {
            return (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
                    alignItems: "center",
                    alignContent: "center"
                }}>
                    <MyText style={{fontSize: 18, fontWeight: "bold", paddingLeft: 5}}
                            children={t('checkScreen.edvStatPending')}/>
                    <Button warning focusable={true}
                            style={[styles.center, {width: 30, height: 30, borderRadius: 15}]}><View
                        style={[styles.center, {
                            width: 5,
                            height: 5,
                            borderRadius: 2,
                            backgroundColor: "#fff"
                        }]}/></Button>
                </View>
            )
        } else if (this.state.edvStat == "success") {
            return (
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "90%",
                    alignItems: "center",
                    alignContent: "center"
                }}>
                    <MyText style={{fontSize: 18, fontWeight: "bold", paddingLeft: 5}}
                            children={t('checkScreen.edvStatSuccess')}/>
                    <Button success focusable={true}
                            style={[styles.center, {width: 30, height: 30, borderRadius: 15}]}><View
                        style={[styles.center, {
                            width: 5,
                            height: 5,
                            borderRadius: 2,
                            backgroundColor: "#fff"
                        }]}/></Button>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar style="dark" animated={true} backgroundColor="#fff"/>
                <Header style={[styles.bgTransparent, styles.header, styles.center]}>
                    <StatusBar style="dark" animated={true} backgroundColor="#fff"/>
                    <Left style={styles.bgTransparent}>
                        <StatusBar style="dark" animated={true} backgroundColor="#fff"/>
                        <Button transparent large onPress={() => this.props.navigation.goBack()}>
                            <AntDesign name="back" size={24} color="#7c9d32"/>
                        </Button>
                    </Left>
                    <Body style={styles.bgTransparent}>
                        <StatusBar style="dark" animated={true} backgroundColor="#fff"/>
                        <Text style={styles.headerBodyText}>20.12.2012</Text>
                    </Body>
                </Header>
                <Content>
                    <View style={[styles.content, styles.center, styles.bgTransparent]}>
                        <ScrollView style={styles.bgTransparent}>
                            {this.renderViews()}
                        </ScrollView>
                    </View>
                </Content>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: "#fff",
    },
    center: {
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
    },
    bgTransparent: {
        backgroundColor: "transparent",
    },
    header: {
        height: width / 5,
    },
    headerTop: {
        width: width - 50
    },
    headerCenter: {
        marginVertical: 10
    },
    headerBodyText: {
        color: "#7c9d32",
        fontSize: 20,
        fontWeight: "700"
    },
    headerFooter: {
        width: width - 20
    },
    content: {
        width: width,
        height: "100%",
        marginBottom: height / 10
    },
    table: {
        width: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    tableHeader: {
        borderColor: "#000",
        borderWidth: 0,
        width: "90%",
        borderBottomWidth: 4,
        flexDirection: "row",
        paddingHorizontal: 2,
        justifyContent: "space-between"
    },
    tableBigArena: {
        width: "45%"
    },
    tableContent: {
        width: "85%",
        paddingHorizontal: 2,
        flexDirection: "column",
    },
    tableFooter: {
        width: "90%",
        paddingHorizontal: 2,
        flexDirection: "column",
    },
    tableFooterElements: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15
    }
})


function MyText(props) {
    return (
        <Text style={[{
            fontSize: 15,
            color: "rgba(0,0,0,.8)",
            textAlign: "center"
        }, props.style ? props.style : null]}>{props.children}</Text>
    )
}

function Seperator(props) {
    let widthLength = width / 7.25

    function getSymbol(type) {
        var symbols = []
        if (type === "table") {
            for (var i = 0; i < widthLength + width / 48; i++) {
                symbols.push("-")
            }
        } else {
            for (var i = 0; i < widthLength; i++) {
                symbols.push("*")
            }
        }
        return <Text style={{color: "#000", fontSize: 12, fontWeight: "bold"}}>{symbols}</Text>
    }

    return (
        <View style={{width: width, marginVertical: 15}}>
            {getSymbol(props.type)}
        </View>
    )
}

function QrCode(props) {
    return (
        <CustomQRCode
            content={props.val}
            size={width / 1.25}
            color="#000"
            codeStyle="square"
            innerEyeStyle="square"
            outerEyeStyle="square"
        />
    );
}