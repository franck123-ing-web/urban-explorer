import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

interface LieuCardProps {
  nom: string;
  adresse?: string;
  lat?: number;
  lon?: number;
  image?: string;
}

const DEFAULT_IMAGE = "https://picsum.photos/200/200";

const LieuCard: React.FC<LieuCardProps> = ({ nom, adresse, lat, lon, image }) => {
  const [imageUri, setImageUri] = React.useState(image || DEFAULT_IMAGE);
  const [imageError, setImageError] = React.useState(false);

  React.useEffect(() => {
    if (image) {
      setImageUri(image);
      setImageError(false);
    } else {
      setImageUri(DEFAULT_IMAGE);
      setImageError(true);
    }
  }, [image]);

  return (
    <View style={styles.card}>
      {/* Image from API or default placeholder */}
      <Image
        source={{ uri: imageError ? DEFAULT_IMAGE : imageUri }}
        style={styles.image}
        resizeMode="cover"
        onError={() => {
          console.log("Image failed to load:", imageUri);
          setImageUri(DEFAULT_IMAGE);
          setImageError(true);
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>{nom}</Text>
        <Text style={styles.address} numberOfLines={2}>{adresse || 'Adresse non disponible'}</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => alert(`Latitude: ${lat}, Longitude: ${lon}`)}
        >
          <Text style={styles.buttonText}>Voir plus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 10,
    marginHorizontal: 16,
    padding: 0,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: 120,
    height: 120,
  },
  textContainer: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  title: { 
    fontWeight: "bold", 
    fontSize: 16,
    color: "#1a1a1a",
    marginBottom: 4,
  },
  address: { 
    color: "#666",
    fontSize: 13,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default LieuCard;