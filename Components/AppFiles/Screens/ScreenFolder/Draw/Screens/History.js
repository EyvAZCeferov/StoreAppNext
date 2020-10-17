import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
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
    DatePicker,
    Picker, Header
} from 'native-base';
import ScreensStandart from '../Component/ScreensStandart';
import {AntDesign, Feather, FontAwesome, MaterialIcons} from '@expo/vector-icons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {t} from '../../../../Lang';
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {StatusBar} from "expo-status-bar";
import {Poppins_400Regular, useFonts} from "@expo-google-fonts/poppins";
import DropdownAlert from "react-native-dropdownalert";

let allPrice = 0

function MyText(props) {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });
    if (!fontsLoaded) {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    } else {
        return (
            <Text style={[{
                fontSize: props.fontSize ? props.textColor : 18,
                color: props.textColor ? props.textColor : "rgba(0,0,0,.8)",
                fontFamily: "Poppins_400Regular"
            }, props.style ? props.style : null]}>{props.children}</Text>
        )
    }
}

export default class History extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checks: null,
            allMarkets: [
                {name: "Araz", id: 1},
                {name: "Bazar Store", id: 2},
                {name: "Bravo", id: 3}
            ],
            firstDate: null,
            lastDate: null,
            selectedMarket: null,
            refresh: true,
            disableFirst: false,
            disableLast: false,
            disableMarket: false
        };
    }

    getInfo(marketName = null, firstDate = null, lastDate) {
        firebase.database().goOnline();
        var user = firebase.auth().currentUser;
        if (user) {
            var checks = [];
            var checkCount = 0
            if (marketName != null && firstDate == null && lastDate == null) {
                firebase
                    .database()
                    .ref('users/' + user.uid + '/checks').orderByChild('market').equalTo(marketName)
                    .limitToFirst(50)
                    .on('value', (data) => {
                        data.forEach((data) => {
                            checks.push(data.val());
                        });
                        checkCount = data.numChildren()
                        if (checkCount > 0) {
                            this.setState({
                                checks,
                            });
                        } else {
                            this.setState({
                                checks: null
                            });
                        }
                    });
            } else if (marketName == null && firstDate != null && lastDate != null) {
                firebase
                    .database()
                    .ref('users/' + user.uid + '/checks').orderByChild('date').startAt(firstDate).endAt(lastDate)
                    .limitToFirst(50)
                    .on('value', (data) => {
                        data.forEach((data) => {
                            checks.push(data.val());
                        });
                        checkCount = data.numChildren()
                        if (checkCount > 0) {
                            this.setState({
                                checks,
                            });
                        } else {
                            this.setState({
                                checks: null
                            });
                        }
                    });
            } else if (marketName == null && firstDate != null && lastDate == null) {
                firebase
                    .database()
                    .ref('users/' + user.uid + '/checks').orderByChild('date').startAt(firstDate).endAt(Date.now())
                    .limitToFirst(50)
                    .on('value', (data) => {
                        data.forEach((data) => {
                            checks.push(data.val());
                        });
                        checkCount = data.numChildren()
                        if (checkCount > 0) {
                            this.setState({
                                checks,
                            });
                        } else {
                            this.setState({
                                checks: null
                            });
                        }
                    });
            } else {
                firebase
                    .database()
                    .ref('users/' + user.uid + '/checks')
                    .on('value', (data) => {
                        data.forEach((data) => {
                            checks.push(data.val());
                        });
                        checkCount = data.numChildren()
                        if (checkCount > 0) {
                            this.setState({
                                checks,
                            });
                        } else {
                            this.setState({
                                checks: null
                            });
                        }
                    });
            }
            this.setState({refresh: false})
            this.renderContentArena()
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    componentWillUnmount() {
        firebase.database().goOffline()
    }

    search() {
        this.dropDownAlertRef.alertWithType('success', t('deleted'))
        this.setState({refresh: true})
        if (this.state.selectedMarket != null && this.state.firstDate == null && this.state.lastDate == null) {
            this.getInfo(this.state.selectedMarket)
        } else if (this.state.selectedMarket == null && this.state.firstDate != null && this.state.lastDate != null) {
            var firstDate = new Date(this.state.firstDate).getTime() / 1000
            var lastDate = new Date(this.state.lastDate).getTime() / 1000
            this.getInfo(null, firstDate, lastDate)
        } else if (this.state.selectedMarket == null && this.state.firstDate != null && this.state.lastDate == null) {
            var firstDate = new Date(this.state.firstDate).getTime() / 1000
            this.getInfo(null, firstDate, null)
        } else if (this.state.selectedMarket != null && this.state.firstDate != null && this.state.lastDate != null) {
            var firstDate = new Date(this.state.firstDate).getTime() / 1000
            var lastDate = new Date(this.state.lastDate).getTime() / 1000
            this.getInfo(this.state.selectedMarket, firstDate, lastDate)
        } else {
            this.getInfo(null, null, null)
        }
    }

    valChang(val, type) {
        if (type == 'market') {
            this.setState({disableFirst: !this.state.disableFirst})
            this.setState({disableLast: !this.state.disableLast})
            this.setState({selectedMarket: val})
        } else {
            this.setState({disableMarket: !this.state.disableMarket})
            if (type == 'first') {
                this.setState({firstDate: val})
            } else if (type == 'last') {
                this.setState({lastDate: val})
            }
        }
        this.search()
    }

    renderList(props) {

        function marketTypeFunc(item) {
            switch (item.market) {
                case "Bazar Store":
                    return <FontAwesome name="cc-visa" size={30} color="#7c9d32"/>
                    break;
                case "Araz":
                    return <FontAwesome name="cc-mastercard" size={30} color="#7c9d32"/>
                    break;
                default:
                    return <FontAwesome name="credit-card" size={30} color="#7c9d32"/>
            }
        }

        function convertStampDate(unixtimestamp) {

            var months_arr = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'İyun', 'İyul', 'Avqust', 'Sentyabr', 'Oktyabr', 'Noyabr', 'Dekabr'];

            var date = new Date(unixtimestamp * 1000);

            var year = date.getFullYear();

            var month = months_arr[date.getMonth()];

            var day = date.getDate();

            var hours = date.getHours();

            var minutes = "0" + date.getMinutes();

            var seconds = "0" + date.getSeconds();

            var fulldate = day + ' ' + month + ' ' + 2020 + ' ' + hours + ':' + minutes.substr(-2);

            return fulldate;
        }

        function priceCollector(id) {
            var user = firebase.auth().currentUser;
            if (user) {
                var datas = [];
                firebase
                    .database()
                    .ref('users/' + user.uid + '/checks/' + id + '/products')
                    .on('value', (data) => {
                        if (data.numChildren() > 0 && data != null) {
                            data.forEach((data) => {
                                datas.push(data.val());
                            });
                        }
                    });
                return datas
            }
        }

        function sumPrice(checkId) {
            if (checkId != null) {
                allPrice = 0
                var checkProducts = priceCollector(checkId)
                checkProducts.map(element => {
                    allPrice = allPrice + parseFloat(element.price)
                })
            }
            return parseFloat(allPrice)
        }

        if (this.state.checks !== null) {
            return this.state.checks.map((element, index) => {
                return (
                    <ListItem style={styles.firstList} thumbnail key={index}>
                        <Left>
                            {marketTypeFunc(element)}
                        </Left>
                        <Body>
                            <MyText style={styles.listtitle} children={element.market}/>
                            <View style={{
                                width: "80%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                alignContent: "center"
                            }}>
                                <MyText style={{fontSize: 14}} children={sumPrice(element.id) + " AZN "}
                                />
                                <MyText style={{fontSize: 14}} children={convertStampDate(element.date)}
                                />
                            </View>
                        </Body>
                        <Right>
                            <Button
                                transparent
                                onPress={() =>
                                    props.navigate('OneCheck', {
                                        checkid: element.id,
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

    renderContentArena() {
        if (this.state.refresh) {
            return (
                <View style={{
                    flex: 3,
                    alignContent: "center",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <ActivityIndicator size="large" color="#7c9d32"/>
                </View>
            )
        } else {
            if (this.state.checks != null) {
                return (
                    <View style={{height: height - height / 8, width: width}}>
                        <ScrollView>
                            <List style={styles.w100}>
                                {this.renderList(this.props.navigation)}
                            </List>
                        </ScrollView>
                    </View>
                )
            } else {
                return (
                    <View style={{
                        flex: 3,
                        alignContent: "center",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <MyText children={t('noResult')} style={styles.nullObject}/>
                    </View>
                )
            }
        }
    }

    renderMarkets() {
        if (this.state.allMarkets != null) {
            return this.state.allMarkets.map(market => {
                return (
                    <Picker.Item
                        label={market.name}
                        value={market.name}
                        color="#7c9d32"/>
                )
            })
        }
    }

    render() {
        return (
            <View style={styles.f1}>
                <StatusBar backgroundColor="#fff" style="dark"/>
                <ScreensStandart {...this.props} name={t('history')}/>
                <DropdownAlert
                    ref={ref => this.dropDownAlertRef = ref}
                    useNativeDriver={true}
                    closeInterval={1000}
                    zIndex={5000}
                    updateStatusBar={true}
                    tapToCloseEnabled={true}
                    showCancel={true}
                    elevation={10}
                    isInteraction={true}/>
                <Container>
                    <DropdownAlert
                        ref={ref => this.dropDownAlertRef = ref}
                        useNativeDriver={true}
                        closeInterval={1000}
                        zIndex={5000}
                        updateStatusBar={true}
                        tapToCloseEnabled={true}
                        showCancel={true}
                        elevation={10}
                        isInteraction={true}/>
                    <StatusBar backgroundColor="#fff" style="dark"/>
                    <View style={[styles.f1, {
                        height: height,
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center"
                    }]}>
                        <View style={{
                            height: height / 8,
                            flexDirection: "column",
                            justifyContent: "space-around",
                            alignContent: "center",
                            alignItems: "center"
                        }}>
                            <View style={styles.contentHeader}>
                                <View style={styles.contentHeaderColumn}>
                                    <MaterialIcons name="date-range" size={24} color="#7c9d32"/>
                                    <DatePicker
                                        androidMode="calendar"
                                        locale='az'
                                        placeHolderText={t('historyStartSelect')}
                                        placeHolderTextStyle={{color: "#7c9d32"}}
                                        textStyle={{color: "#7c9d32", fontSize: 20}}
                                        animationType="slide"
                                        modalTransparent={true}
                                        onDateChange={(firstDate) => this.valChang(firstDate, 'first')}
                                    />
                                </View>
                                <View style={styles.contentHeaderColumn}>
                                    <MaterialIcons name="date-range" size={24} color="#7c9d32"/>
                                    <DatePicker
                                        androidMode="calendar"
                                        locale='az'
                                        placeHolderText={t('historyEndSelect')}
                                        placeHolderTextStyle={{color: "#7c9d32"}}
                                        textStyle={{color: "#7c9d32", fontSize: 20}}
                                        animationType="slide"
                                        modalTransparent={true}
                                        onDateChange={(lastDate) => this.valChang(lastDate, 'last')}
                                    />
                                </View>
                            </View>
                            <View style={styles.contentHeader}>
                                <View style={styles.contentHeaderColumn}>
                                    <Picker
                                        mode="dialog"
                                        placeholderStyle={{color: '#7c9d32'}}
                                        style={{
                                            color: '#7c9d32',
                                            width: 150,
                                        }}
                                        selectedValue={this.state.selectedMarket}
                                        onValueChange={(selectedMarket) => this.valChang(selectedMarket, 'market')}>
                                        <Picker.Item
                                            label="Mağaza adı"
                                            color="#7c9d32"
                                            icon={
                                                <Feather name="check-circle" size={24} color="black"/>
                                            }
                                            value={null}
                                        />
                                        {this.renderMarkets()}
                                    </Picker>
                                </View>
                                <View style={[styles.contentHeaderColumn, {
                                    backgroundColor: "transparent",
                                    marginHorizontal: "auto"
                                }]}>
                                    <TouchableOpacity onPress={() => this.search()}>
                                        <MaterialIcons name="search" size={24} color="#7c9d32"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {this.renderContentArena()}
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
        backgroundColor: "#fff",
    },
    contentHeader: {
        width: width,
        height: '35%',
        backgroundColor: "transparent",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
    },
    contentHeaderColumn: {
        backgroundColor: "transparent",
        paddingHorizontal: 15,
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center"
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
    nullObject: {
        color: '#D50000',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
