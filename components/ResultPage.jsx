// components/ResultPage.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';

const ResultPage = ({ route }) => {
  const { uploadedImage, matchedImages } = route.params;

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.main}>
        <Text style={styles.title}>Search Results</Text>
        <Image source={{ uri: uploadedImage }} style={styles.uploadedImage} />
        {matchedImages.length > 0 ? (
          matchedImages.map((image, index) => (
            <View key={index} style={styles.resultContainer}>
              <Text style={styles.matchRate}>Match Rate: {image.matchRate.toFixed(2)}%</Text>
              <Image source={{ uri: image.url }} style={styles.matchedImage} />
            </View>
          ))
        ) : (
          <Text style={styles.noResults}>No matches found</Text>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  main: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  uploadedImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  resultContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  matchRate: {
    fontSize: 16,
    marginBottom: 10,
  },
  matchedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  noResults: {
    fontSize: 18,
    color: '#9ca3af',
  },
});

export default ResultPage;
