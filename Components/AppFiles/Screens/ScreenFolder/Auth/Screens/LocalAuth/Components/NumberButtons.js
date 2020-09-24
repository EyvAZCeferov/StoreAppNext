import React, {useState} from 'react';
import {View, StyleSheet, Dimensions, Text, TouchableOpacity, BackHandler} from 'react-native';
import {Col, Grid, Row} from 'react-native-easy-grid';

var width = Dimensions.get('window').width;
import {MaterialCommunityIcons} from '@expo/vector-icons';

import customStyle from '../../../../../../../../assets/Theme';
import {t} from "../../../../../../Lang";

export default function NumberButton(props) {
    const [val, setVal] = useState(null);

    function changeVal(e) {
        props.changeVal(e)
    }

    function clearVal() {
        props.clearVal();
    }

    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Grid style={styles.grid}>
                        <Row style={styles.alignCenter}>
                            <Grid style={styles.alignCenter}>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity onPress={() => changeVal(1)} style={styles.btn}>
                                        <Text style={styles.btnText}>1</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => changeVal(2)}>
                                        <Text style={styles.btnText}>2</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => changeVal(3)}>
                                        <Text style={styles.btnText}>3</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                        </Row>
                        <Row style={styles.alignCenter}>
                            <Grid style={styles.alignCenter}>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => changeVal(4)}>
                                        <Text style={styles.btnText}>4</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => changeVal(5)}>
                                        <Text style={styles.btnText}>5</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => changeVal(6)}>
                                        <Text style={styles.btnText}>6</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                        </Row>
                        <Row style={styles.alignCenter}>
                            <Grid style={styles.alignCenter}>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => changeVal(7)}>
                                        <Text style={styles.btnText}>7</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => changeVal(8)}>
                                        <Text style={styles.btnText}>8</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => changeVal(9)}>
                                        <Text style={styles.btnText}>9</Text>
                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                        </Row>
                        <Row style={styles.alignCenter}>
                            <Grid style={styles.alignCenter}>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity
                                        style={styles.btn}
                                        rounded
                                        light
                                        onPress={() => BackHandler.exitApp()}>
                                        <Text style={[styles.btnText, styles.cancText]}>
                                            {t('cancel')}
                                        </Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => changeVal(0)}>
                                        <Text style={styles.btnText}>0</Text>
                                    </TouchableOpacity>
                                </Col>
                                <Col style={styles.alignCenter}>
                                    <TouchableOpacity style={styles.btn} onPress={() => clearVal()}>
                                        <MaterialCommunityIcons
                                            name="backspace-outline"
                                            size={24}
                                            color="#7c9d32"
                                        />
                                    </TouchableOpacity>
                                </Col>
                            </Grid>
                        </Row>
                    </Grid>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: 290,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    grid: {
        width: width - 85,
        height: 290,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        width: 60,
        height: 60,
        borderWidth: 1.8,
        borderColor: "#7c9d32",
        borderRadius: 30,
        shadowColor: '#6d7587',
        shadowRadius: 1,
        shadowOffset: {
            width: 2,
            height: 3,
        },
        shadowOpacity: 1,
    },
    btnText: {
        fontSize: 19,
        fontWeight: '400',
        color: '#7c9d32',
    },
    cancText: {
        fontSize: 13,
    },
    alignCenter: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: "center",
    }
});
