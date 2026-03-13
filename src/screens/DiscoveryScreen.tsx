import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import LieuCard from "../components/LieuCard";
import { ThemeContext } from "../contexts/ThemeContext";
import { APIRecord, CoordonneesGeo, Lieu } from "../types/lieu";

const DiscoveryScreen: React.FC = () => {

  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  const [lieux, setLieux] = useState<Lieu[]>([]);
  const [filteredLieux, setFilteredLieux] = useState<Lieu[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [allLieuxLoaded, setAllLieuxLoaded] = useState<Lieu[]>([]);
  const LIMIT = 50;

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(20)).current;

  const fetchLieux = async (pageNum: number) => {
    try {
      const url = `https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=${LIMIT}&start=${pageNum * LIMIT}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.records) {
        const lieuxTransformes: Lieu[] = data.records.map((record: APIRecord) => {
          let coords: CoordonneesGeo | null = null;

          if (record.fields.coordonnees_geo) {
            coords = record.fields.coordonnees_geo;
          } else if (record.geometry?.coordinates) {
            coords = {
              lat: record.geometry.coordinates[1],
              lon: record.geometry.coordinates[0],
            };
          }

          let imageUrl = "https://picsum.photos/200/200";

          if (record.fields.cover_url) imageUrl = record.fields.cover_url;

          return {
            id: record.recordid,
            nom_usuel: record.fields.title || "Sans titre",
            adresse: record.fields.address_name || "",
            coordonnees_geo: coords,
            image: imageUrl,
          };
        });

        if (pageNum === 0) {
          setLieux(lieuxTransformes);
          setFilteredLieux(lieuxTransformes);
          setAllLieuxLoaded(lieuxTransformes);
        } else {
          setLieux((prev) => [...prev, ...lieuxTransformes]);
          setFilteredLieux((prev) => [...prev, ...lieuxTransformes]);
          setAllLieuxLoaded((prev) => [...prev, ...lieuxTransformes]);
        }

        if (lieuxTransformes.length < LIMIT) {
          setHasMoreData(false);
        }
      }
    } catch (error) {
      console.log("Erreur API", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLieux(0);

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  const handleSearch = (text: string) => {
    setSearchQuery(text);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);

    if (!text.trim()) {
      setFilteredLieux(allLieuxLoaded);
      return;
    }

    searchTimeoutRef.current = setTimeout(() => {
      const filtered = allLieuxLoaded.filter(
        (lieu) =>
          lieu.nom_usuel.toLowerCase().includes(text.toLowerCase()) ||
          lieu.adresse?.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredLieux(filtered);
    }, 400);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredLieux(allLieuxLoaded);
  };

  const loadMoreData = () => {
    if (!loading && hasMoreData) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchLieux(nextPage);
    }
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        { 
          opacity: fadeAnim, 
          transform: [{ translateY: translateAnim }],
          backgroundColor: isDarkMode ? '#1a1a1a' : '#f5f5f5'
        },
      ]}
    >
      {/* Header */}
     <View style={{ paddingTop: 60, paddingHorizontal: 20, paddingBottom: 10 }}>
      <TouchableOpacity
    style={styles.homeButton}
    onPress={() => navigation.navigate("Home")}
  >
    <Text style={styles.homeButtonText}>← Accueil</Text>
  </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#fff' : '#1a1a1a' }]}>Explorer Paris</Text>
        <Text style={[styles.headerSubtitle, { color: isDarkMode ? '#aaa' : '#666' }]}>
          {filteredLieux.length} lieux culturels à découvrir
        </Text>
      </View>

      {/* Theme Toggle Button - Top Right Corner */}
      <TouchableOpacity 
        style={{
          position: 'absolute',
          top: 50,
          right: 20,
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 20,
          backgroundColor: isDarkMode ? '#333' : '#e0e0e0',
          zIndex: 10,
        }}
        onPress={toggleTheme}
      >
        <Text style={{ fontSize: 20 }}>
          {isDarkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={[styles.searchContainer, { backgroundColor: isDarkMode ? '#2a2a2a' : '#fff' }]}>
        <Text style={styles.searchIcon}>🔍</Text>

        <TextInput
          style={[styles.searchInput, { color: isDarkMode ? '#fff' : '#1a1a1a' }]}
          placeholder="Rechercher un lieu culturel..."
          placeholderTextColor={isDarkMode ? '#666' : '#999'}
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Text style={[styles.clearButtonText, { color: isDarkMode ? '#aaa' : '#666' }]}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
         data={filteredLieux}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
           <LieuCard lieu={item} />
        )}
        
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
      
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
homeButton: {
  alignSelf: "flex-start",
  backgroundColor: "#fff",
  paddingHorizontal: 14,
  paddingVertical: 8,
  borderRadius: 10,
  marginBottom: 10,

  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
},

homeButtonText: {
  fontSize: 14,
  fontWeight: "600",
  color: "#111",
},
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
  },

  headerSubtitle: {
    fontSize: 15,
    marginTop: 4,
  },

  themeToggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },

  themeToggleText: {
    fontSize: 20,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 16,

    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#111",
  },

  clearButtonText: {
    fontSize: 18,
    color: "#777",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DiscoveryScreen;