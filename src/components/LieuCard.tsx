import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Lieu } from '../types/lieu';
import { DiscoveryStackParamList } from '../types/Navigation';

interface LieuCardProps {
  lieu: Lieu;
}

const DEFAULT_IMAGE = "https://picsum.photos/400/300";

const LieuCard: React.FC<LieuCardProps> = ({ lieu }) => {
  const navigation = useNavigation<NativeStackNavigationProp<DiscoveryStackParamList, 'ListeLieux'>>();

  const [imageUri, setImageUri] = React.useState(lieu.image || DEFAULT_IMAGE);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
        onError={() => setImageUri(DEFAULT_IMAGE)}
      />

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {lieu.nom_usuel}
        </Text>

        <Text style={styles.address} numberOfLines={2}>
          {lieu.adresse || "Adresse non disponible"}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('DetailLieu', { lieu })}
        >
          <Text style={styles.buttonText}>Voir plus</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  card: { /* ton style actuel */ },
  image: { width: '100%', height: 200 },
  content: { padding: 16 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  address: { fontSize: 14, color: '#777', marginBottom: 14 },
  button: { backgroundColor: '#28a745', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10, alignSelf: 'flex-start' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});

export default LieuCard;