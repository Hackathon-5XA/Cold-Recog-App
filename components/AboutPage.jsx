import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import Face from '../assets/Face.png';
import BFR from '../assets/BFR.png';
import FR from '../assets/FR.png';
import TN from '../assets/TN.png';
import Delhi from '../assets/Delhi.png';
import ACP from '../assets/ACP.png';
import UT from '../assets/UT.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'inter': require('../assets/fonts/Inter (1)/static/Inter_28pt-Medium.ttf'),
        'K2D' : require('../assets/fonts/K2D-ExtraBoldItalic.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.headerText, { fontFamily: 'K2D' }]}>About Us</Text>
        </View>
        <Image source={Face} style={styles.image} />
        <Text style={[styles.title, { fontFamily: 'K2D' }]}>What's Our Project</Text>
        <Text style={[styles.text, { fontFamily: 'inter' }]}>
          Our innovative system provides rapid, accurate identification of unclaimed bodies, ensuring respect and closure for families. Access this breakthrough technology easily through our user-friendly web app.
        </Text>
        <Image source={BFR} style={styles.image} />
        <Text style={[styles.title, { fontFamily: 'K2D' }]}>Why Our Project</Text>
        <Image source={TN} style={styles.image} />
        <Image source={Delhi} style={styles.image} />
        <Text style={[styles.text, { fontFamily: 'inter' }]}>
          Every year, over 40,000 dead bodies remain unclaimed. Our project addresses this pressing issue by providing a reliable and efficient identification solution.
        </Text>
        <Text style={[styles.title, { fontFamily: 'K2D' }]}>How Our Project</Text>
        <Image source={FR} style={styles.image} />
        <Text style={[styles.text, { fontFamily: 'inter' }]}>
          We use DeepFace technology to compare the faces of unclaimed bodies with government identities stored in our database, ensuring accurate identification and facilitating a respectful closure.
        </Text>
        <Text style={[styles.title, { fontFamily: 'K2D' }]}>Collaboration</Text>
        <Image source={ACP} style={styles.image} />
        <Text style={[styles.text, { fontFamily: 'inter' }]}>
          We are proud to collaborate with the ACP of Greater Chennai Corporation to enhance the efficacy and reach of our system. This partnership allows us to integrate our technology with local governance, ensuring timely and effective identification processes.
        </Text>
        <Image source={UT} style={styles.image} />
        <Text style={[styles.text, { fontFamily: 'inter' }]}>
          Additionally, we work closely with Uravugal Trust, a renowned organization dedicated to social welfare, to extend our services to underserved communities. This collaboration helps us to provide our identification solution to those in need and ensures wider impact.
        </Text>
      </ScrollView>
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
    justifyContent: 'space-between',
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#38b2ac', // Teal color for the header border
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#38b2ac', // Teal color for the footer border
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    paddingTop: 20,
    paddingVertical: 25,
    backgroundColor: '#212121', // Black background for the header
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 5,
    borderRadius: 15,
  },
  headerText: {
    fontSize: 24,
    color: '#32E0C4', // Teal text color
  },
  title: {
    fontSize: 20,
    color: '#32E0C4', // Teal text color for titles
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#000000', // Black text color
    marginVertical: 10,
    lineHeight: 24,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    resizeMode: 'contain',
  },
});

export default AboutPage;
