import {StyleSheet, Dimensions} from 'react-native';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
export const CELL_SIZE = 50;
export const CELL_BORDER_RADIUS = 0;
export const DEFAULT_CELL_BG_COLOR = '#fff';
export const NOT_EMPTY_CELL_BG_COLOR = '#7c9d32';
export const ACTIVE_CELL_BG_COLOR = '#f1f1f1';

const styles = StyleSheet.create({
    codearea: {
        height: 40,
        marginTop: 170,
        width: width,
    },
    codeareaSetPas: {
        height: 120,
        marginTop: 130,
        width: width,
    },
    codeFieldRoot: {
        height: CELL_SIZE,
        marginVertical: 0,
        paddingHorizontal: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    cell: {
        marginHorizontal: 15,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        fontSize: 30,
        backgroundColor: '#fff',
        textAlign: 'center',
        color: '#7c9d32',
        borderColor: 'transparent',
        borderBottomColor: "#6d7587",
        borderBottomWidth: 1.54,
        borderRadius: 0,
    },
    root: {
        height: height,
    },
    title: {
        color: '#6d7587',
        fontSize: 23,
        fontWeight: '700',
        textAlign: 'center',
        paddingVertical: 25,

    },
    title2: {
        color: '#6d7587',
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
        paddingVertical: 25,

        paddingTop: 50,
    },
    subtitle: {
        paddingVertical: 20,
        color: '#6d7587',
        fontSize: 17,
        fontWeight: '500',
        textAlign: 'center',

    },
    passwordUnderTExt: {
        paddingVertical: 0,
        paddingLeft: 50,
        color: '#6d7587',
        fontSize: 13,
        fontWeight: '500',

    },
    icon: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 50,
        color: '#6d7587',
    },
    imageArena: {
        marginVertical: 30,
    },
});

export default styles;
