import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
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
    Picker
} from 'native-base';
import ScreensStandart from '../Component/ScreensStandart';
import {AntDesign, Entypo, Feather, MaterialIcons} from '@expo/vector-icons';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
import {t} from '../../../../Lang';
import firebase from '../../../../Functions/FireBase/firebaseConfig';
import {StatusBar} from "expo-status-bar";

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
        if (this.state.history !== null) {
            return this.state.history.map((element,index) => {
                return (
                    <ListItem style={styles.firstList} thumbnail key={index}>
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
        const thisDay=new Date();
        const minDateCount=thisDay.getTime()-2592000;
        const minDate = new Date(minDateCount * 100);
        return (
            <View style={styles.f1}>
                <StatusBar style="dark" backgroundColor="white"/>
                <ScreensStandart {...this.props} name={t('history')}/>
                <Container>
                    <StatusBar style="dark" backgroundColor="white"/>
                    <View style={[styles.f1,{height:height,flexDirection:"column",justifyContent:"space-between",alignContent:"center",alignItems:"center"}]}>
                        <View style={{height:height/8,flexDirection:"column",justifyContent:"space-around",alignContent:"center",alignItems:"center"}}>
                            <View style={styles.contentHeader}>
                                <View style={styles.contentHeaderColumn}>
                                    <MaterialIcons name="date-range" size={24} color="#7c9d32"/>
                                    <DatePicker
                                        androidMode="calendar"
                                        defaultDate={thisDay}
                                        locale='az'
                                        maximumDate={thisDay}
                                        minimumDate={minDate}
                                        placeHolderText={t('historyStartSelect')}
                                        placeHolderTextStyle={{color: "#7c9d32"}}
                                        textStyle={{color: "#7c9d32", fontSize: 20}}
                                        animationType="slide"
                                        modalTransparent={true}
                                    />
                                </View>
                                <View style={styles.contentHeaderColumn}>
                                    <MaterialIcons name="date-range" size={24} color="#7c9d32"/>
                                    <DatePicker
                                        androidMode="calendar"
                                        defaultDate={thisDay}
                                        locale='az'
                                        maximumDate={thisDay}
                                        placeHolderText={t('historyEndSelect')}
                                        placeHolderTextStyle={{color: "#7c9d32"}}
                                        textStyle={{color: "#7c9d32", fontSize: 20}}
                                        animationType="slide"
                                        modalTransparent={true}
                                    />
                                </View>
                            </View>
                            <View style={styles.contentHeader}>
                                <View style={styles.contentHeaderColumn}>
                                    <Picker
                                        mode="dropdown"
                                        placeholder={t('language')}
                                        placeholderStyle={{color: '#7c9d32'}}
                                        placeholderIconColor="#7c9d32"
                                        style={{
                                            color: '#7c9d32',
                                            width: 150,
                                        }}
                                        selectedValue={this.state.selected}
                                        onValueChange={(val) => this.onValueChange(val)}>
                                        <Picker.Item
                                            label="    Mağaza adı"
                                            color="#7c9d32"
                                            icon={
                                                <Feather name="check-circle" size={24} color="black"/>
                                            }
                                            value="az"
                                        />
                                    </Picker>
                                </View>
                                <View style={[styles.contentHeaderColumn,{backgroundColor:"transparent",marginHorizontal:"auto"}]}>
                                    <TouchableOpacity onPress={()=>alert('Pressed')}>
                                        <MaterialIcons name="search" size={24} color="#7c9d32"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{height: height-height/8, width: width}}>
                            <ScrollView>
                                <List style={styles.w100}>
                                    {this.renderList(this.props.navigation)}
                                </List>
                            </ScrollView>
                        </View>
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
});
