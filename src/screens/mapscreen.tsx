import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, Platform } from "react-native"
import { Lieu } from "../types/lieu"

// Lazy load react-native-maps only for mobile
let MapView: any, Marker: any;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
}

export default function MapScreen() {
  const [lieux, setLieux] = useState<Lieu[]>([])

  useEffect(() => {
    fetch(
      "https://opendata.paris.fr/explore/dataset/que-faire-a-paris-/api/?limit=100"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("MapScreen API Response:", Array.isArray(data) ? `Array with ${data.length} items` : data);
        if (Array.isArray(data)) {
          const lieuxAPI = data.map((item: any) => ({
            id: item.recordid,
            nom_usuel: item.fields.title || item.fields.nom_usuel,
            adresse: item.fields.address_name || item.fields.address_street,
            coordonnees_geo: item.fields.lat_lon ? { lat: item.fields.lat_lon[0], lon: item.fields.lat_lon[1] } : null,
          }));
          setLieux(lieuxAPI);
          console.log("MapScreen loaded lieux:", lieuxAPI.length);
        }
      })
      .catch((err) => console.error("MapScreen error:", err));
  }, []);

  // Web platform doesn't support react-native-maps
  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        <Text style={styles.webMessage}>Map is only available on mobile devices</Text>
        <Text style={styles.webSubMessage}>Please open this app on iOS or Android to view the map</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 48.8566,
          longitude: 2.3522,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {lieux.map((lieu, index) => {
          if (!lieu.coordonnees_geo) return null
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: lieu.coordonnees_geo.lat,
                longitude: lieu.coordonnees_geo.lon,
              }}
              title={lieu.nom_usuel}
              description={lieu.adresse}
            />
          )
        })}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  webMessage: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  webSubMessage: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
    color: "#666",
  },
})