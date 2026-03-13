import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          { opacity: fadeAnim, transform: [{ translateY: translateAnim }] },
        ]}
      >
        {/* Logo */}
        <Image
          source={require("../../assets/images/the-urban-explorer-logo.png")}
          style={styles.logo}
        />

        {/* Titre */}
        <Text style={styles.title}>Urban Explorer</Text>

        {/* Description */}
        <Text style={styles.description}>
          Explorez les lieux culturels de Paris, découvrez des activités et
          planifiez facilement vos visites directement dans votre calendrier.
        </Text>

        {/* Bouton principal */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("ListeLieux")}
        >
          <Text style={styles.primaryButtonText}>Explorer les lieux</Text>
        </TouchableOpacity>

       
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#f4f6f8",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: "center",
    width: "100%",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 8,
  },

  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    resizeMode: "contain",
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },

  primaryButton: {
    backgroundColor: "#22c55e",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    paddingVertical: 12,
  },

  secondaryButtonText: {
    fontSize: 15,
    color: "#666",
  },
});