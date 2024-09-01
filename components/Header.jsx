import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import logo from '../assets/logo1.png';

const Header = () => {
    const [isMenuVisible, setMenuVisible] = useState(false);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                'CustomFont': require('../assets/fonts/BakbakOne-Regular.ttf'), // Replace with your font file path
            });
            setFontsLoaded(true);
        };

        loadFonts();
    }, []);

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const navigateTo = (path) => {
        router.push(path);
        toggleMenu(); // Close the menu after navigation
    };

    if (!fontsLoaded) {
        return null; // or a fallback UI
    }

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigateTo('/')}>
                <Image source={logo} style={styles.logo} />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleMenu} style={styles.hamburgerIcon}>
                <Icon name="menu" size={30} color="white" />
            </TouchableOpacity>
            {isMenuVisible && (
                <Modal
                    transparent={true}
                    visible={isMenuVisible}
                    animationType="fade"
                    onRequestClose={toggleMenu}
                >
                    <Pressable style={styles.modalOverlay} onPress={toggleMenu}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={() => navigateTo('/about')}>
                                <Text style={styles.modalItem}>About</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigateTo('/features')}>
                                <Text style={styles.modalItem}>Features</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigateTo('/contact')}>
                                <Text style={styles.modalItem}>Contact Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => navigateTo('/team')}>
                                <Text style={styles.modalItem}>Meet the Team</Text>
                            </TouchableOpacity>
                        </View>
                    </Pressable>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#212121',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    hamburgerIcon: {
        padding: 10,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#212121',
        borderRadius: 10,
        padding: 20,
        marginTop: 50, // Adjust this value to position the menu correctly
        marginRight: 10,
    },
    modalItem: {
        color: 'white',
        fontSize: 18,
        marginVertical: 10,
        fontFamily: 'CustomFont', // Apply the custom font
    },
});

export default Header;
