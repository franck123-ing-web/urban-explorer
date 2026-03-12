import React from "react";
import { View, Text, Image, Button, StyleSheet } from "react-native";

interface LieuCardProps {
  nom: string;
  adresse?: string;
  lat?: number;
  lon?: number;
  image?: string;
}

const LieuCard: React.FC<LieuCardProps> = ({ nom, adresse, lat, lon, image }) => {
  return (
    <View style={styles.card}>
      {/* Image from API or placeholder */}
      <Image
        source={image ? { uri: image } : { uri: "https://picsum.photos/200" }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{nom}</Text>
        <Text style={styles.address}>{adresse || 'Adresse non disponible'}</Text>
        <Button title="Voir plus" onPress={() => alert(`Latitude: ${lat}, Longitude: ${lon}`)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2, // shadow for android
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between",
  },
  title: { fontWeight: "bold", fontSize: 16 },
  address: { color: "#555" },
});

export default LieuCard;