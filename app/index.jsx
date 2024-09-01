import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import * as Font from 'expo-font';
import Header from '../components/Header';
import Footer from '../components/Footer';
import detectiveImage from '../assets/detective.png';

const fetchFonts = () => {
    return Font.loadAsync({
        'glitch': require('../assets/fonts/glitch.ttf'),
        'K2D-Bold': require('../assets/fonts/K2D-Bold.ttf'),
        'inter': require('../assets/fonts/Inter (1)/static/Inter_28pt-ExtraBoldItalic.ttf'),
    });
};

const Index = () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchFonts().then(() => setFontLoaded(true));
    }, []);

    const handleSearchPress = () => {
        router.push('/search');
    };

    if (!fontLoaded) {
        return null; // Optionally return a loading indicator here
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Header />
            </View>
            <View style={styles.main}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>COLD RECOG</Text>
                    <Text style={styles.subtitle}>
                        Our innovative system provides rapid, accurate identification of unclaimed bodies, ensuring respect and closure for families. Access this breakthrough technology easily through our user-friendly web app.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={handleSearchPress}>
                        <Text style={styles.buttonText}>SEARCH</Text>
                    </TouchableOpacity>
                </View>
                <Image source={detectiveImage} style={styles.image} />
            </View>
            <View style={styles.footerContainer}>
                <Footer />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff', // White separation line
    },
    footerContainer: {
        borderTopWidth: 1,
        borderTopColor: '#ffffff', // White separation line
    },
    main: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 36,
        color: '#38b2ac',
        marginBottom: 10,
        fontFamily: 'glitch',
    },
    subtitle: {
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'inter',
    },
    button: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 40,
    },
    buttonText: {
        color: '#21b6a8',
        fontSize: 18,
        fontFamily: 'K2D-Bold',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
    },
});

export default Index;
