import React, { useState, useEffect } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import axios from "axios";
import { Location } from "../types";

const MapScreen: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  const initialRegion: Region = {
    latitude: -15.7942,
    longitude: -47.8822,
    latitudeDelta: 0.15,
    longitudeDelta: 0.12,
  };

  useEffect(() => {
    axios
      .get<Location[]>("https://maia-back-production.up.railway.app/locations")
      .then((response) => setLocations(response.data))
      .catch((error) => console.error("Erro ao buscar locais!", error));
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={initialRegion}>
        {locations.map((location) => (
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
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
