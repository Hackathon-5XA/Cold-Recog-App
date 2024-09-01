// components/LandingPage.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';
import detectiveImage from '../assets/detective.png';

const LandingPage = () => {
  const navigation = useNavigation();

  const handleSearchPress = () => {
    navigation.navigate('search');
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            COLD RECOG
          </Text>
          <Text style={styles.subtitle}>
            Our innovative system provides rapid, accurate identification of unclaimed bodies, ensuring respect and closure for families. Access this breakthrough technology easily through our user-friendly web app.
          </Text>
          <TouchableOpacity style={styles.button} onPress={handleSearchPress}>
            <Text style={styles.buttonText}>SEARCH</Text>
          </TouchableOpacity>
        </View>
        <Image source={detectiveImage} style={styles.image} />
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212121',
  },
  main: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eeeeee',
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
    // fontFamily: 'CustomFont', // Apply the custom font here
  },
  subtitle: {
    fontSize: 16,
    color: '#474444',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#332B2B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  buttonText: {
    color: '#3AE4C9',
    fontSize: 18,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default LandingPage;
