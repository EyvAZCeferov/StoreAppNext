import * as React from 'react';
import {StyleSheet, Dimensions, SafeAreaView, View, FlatList, Animated} from 'react-native';
import firebase from '../../../../../Functions/FireBase/firebaseConfig';
import CardOne from "./CardOne";
const {width,height} = Dimensions.get('window');
export default function SliderCards({props}) {
    const [cards, setcards] = React.useState(null)

    async function getInfo() {
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('users/' + user.uid + '/cards')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    setcards(datas);
                    renderCards();
                });
        } else {
            props.navigation.navigate('Home');
        }
    }

    React.useEffect(() => {
        getInfo();
    }, [])

    const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
    const y = new Animated.Value(0);
    const onScroll = Animated.event([{nativeEvent: {contentOffset: {y}}}], {
        useNativeDriver: true,
    });

    function renderCards() {
        if (cards != null) {
            return (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <AnimatedFlatlist
                        vertical={true}
                        scrollEventThrottle={18}
                        nestedScrollEnabled={true}
                        inverted={false}
                        zoomScale={3}
                        windowSize={width}
                        snapToStart={true}
                        bouncesZoom={true}
                        bounces={false}
                        showsVerticalScrollIndicator={false}
                        loop={true}
                        autoplay={false}
                        backgroundColor="#fff"
                        keyExtractor={(item, index) => index.toString()}
                        data={cards}
                        renderItem={({item, index}) => {
                            return <CardOne {...{ index, y, item }} />;
                        }}
                        {...{onScroll}}
                    />
                </View>
            );
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <SafeAreaView
                    style={{
                        flex: 1,
                        paddingTop: height/55,
                    }}>
                    {renderCards()}
                </SafeAreaView>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 201,
    },
});
