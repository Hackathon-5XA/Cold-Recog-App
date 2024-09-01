import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoadingMessage = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                Searching your best match with our algorithms
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        color: 'gray',
    },
});

export default LoadingMessage;
