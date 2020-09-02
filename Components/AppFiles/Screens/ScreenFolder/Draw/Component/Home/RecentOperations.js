import React from 'react';
import {View, Text, Dimensions, StyleSheet, Animated, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native'
import SlidingUpPanel from 'rn-sliding-up-panel';
import {Body, Button, Left, ListItem, Right, Thumbnail} from "native-base";
import {t} from "../../../../../Lang";

const {width, height} = Dimensions.get('window');
export default function RecentOperations() {
    const nav = useNavigation();
    const [oper, setOper] = React.useState([
        {
            title: 'Bazar Store Sumqayıt',
            image:
                'https://fastly.4sqi.net/img/general/600x600/65966059_Xy1TnhFk6UxmK1j9XimnjpqtbF95e3jPjoiTyO1lxms.jpg',
            datetime: '24.07.2020',
            price: '50',
            ficsalId: '7C5d2AAA546',
        },
        {
            title: 'Bravo Store Sumqayıt 2',
            image:
                'https://fastly.4sqi.net/img/general/600x600/65966059_Xy1TnhFk6UxmK1j9XimnjpqtbF95e3jPjoiTyO1lxms.jpg',
            datetime: '24.07.2021',
            price: '30',
            ficsalId: '7C5d2AAA546',
        },
        {
            title: 'Bazar Store Sumqayıt 3',
            image:
                'https://fastly.4sqi.net/img/general/600x600/65966059_Xy1TnhFk6UxmK1j9XimnjpqtbF95e3jPjoiTyO1lxms.jpg',
            datetime: '24.07.2022',
            price: '40',
            ficsalId: '7C5d2AAA546',
        },
        {
            title: 'Bravo Store Baki 3',
            image:
                'https://fastly.4sqi.net/img/general/600x600/65966059_Xy1TnhFk6UxmK1j9XimnjpqtbF95e3jPjoiTyO1lxms.jpg',
            datetime: '24.07.2022',
            price: '40',
            ficsalId: '7C5d2AAA546',
        },
        {
            title: 'Bravo Store Sumqayıt 3',
            image:
                'https://fastly.4sqi.net/img/general/600x600/65966059_Xy1TnhFk6UxmK1j9XimnjpqtbF95e3jPjoiTyO1lxms.jpg',
            datetime: '24.07.2022',
            price: '40',
            ficsalId: '7C5d2AAA546',
        },
        {
            title: 'Araz Store Sumqayıt 3',
            image:
                'https://fastly.4sqi.net/img/general/600x600/65966059_Xy1TnhFk6UxmK1j9XimnjpqtbF95e3jPjoiTyO1lxms.jpg',
            datetime: '24.07.2022',
            price: '40',
            ficsalId: '7C5d2AAA546',
        },
        {
            title: 'Bazar Store Baki 3',
            image:
                'https://fastly.4sqi.net/img/general/600x600/65966059_Xy1TnhFk6UxmK1j9XimnjpqtbF95e3jPjoiTyO1lxms.jpg',
            datetime: '24.07.2022',
            price: '40',
            ficsalId: '7C5d2AAA546',
        },
        {
            title: 'Bazar Store Baki 3',
            image:
                'https://fastly.4sqi.net/img/general/600x600/65966059_Xy1TnhFk6UxmK1j9XimnjpqtbF95e3jPjoiTyO1lxms.jpg',
            datetime: '24.07.2022',
            price: '40',
            ficsalId: '7C5d2AAA546',
        },
    ]);
    const [dragableRang, setDragableRang] = React.useState({
        top: height - 80,
        bottom: 155
    })
    const _draggedValue = new Animated.Value(180);
    const ModalRef = React.useRef(null);

    function renderItem3() {
        if (oper != null) {
            return oper.map((item) => {
                return (
                    <ListItem
                        thumbnail
                        onPress={() =>
                            nav.navigate("OtherPages", {
                                screen: 'OneCheck',
                                params: {
                                    ficsalId: item.ficsalId,
                                    title: item.title,
                                }
                            })
                        }>
                        <Left>
                            <Thumbnail
                                square
                                source={{
                                    uri: item.image,
                                }}
                                rounded
                            />
                        </Left>
                        <Body>
                            <Text>{item.title}</Text>
                            <Text note numberOfLines={1}>
                                {item.datetime}
                            </Text>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Text>{item.price} AZN</Text>
                            </Button>
                        </Right>
                    </ListItem>
                );
            });
        } else {
            return <Text>{t('noResult')}</Text>;
        }
    }

    return (
        <View style={{flex: 1}}>
            <SlidingUpPanel
                ref={ModalRef}
                draggableRange={dragableRang}
                animatedValue={_draggedValue}
                backdropOpacity={0}
                snappingPoints={[360]}
                height={height + 25}
                friction={0.9}
                containerStyle={styles.slideUp}
            >
                <View sttyle={styles.panelHandle}>
                    <View style={{
                        maxHeight: 70,
                        minHeight: 45,
                        width: width,
                    }}>
                        <View style={{
                            marginHorizontal: 20,
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}>
                            <Text style={{color: "#7c9d32", marginVertical: 10}}>Recent</Text>
                            <View style={{
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                            }}>
                                <Button style={{
                                    backgroundColor: "#7c9d32",
                                    width: 80,
                                    height: 18,
                                    borderRadius: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textAlign: "center",
                                }}><View
                                    style={{
                                        backgroundColor: "rgba(255,255,255,.9)",
                                        width: 40,
                                        height: 4,
                                        borderRadius: 10
                                    }}/></Button></View>
                            <Text style={{color: "#7c9d32", marginVertical: 10}}>Today</Text>
                        </View>
                    </View>
                    <View style={{height: 500, paddingBottom: 10}}>
                        <FlatList
                            data={oper}
                            keyExtractor={(index) => index}
                            renderItem={renderItem3}
                        />
                    </View>
                </View>
            </SlidingUpPanel>
        </View>
    )
}


const styles = StyleSheet.create({
    f1: {
        flex: 1,
        width: width,
        height: 300,
    },
    scrollrecent: {
        flex: 1,
        width: width,
    },
    seperatorText: {
        fontSize: 15,
        color: '#7c9d32',
        paddingTop: 1,
        flex: 1,
        width: width,
    },
    listHeaderText: {
        color: '#7c9d32',
        paddingVertical: 3,
        fontSize: 14,
    },
    notFound: {
        color: '#BF360C',
        fontSize: 19,
        textAlign: 'center',
    },
    panelHandle: {
        height: 5,
        width: width,
        backgroundColor: "#666",
        borderRadius: 6,
        alignSelf: "center",
    },
    slideUp: {
        backgroundColor: "#fff",
        marginTop: 80,
        alignSelf: "center",
        width: width,
        height: 100
    }
})