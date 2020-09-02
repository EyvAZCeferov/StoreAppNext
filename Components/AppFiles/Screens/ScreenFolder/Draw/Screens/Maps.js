import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Tabs, Tab, Header} from 'native-base';
import TabMapsLists from '../Component/Maps/TabMapsLists';
import TabMapsView from '../Component/Maps/TabMapsView';
import ScreensStandart from '../Component/ScreensStandart';
import {t} from '../../../../Lang';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Maps extends React.Component {
    render() {
        return (
            <View>
                <ScreensStandart {...this.props} name={t('map')}/>
                <View style={styles.f1}>
                    <Tabs style={styles.tabsBg} tabStyle={styles.tabsBg} activeTabStyle={styles.activeTab}
                          containerStyle={styles.tabsBg}>
                        <Tab
                            style={styles.tabsBg}
                            heading={t('mapList')}
                            tabStyle={styles.tabsBg}
                            containerStyle={styles.tabsBg}
                            activeTabStyle={styles.activeTab}
                        >
                            <TabMapsLists/>
                        </Tab>
                        <Tab
                            tabStyle={styles.tabsBg}
                            containerStyle={styles.tabsBg}
                            style={styles.tabsBg}
                            heading={t('mapView')}
                            activeTabStyle={styles.activeTab}
                        >
                            <TabMapsView/>
                        </Tab>
                    </Tabs>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    f1: {
        width: width,
        height: height,
        padding: 0,
        margin: 0,
    },
    tabsBg: {
        backgroundColor: '#fff',
        color: '#6d7587',
        padding: 0,
        margin: 0,
    },
    activeTab: {
        backgroundColor: "#7c9d32",
        padding: 0,
        margin: 0,
    }
});
