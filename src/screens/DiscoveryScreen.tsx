// /screens/DiscoveryScreen.tsx
import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from "react-native";
import LieuCard from "../components/LieuCard";
import { Lieu, APIRecord, ApiResponse, CoordonneesGeo } from "../types/lieu";

const DiscoveryScreen: React.FC = () => {
  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLieux = async () => {
      try {
        console.log("Fetching data from API...");
        const params = new URLSearchParams({
          dataset: "que-faire-a-paris-",
          "disjunctive.access_type": "true",
          "disjunctive.price_type": "true",
          "disjunctive.deaf": "true",
          "disjunctive.blind": "true",
          "disjunctive.pmr": "true",
          "disjunctive.address_city": "true",
          "disjunctive.address_zipcode": "true",
          "disjunctive.address_name": "true",
          "disjunctive.programs": "true",
          limit: "100",
        });

        const url = `https://opendata.paris.fr/api/records/1.0/search/?${params.toString()}`;
        console.log("Fetching URL:", url);
        
        const response = await fetch(url);
        
        console.log("Response status:", response.status);
        const data = await response.json();
        console.log("=== API RESPONSE DEBUG ===");
        console.log("Total hits (nhits):", data.nhits);
        console.log("Records count:", data.records?.length);
        
        if (data.records && Array.isArray(data.records)) {
          // Transform API response to simplified Lieu format
          const lieuxTransformes: Lieu[] = data.records.map((record: APIRecord) => {
            let coords: CoordonneesGeo | null = null;
            
            // Try to get coordinates from multiple sources
            if (record.fields.coordonnees_geo) {
              coords = record.fields.coordonnees_geo;
            } else if (record.geometry?.coordinates) {
              coords = {
                lat: record.geometry.coordinates[1],
                lon: record.geometry.coordinates[0]
              };
            }
            
            // Get image URL - try multiple fields
            let imageUrl: string | undefined = undefined;
            if (record.fields.main_image) {
              imageUrl = record.fields.main_image;
            } else if (record.fields.image) {
              imageUrl = record.fields.image;
            } else if (record.fields.images && record.fields.images.length > 0) {
              imageUrl = record.fields.images[0];
            }
            
            return {
              id: record.recordid,
              nom_usuel: record.fields.title || record.fields.nom_usuel || 'Sans titre',
              adresse: record.fields.address_name || record.fields.adresse || '',
              coordonnees_geo: coords,
              image: imageUrl,
            };
          });
          console.log("Transformed lieux count:", lieuxTransformes.length);
          if (lieuxTransformes.length > 0) {
            console.log("First lieu:", lieuxTransformes[0]);
          }
          setLieux(lieuxTransformes);
        } else {
          console.error("No records found in API response");
          setLieux([]);
        }
        console.log("=========================");
      } catch (error) {
        console.error("Erreur API:", error);
        setLieux([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLieux();
  }, []);

  // Debug: log current state
  console.log("Current lieux count:", lieux.length);
  console.log("Loading state:", loading);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Show message if no data
  if (lieux.length === 0) {
    return (
      <View style={styles.empty}>
        <Text>Aucun lieu trouvé</Text>
        <Text style={styles.subtext}>Vérifiez la console pour les erreurs</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lieux}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <LieuCard
            nom={item.nom_usuel}
            adresse={item.adresse}
            lat={item.coordonnees_geo?.lat}
            lon={item.coordonnees_geo?.lon}
            image={item.image}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  subtext: {
    color: "#666",
    marginTop: 10,
  },
});

export default DiscoveryScreen;