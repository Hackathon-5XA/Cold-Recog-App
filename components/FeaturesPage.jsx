import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import aadhar from '../assets/aadhar.png';  // Ensure these paths match your project structure
import Voter from '../assets/Voter.png';
import Driving from '../assets/Driving.png';
import Header from '../components/Header';  // Adjust the import path if necessary
import Footer from '../components/Footer';  // Adjust the import path if necessary

const FeaturesPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        // Replace these with the actual fonts you want to load
        'inter': require('../assets/fonts/Inter (1)/static/Inter_28pt-Medium.ttf'),
        'K2D': require('../assets/fonts/K2D-ExtraBoldItalic.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#32E0C4" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Our Features</Text>
        </View>
        <Text style={styles.title}>Comprehensive Identification</Text>
        <Text style={styles.text}>
          Our system offers a comprehensive solution for identifying both deceased and missing persons. We utilize advanced facial recognition technology to match faces against a wide range of government identities including Aadhar cards, Voter IDs, and Driving Licenses. This ensures a reliable and accurate identification process.
        </Text>
        <Image source={aadhar} style={styles.image} />
        <Image source={Voter} style={styles.image} />
        <Image source={Driving} style={styles.image} />

        <Text style={styles.title}>Efficient Facial Recognition</Text>
        <Text style={styles.text}>
          Our facial recognition technology is designed to deliver precise results quickly. By leveraging a large dataset and advanced algorithms, we ensure that the identification process is not only accurate but also efficient, reducing the time required for verification and increasing the overall effectiveness of our system.
        </Text>

        <Text style={styles.title}>Fast and Reliable Results</Text>
        <Text style={styles.text}>
          We understand the importance of timely identification, which is why our system is optimized for speed. Our technology can process and match images rapidly, providing results in a fraction of the time compared to traditional methods. This ensures that families and authorities receive the necessary information as quickly as possible.
        </Text>

        <Text style={styles.title}>Scalable and Adaptable</Text>
        <Text style={styles.text}>
          Our system is built to scale, capable of handling extensive datasets and adapting to new types of identification documents as they become available. This flexibility allows us to continuously improve and expand our capabilities, ensuring that we remain at the forefront of facial recognition technology.
        </Text>
      </ScrollView>
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#32E0C4', // Teal color for the header border
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#32E0C4', // Teal color for the footer border
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  header: {
    paddingVertical: 20,
    backgroundColor: '#212121', // Black background for the header
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 15,
  },
  headerText: {
    fontSize: 24,
    color: '#32E0C4', // Teal text color
    fontFamily: 'K2D', // Use your custom font
  },
  title: {
    fontSize: 20,
    color: '#32E0C4', // Teal text color for titles
    marginVertical: 10,
    fontFamily: 'K2D', // Use your custom font
  },
  text: {
    fontSize: 16,
    color: '#000000', // Black text color
    marginVertical: 10,
    lineHeight: 24,
    fontFamily: 'inter', // Use your custom font
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    resizeMode: 'contain',
  },
});

export default FeaturesPage;
