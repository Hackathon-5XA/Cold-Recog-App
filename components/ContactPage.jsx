import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, TextInput, ActivityIndicator } from 'react-native';
import * as Font from 'expo-font';
import Header from '../components/Header';  // Adjust the import path if necessary
import Footer from '../components/Footer';  // Adjust the import path if necessary

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        // Replace these with the actual font files you're using
        'inter': require('../assets/fonts/Inter (1)/static/Inter_28pt-Medium.ttf'),
        'K2D': require('../assets/fonts/K2D-ExtraBoldItalic.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleInputChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:7010483092');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:fivexa69@gmail.com');
  };

  const handleSubmit = () => {
    // Perform form submission logic here
    setSubmitted(true);
    console.log('Form submitted:', form);
  };

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
          <Text style={styles.headerText}>Contact Us</Text>
        </View>
        <Text style={styles.title}>Get in Touch</Text>

        <TouchableOpacity onPress={handlePhonePress}>
          <Text style={styles.linkText}>
            <Text style={styles.label}>Phone: </Text>
            7010483092
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEmailPress}>
          <Text style={styles.linkText}>
            <Text style={styles.label}>Email: </Text>
            fivexa69@gmail.com
          </Text>
        </TouchableOpacity>

        <Text style={styles.title}>Contact Form</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={form.name}
          onChangeText={(text) => handleInputChange('name', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleInputChange('email', text)}
        />
        <TextInput
          style={[styles.input, styles.messageInput]}
          placeholder="Message"
          multiline
          value={form.message}
          onChangeText={(text) => handleInputChange('message', text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        {submitted && <Text style={styles.successMessage}>Your message has been sent!</Text>}
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
    justifyContent: 'space-between',
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
    paddingTop: 20,
    paddingVertical: 25,
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
    fontFamily: 'inter', // Use your custom font
  },
  linkText: {
    fontSize: 16,
    color: '#1e90ff', // Bright blue color for links
    marginVertical: 10,
    lineHeight: 24,
    fontFamily: 'K2D', // Use your custom font
  },
  label: {
    fontWeight: 'bold',
    fontFamily: 'inter', // Use your custom font
  },
  button: {
    backgroundColor: '#212121',
    marginTop: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#32E0C4',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'K2D', // Use your custom font
  },
  input: {
    height: 30,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
    fontFamily: 'inter', // Use your custom font
  },
  messageInput: {
    height: 100,
    textAlignVertical: 'top',
    fontFamily: 'inter', // Use your custom font
  },
  successMessage: {
    fontSize: 16,
    color: '#28a745', // Green color for success message
    marginVertical: 10,
    textAlign: 'center',
    fontFamily: 'inter', // Use your custom font
  },
  teamContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  member: {
    alignItems: 'center',
    marginVertical: 10,
    width: '40%', // Adjust width to fit your layout
  },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 5,
    resizeMode: 'cover',
  },
  memberName: {
    fontSize: 16,
    color: '#000000',
  },
});

export default ContactPage;
