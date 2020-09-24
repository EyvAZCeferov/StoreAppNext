import React, {useState} from 'react';
import {
    Animated,
    SafeAreaView,
    View,
    Text
} from 'react-native';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import styles, {
    ACTIVE_CELL_BG_COLOR,
    CELL_BORDER_RADIUS,
    CELL_SIZE,
    NOT_EMPTY_CELL_BG_COLOR,
} from './CodeFieldStyles';

export default function CodeFieldInput(prop) {
    const {Value, Text: AnimatedText} = Animated;

    const CELL_COUNT = 4;

    const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
    const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));

    function animateCell({hasValue, index, isFocused}) {
        Animated.parallel([
            Animated.timing(animationsColor[index], {
                useNativeDriver: false,
                toValue: isFocused ? 1 : 0,
                duration: 250,
            }),
            Animated.spring(animationsScale[index], {
                useNativeDriver: false,
                toValue: hasValue ? 0 : 1,
                duration: hasValue ? 300 : 250,
            }),
        ]).start();
    }

    const [value, setValue] = useState(prop.value);

    const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    function renderCell({index, symbol, isFocused}) {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: ['#fff', ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        setTimeout(() => {
            animateCell({hasValue, index, isFocused});
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell, animatedCellStyle]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor/> : null)}
            </AnimatedText>
        );
    }

    React.useEffect(() => {
        setInterval(() => {
            renderCodefield()
        }, 3000)
    })

    function renderCodefield() {
        return (
            <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                autoFocus={false}
                autoCapitalize={true}
                autoCorrect={true}
                rootStyle={styles.codeFieldRoot}
                keyboardType="numeric"
                textContentType="oneTimeCode"
                renderCell={renderCell}
            />
        );
    }

    return (
        <View style={styles.codearea}>
            <Text style={{color: "red", fontSize: 20, fontWeight: "bold"}}>{value}</Text>
            <SafeAreaView style={styles.root}>
                {renderCodefield()}
            </SafeAreaView>
        </View>
    );
};

