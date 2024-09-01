import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Header from './Header';
import Footer from './Footer';

// Import team member images
import AakashImage from '../assets/Aakash.png';
import AbhishekImage from '../assets/Abhishek.png';
import AkashImage from '../assets/Akash.png';
import AksshayImage from '../assets/Aksshay.png';
import AswinImage from '../assets/Aswin.png';

// Function to load custom fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'glitch': require('../assets/fonts/glitch.ttf'), // Replace with your custom font files
    'inter': require('../assets/fonts/Inter (1)/static/Inter_28pt-ExtraBoldItalic.ttf'), // Replace with your custom font files
  });
};

const TeamPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    fetchFonts()
      .then(() => setFontsLoaded(true))
      .catch((error) => console.error('Error loading fonts:', error));
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Meet the Team</Text>
        </View>
        <View style={styles.teamContainer}>
          <View style={styles.member}>
            <Image source={AakashImage} style={styles.memberImage} />
            <Text style={styles.memberName}>Aakash S</Text>
          </View>
          <View style={styles.member}>
            <Image source={AbhishekImage} style={styles.memberImage} />
            <Text style={styles.memberName}>Abhishek Renjan</Text>
          </View>
          <View style={styles.member}>
            <Image source={AkashImage} style={styles.memberImage} />
            <Text style={styles.memberName}>Akash A</Text>
          </View>
          <View style={styles.member}>
            <Image source={AksshayImage} style={styles.memberImage} />
            <Text style={styles.memberName}>Aksshay B A</Text>
          </View>
          <View style={styles.member}>
            <Image source={AswinImage} style={styles.memberImage} />
            <Text style={styles.memberName}>Aswin B A</Text>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#212121',
    borderBottomWidth: 1,
    borderBottomColor: '#32E0C4',
    alignItems: 'center',
    borderRadius: 15,
  },
  headerText: {
    fontSize: 24,
    color: '#32E0C4',
    fontFamily: 'glitch', // Use the custom font here
  },
  content: {
    flex: 1,
    padding: 16,
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  member: {
    alignItems: 'center',
    marginVertical: 10,
    width: '40%',
    marginTop: 42,
  },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginBottom: -4,
    resizeMode: 'cover',
  },
  memberName: {
    fontSize: 16,
    color: '#000000',
    fontFamily: 'inter', // Use the custom font here
  },
});

export default TeamPage;
