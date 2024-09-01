// components/FontLoader.jsx
import React, { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

export default function FontLoader({ children }) {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'CustomFont': require('../assets/fonts/glitch.ttf'),
      });
      setFontLoaded(true);
    }
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
}
