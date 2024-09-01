// app/result.jsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Icon from 'react-native-vector-icons/FontAwesome'; // Use react-native-vector-icons

const ResultPage = () => {
  const router = useRouter();
  const { uploadedImage, matchedImages } = router.query;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % matchedImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + matchedImages.length) % matchedImages.length);
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        <View style={styles.imageContainer}>
          {uploadedImage ? (
            <Image
              source={{ uri: uploadedImage }}
              style={styles.uploadedImage}
            />
          ) : (
            <Text>No uploaded image</Text>
          )}
        </View>
        <View style={styles.resultContainer}>
          {matchedImages && matchedImages.length > 0 ? (
            <View style={styles.resultContent}>
              <TouchableOpacity style={styles.navButton} onPress={handlePrev}>
                <Icon name="arrow-left" size={30} color="#4A5568" />
              </TouchableOpacity>
              <View style={styles.imagePreviewContainer}>
                <Image
                  source={{ uri: matchedImages[currentIndex].url }}
                  style={styles.resultImage}
                />
                <Text style={styles.matchRate}>
                  Match Rate: {matchedImages[currentIndex].matchRate}%
                </Text>
              </View>
              <TouchableOpacity style={styles.navButton} onPress={handleNext}>
                <Icon name="arrow-right" size={30} color="#4A5568" />
              </TouchableOpacity>
            </View>
          ) : (
            <Text>No Match Found</Text>
          )}
        </View>
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    justifyContent: 'space-between',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  imageContainer: {
    marginBottom: 20,
  },
  uploadedImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  resultContainer: {
    alignItems: 'center',
    width: '100%',
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    paddingHorizontal: 20,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  resultImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  matchRate: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
});

export default ResultPage;
