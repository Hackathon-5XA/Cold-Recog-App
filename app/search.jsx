import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Font from 'expo-font';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimationComponent from '../components/AnimationComponent';
import LoadingMessage from '../components/LoadingMessage';

const SearchPage = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [matchedImages, setMatchedImages] = useState([]);
  const [isFileProcessing, setIsFileProcessing] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(Dimensions.get('window').width <= 767);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Load the custom font
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'custom-font': require('../assets/fonts/K2D-Regular.ttf'), // Replace with your font file path
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(Dimensions.get('window').width <= 767);
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription?.remove();
  }, []);

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant permission to access the media library.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      processImage(result.assets[0].uri);
    }
  }, []);

  const takePhoto = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Please grant permission to access the camera.');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      processImage(result.assets[0].uri);
    }
  }, []);

  const processImage = async (fileUri) => {
    setIsFileProcessing(true);

    const formData = new FormData();
    formData.append("file", {
      uri: fileUri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      const response = await axios.post("https://9f4c-2406-7400-bb-5cf0-d5cb-fd3f-7250-8463.ngrok-free.app/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const matchedImagesData = data.matched_images || [];
        const matchedImagesUrls = matchedImagesData.map((imageData) => ({
          url: `https://9f4c-2406-7400-bb-5cf0-d5cb-fd3f-7250-8463.ngrok-free.app/matched-images/${imageData.file_name}`,
          matchRate: imageData.match_rate,
        }));

        setMatchedImages(matchedImagesUrls);
        setUploadCompleted(true);
      } else {
        console.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    setPreviewUrl(fileUri);
    setIsFileProcessing(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % matchedImages.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + matchedImages.length) % matchedImages.length);
  };

  // Render a loading indicator if fonts are not loaded yet
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
      </View>
      <View style={styles.main}>
        {isFileProcessing ? (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color="#4fd1c5" />
            <Text style={[styles.processingText, { fontFamily: 'custom-font' }]}>Processing your image, please wait...</Text>
          </View>
        ) : uploadCompleted ? (
          <View style={styles.resultContainer}>
            {previewUrl && (
              <Image source={{ uri: previewUrl }} style={styles.previewImage} />
            )}
            {matchedImages.length > 0 && (
              <View style={styles.paginationContainer}>
                <TouchableOpacity onPress={handlePreviousImage} style={styles.arrowButton}>
                  <Text style={[styles.arrowText, { fontFamily: 'custom-font' }]}>{"<"}</Text>
                </TouchableOpacity>
                <Image source={{ uri: matchedImages[currentImageIndex].url }} style={styles.matchedImage} />
                <TouchableOpacity onPress={handleNextImage} style={styles.arrowButton}>
                  <Text style={[styles.arrowText, { fontFamily: 'custom-font' }]}>{">"}</Text>
                </TouchableOpacity>
              </View>
            )}
            {matchedImages.length > 0 && (
              <Text style={[styles.matchRateText, { fontFamily: 'custom-font' }]}>
                Match Rate: {matchedImages[currentImageIndex].matchRate}%
              </Text>
            )}
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={[styles.buttonText, { fontFamily: 'custom-font' }]}>Pick an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={[styles.buttonText, { fontFamily: 'custom-font' }]}>Take a Photo</Text>
            </TouchableOpacity>
          </>
        )}
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
    justifyContent: 'space-between',
  },
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ffffff',
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  processingContainer: {
    alignItems: 'center',
  },
  processingText: {
    fontSize: 18,
    color: '#4fd1c5',
    marginVertical: 20,
  },
  resultContainer: {
    alignItems: 'center',
    width: '100%',
  },
  previewImage: {
    width: '90%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
    borderWidth: 5,
    borderRadius: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  matchedImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginHorizontal: 10,
    borderWidth: 5,
    borderRadius: 10,
  },
  arrowButton: {
    padding: 10,
  },
  arrowText: {
    fontSize: 30,
    color: '#32E0C4',
  },
  matchRateText: {
    fontSize: 16,
    color: '#32E0C4',
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#212121',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#32E0C4',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SearchPage;
