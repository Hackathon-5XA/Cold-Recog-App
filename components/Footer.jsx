import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import * as Font from 'expo-font';

const Footer = () => {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'font': require('../assets/fonts/BakbakOne-Regular.ttf'), // Replace with your font file path
            });
            setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    if (!fontsLoaded) {
        return null; // or a fallback UI
    }

    return (
        <View style={styles.footer}>
            <View style={styles.nav}>
                <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Hackathon-5XA/Cold-Recog-UI/issues')}>
                    <Text style={styles.linkText}>Issues</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://github.com/Hackathon-5XA')}>
                    <Text style={styles.linkText}>Repo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('/')}>
                    <Text style={styles.linkText}>Privacy Policy</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.copyright}>CopyRight &copy; 5XA</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#212121',
        padding: 16,
        alignItems: 'center',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    linkText: {
        color: '#eeeeee',
        fontSize: 16,
        fontFamily: 'font', // Use the custom font
    },
    copyright: {
        color: '#0bf5d6',
        fontSize: 12,
        marginTop: 10,
        opacity: 0.5,
        fontFamily: 'font', // Use the custom font
    },
});

export default Footer;
