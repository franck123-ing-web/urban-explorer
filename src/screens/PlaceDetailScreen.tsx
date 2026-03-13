import { RouteProp } from '@react-navigation/native';
import * as CalendarAPI from 'expo-calendar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { DiscoveryStackParamList } from '../types/Navigation';

type DetailLieuRouteProp = RouteProp<DiscoveryStackParamList, 'DetailLieu'>;

type Props = {
  route: DetailLieuRouteProp;
};

export default function PlaceDetailScreen({ route }: Props) {
  const { lieu } = route.params;
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animation d'apparition
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  // Fonction pour ajouter un événement dans le calendrier du téléphone
  const addEventToCalendar = async () => {
    if (!selectedDate) {
      Alert.alert('Sélectionnez une date d’abord');
      return;
    }

    const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', 'Impossible d’ajouter l’événement au calendrier');
      return;
    }

    // Récupération du premier calendrier par défaut
    const calendars = await CalendarAPI.getCalendarsAsync(CalendarAPI.EntityTypes.EVENT);
    const defaultCalendar = calendars.find((cal) => cal.allowsModifications) || calendars[0];

    if (!defaultCalendar) {
      Alert.alert('Aucun calendrier disponible');
      return;
    }

    // Création de l’événement
    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);
    endDate.setHours(endDate.getHours() + 1); // 1h par défaut

    await CalendarAPI.createEventAsync(defaultCalendar.id, {
      title: `Visite : ${lieu.nom_usuel}`,
      startDate,
      endDate,
      timeZone: 'Europe/Paris',
      location: lieu.adresse || '',
      notes: 'Planifiée via Urban Explorer',
    });

    Alert.alert('Succès', `Visite planifiée le ${selectedDate} et ajoutée au calendrier`);
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        {/* Header du lieu */}
        <View style={styles.header}>
          {lieu.image && <Image source={{ uri: lieu.image }} style={styles.image} />}
          <Text style={styles.title}>{lieu.nom_usuel}</Text>
          <Text style={styles.address}>{lieu.adresse || 'Adresse non disponible'}</Text>
        </View>

        {/* Calendrier */}
        <View style={styles.calendarContainer}>
          <Text style={styles.sectionTitle}>Planifier votre visite</Text>
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate || '']: { selected: true, selectedColor: '#28a745' },
            }}
            theme={{
              todayTextColor: '#28a745',
              arrowColor: '#28a745',
              monthTextColor: '#111',
              textDayFontWeight: '500',
              textMonthFontWeight: '700',
              textDayHeaderFontWeight: '600',
            }}
          />

          {selectedDate && (
            <View style={styles.confirmationBox}>
              <Text style={styles.message}>
                 Visite au <Text style={{ fontWeight: '700' }}>{lieu.nom_usuel}</Text> planifiée le {selectedDate}
              </Text>
            </View>
          )}

          {/* Bouton pour ajouter au calendrier */}
          <TouchableOpacity style={styles.button} onPress={addEventToCalendar}>
            <Text style={styles.buttonText}>Ajouter au calendrier</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },

  header: {
    backgroundColor: '#fff',
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: 'center',
  },

  image: { width: '100%', height: 200, borderTopLeftRadius: 20, borderTopRightRadius: 20 },

  title: { fontSize: 26, fontWeight: '800', color: '#111', marginTop: 12, textAlign: 'center' },

  address: { fontSize: 16, color: '#666', marginTop: 4, textAlign: 'center' },

  calendarContainer: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12, color: '#111', textAlign: 'center' },

  confirmationBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#e6ffed',
    borderRadius: 12,
    alignItems: 'center',
  },

  message: { fontSize: 16, color: '#111', textAlign: 'center' },

  button: {
    marginTop: 20,
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});