import React, { useState, useEffect } from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { ApiService } from '../services/ApiService';
import { Location } from '../types';
import { colors } from '../theme/colors';

const MapScreen: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialRegion: Region = {
    latitude: -15.7942,
    longitude: -47.8822,
    latitudeDelta: 0.15,
    longitudeDelta: 0.12
  };

  useEffect(() => {
    ApiService.getLocations()
      .then(data => {
        setLocations(data);
      })
      .catch(err => {
        setError('Não foi possível carregar os pontos de apoio. Tente novamente mais tarde.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // Se deu erro, mostra a mensagem de erro
  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            description={location.address}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    width: '100%',
    height: '100%'
  }
});

export default MapScreen;
