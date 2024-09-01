import React from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

const AnimationComponent = () => {
    const cloudLoopAnim = new Animated.Value(0);

    // Example of setting up animation
    React.useEffect(() => {
        Animated.loop(
            Animated.timing(cloudLoopAnim, {
                toValue: 1,
                duration: 3000,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.line, { transform: [{ rotate: '45deg' }] }]} />
            <Animated.View style={[styles.line, { transform: [{ rotate: '45deg' }] }]} />
            <View style={styles.circle}>
                <View style={styles.row}>
                    <FontAwesomeIcon icon={faPerson} size={36} color="#38b2ac" />
                    <FontAwesomeIcon icon={faPerson} size={36} color="#38b2ac" />
                </View>
                <View style={styles.row}>
                    <FontAwesomeIcon icon={faPerson} size={36} color="#38b2ac" />
                    <FontAwesomeIcon icon={faPerson} size={36} color="#38b2ac" />
                </View>
            </View>
            <Animated.View style={[styles.shadow, { transform: [{ scaleX: cloudLoopAnim }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        height: 128,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    line: {
        position: 'absolute',
        width: 48,
        height: 6,
        backgroundColor: 'gray',
    },
    circle: {
        width: 144,
        height: 144,
        borderRadius: 72,
        backgroundColor: 'white',
        borderWidth: 8,
        borderColor: 'gray',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shadow: {
        position: 'absolute',
        top: 208,
        width: 96,
        height: 32,
        borderRadius: 16,
        backgroundColor: 'gray',
        opacity: 0.4,
    },
});

export default AnimationComponent;
