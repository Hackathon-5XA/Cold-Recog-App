// // components/SearchPage.js
// import React, { useCallback, useState, useEffect } from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useRouter } from 'expo-router';
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import AnimationComponent from '../components/AnimationComponent';
// import LoadingMessage from '../components/LoadingMessage';
// import axios from 'axios';

// const SearchPage = () => {
//   const router = useRouter();
//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [matchedImages, setMatchedImages] = useState([]);
//   const [isFileProcessing, setIsFileProcessing] = useState(false);
//   const [uploadCompleted, setUploadCompleted] = useState(false);
//   const [isMobile, setIsMobile] = useState(Dimensions.get('window').width <= 767);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(Dimensions.get('window').width <= 767);
//     };

//     const subscription = Dimensions.addEventListener('change', handleResize);

//     return () => subscription?.remove();
//   }, []);

//   const pickImage = useCallback(async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Please grant permission to access the media library.');
//       return;
//     }

//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       processImage(result.assets[0].uri);
//     }
//   }, []);

//   const takePhoto = useCallback(async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission Denied', 'Please grant permission to access the camera.');
//       return;
//     }

//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       processImage(result.assets[0].uri);
//     }
//   }, []);

//   const processImage = async (fileUri) => {
//     setIsFileProcessing(true);

//     const formData = new FormData();
//     formData.append("file", {
//       uri: fileUri,
//       name: 'photo.jpg',
//       type: 'image/jpeg',
//     });

//     try {
//       const response = await axios.post("https://d845-2406-7400-bb-5cf0-cc78-a364-a8a1-c24b.ngrok-free.app/upload", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         const data = response.data;
//         const matchedImagesData = data.matched_images || [];
//         const matchedImagesUrls = matchedImagesData.map((imageData) => ({
//           url: `https://d845-2406-7400-bb-5cf0-cc78-a364-a8a1-c24b.ngrok-free.app/matched-images/${imageData.file_name}`,
//           matchRate: imageData.match_rate,
//         }));

//         setMatchedImages(matchedImagesUrls);
//         setUploadCompleted(true);
//       } else {
//         console.error("Failed to upload image");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }

//     setPreviewUrl(fileUri);
//     setIsFileProcessing(false);
//   };

//   const handleSearch = () => {
//     router.push({
//       pathname: '/result',
//       query: {
//         uploadedImage: previewUrl || '',
//         matchedImages: JSON.stringify(matchedImages) || '[]',
//       },
//     });
//   };

//   useEffect(() => {
//     if (previewUrl) {
//       setIsFileProcessing(false);
//     }
//   }, [previewUrl]);

//   return (
//     <View style={styles.container}>
//       <Header />
//       <View style={styles.main}>
//         {isFileProcessing ? (
//           <View style={styles.processingContainer}>
//             <AnimationComponent />
//             <LoadingMessage />
//           </View>
//         ) : uploadCompleted ? (
//           <View style={styles.resultContainer}>
//             <View style={styles.imagePreviewContainer}>
//               {previewUrl && (
//                 <Image source={{ uri: previewUrl }} style={styles.previewImage} />
//               )}
//             </View>
//             <TouchableOpacity style={styles.button} onPress={handleSearch}>
//               <Text style={styles.buttonText}>GET RESULTS</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <>
//             <TouchableOpacity style={styles.button} onPress={pickImage}>
//               <Text style={styles.buttonText}>Pick an Image</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button} onPress={takePhoto}>
//               <Text style={styles.buttonText}>Take a Photo</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>
//       <Footer />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e2e8f0',
//     justifyContent: 'space-between',
//   },
//   main: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//   },
//   processingContainer: {
//     alignItems: 'center',
//   },
//   resultContainer: {
//     alignItems: 'center',
//     width: '100%',
//   },
//   imagePreviewContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   previewImage: {
//     width: 300,
//     height: 300,
//     resizeMode: 'contain',
//   },
//   button: {
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     backgroundColor: '#1a202c',
//     borderRadius: 25,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#4fd1c5',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

// export default SearchPage;

// components/SearchPage.js
import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnimationComponent from '../components/AnimationComponent';
import LoadingMessage from '../components/LoadingMessage';
import axios from 'axios';

const SearchPage = () => {
  const router = useRouter();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [matchedImages, setMatchedImages] = useState([]);
  const [isFileProcessing, setIsFileProcessing] = useState(false);
  const [uploadCompleted, setUploadCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(Dimensions.get('window').width <= 767);

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
      const response = await axios.post("https://d845-2406-7400-bb-5cf0-cc78-a364-a8a1-c24b.ngrok-free.app/upload", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        const data = response.data;
        const matchedImagesData = data.matched_images || [];
        const matchedImagesUrls = matchedImagesData.map((imageData) => ({
          url: `https://d845-2406-7400-bb-5cf0-cc78-a364-a8a1-c24b.ngrok-free.app/matched-images/${imageData.file_name}`,
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

  const handleSearch = () => {
    router.push({
      pathname: '/result',
      query: {
        uploadedImage: previewUrl || '',
        matchedImages: JSON.stringify(matchedImages) || '[]',
      },
    });
  };

  useEffect(() => {
    if (previewUrl) {
      setIsFileProcessing(false);
    }
  }, [previewUrl]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.main}>
        {isFileProcessing ? (
          <View style={styles.processingContainer}>
            <AnimationComponent />
            <LoadingMessage />
          </View>
        ) : uploadCompleted ? (
          <View style={styles.resultContainer}>
            <View style={styles.imagePreviewContainer}>
              {previewUrl && (
                <Image source={{ uri: previewUrl }} style={styles.previewImage} />
              )}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSearch}>
              <Text style={styles.buttonText}>GET RESULTS</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Pick an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Text style={styles.buttonText}>Take a Photo</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e2e8f0',
    justifyContent: 'space-between',
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
  resultContainer: {
    alignItems: 'center',
    width: '100%',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#1a202c',
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    color: '#4fd1c5',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SearchPage;
