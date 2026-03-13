import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemeContext } from "../contexts/ThemeContext";

const DEFAULT_AVATAR =
  "https://via.placeholder.com/300x300.png?text=Avatar";

export default function ProfileScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    loadSavedImage();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const loadSavedImage = async () => {
    try {
      const savedImage = await AsyncStorage.getItem("profileImage");
      if (savedImage) {
        setImageUri(savedImage);
      }
    } catch (error) {
      console.log("Erreur chargement image :", error);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission refusée",
        "L'application a besoin de l'accès à la caméra."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      setImageUri(uri);

      Animated.sequence([
        Animated.spring(scaleAnim, {
          toValue: 1.1,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
        }),
      ]).start();

      try {
        await AsyncStorage.setItem("profileImage", uri);
      } catch (error) {
        console.log("Erreur sauvegarde :", error);
      }
    }
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }
    ]}>
      <Text style={[
        styles.title,
        { color: isDarkMode ? '#fff' : '#1a1a1a' }
      ]}>Mon Profil</Text>

      <Text style={[
        styles.subtitle,
        { color: isDarkMode ? '#aaa' : '#666' }
      ]}>
        Prenez un selfie souvenir de votre visite
      </Text>

      <Animated.View
        style={[
          styles.avatarContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={{ uri: imageUri || DEFAULT_AVATAR }}
          style={styles.avatar}
        />

        <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
          <Text style={styles.cameraIcon}>📷</Text>
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: isDarkMode ? '#333' : '#111827' }]} 
        onPress={takePhoto}
      >
        <Text style={styles.buttonText}>
          {imageUri ? "Changer la photo" : "Prendre une photo"}
        </Text>
      </TouchableOpacity>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1a1a1a",
    marginBottom: 6,
  },

  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },

  avatarContainer: {
    position: "relative",
    marginBottom: 30,
  },

  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#22c55e",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  cameraButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#22c55e",
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  cameraIcon: {
    fontSize: 20,
    color: "#fff",
  },

  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },

  themeButton: {
    backgroundColor: "#007AFF",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});