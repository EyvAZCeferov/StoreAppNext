import * as React from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    ActivityIndicator,
    FlatList
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Permissions from "expo-permissions";
import firebase from '../../../../../Functions/FireBase/firebaseConfig'
import Constants from 'expo-constants';

export default class TabMapsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            markers: null,
            markerCount:0,
            ready:false,
        }
    }

    async getPerm() {
        const {status} = await Permissions.getAsync(Permissions.LOCATION);

        if (status !== 'granted') {
            const response = await Permissions.askAsync(Permissions.LOCATION);
            this.setState({ready:true});
        }
        navigator.geolocation.getCurrentPosition(
            ({coords: {latitude, longitude}}) =>
                this.setState({latitude:latitude, longitude:longitude,ready:true}),
            (error) => console.log('Error:', error)
        );
    }

    async getInfo() {
        firebase.database().goOnline()
        var user = firebase.auth().currentUser;
        if (user) {
            var datas = [];
            firebase
                .database()
                .ref('maps')
                .on('value', (data) => {
                    data.forEach((data) => {
                        datas.push(data.val());
                    });
                    this.setState({
                        markers: datas,
                        markerCount:data.numChildren(),
                        ready: true,
                    });
                });
        } else {
            this.props.navigation.navigate('Home');
        }
    }

    componentDidMount() {
        this.getPerm();
        this.getInfo();
    }


    renderMarker(){
        return this.state.markers.map((element,index) => {
            const {lat,lng}=element.coords;
            return(
                    <Marker
                        key={index}
                        title={element.name}
                        coordinate={{latitude:parseFloat(lat), longitude:parseFloat(lng)}}
                        description={element.address}
                        image={require('../../../../../../../assets/images/Map/marker.png')}
                    />
                )
        })
    }


    renderMap(){
        if(this.state.latitude!=null || this.state.longitude!=null ){
            return(
            <MapView
                    style={styles.mapStyle}
                    followsUserLocation={true}
                    cacheEnabled={true}
                    zoomEnabled={true}
                    zoomControlEnabled={true}
                    zoomTapEnabled={true}
                    showsScale={true}
                    userLocationAnnotationTitle={firebase.auth().currentUser.name}
                    showsUserLocation={true}
                    showsTraffic={false}
                    showsPointsOfInterest={false}
                    showsCompass={true}
                    loadingEnabled={true}
                    scrollEnabled={true}
                    paddingAdjustmentBehavior="always"
                    pitchEnabled={true}
                    showsBuildings={false}
                    showsIndoors={false}
                    rotateEnabled={true}
                    mapType="hybrid"
                    liteMode={false}
                    loadingIndicatorColor="#7c9d32"
                    provider="google"
                    showsMyLocationButton={true}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    >
                    {this.state.markerCount>0 ? this.renderMarker() : null }
                </MapView>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
            {this.state.ready  ? 
                 this.renderMap()
                 : (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#7c9d32" />
                </View>
                ) }
              
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginTop: Constants.statusBarHeight*4,
    },
});
