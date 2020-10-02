import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";

import { Context as LocationContext } from "../context/LocationContext";

const styles = StyleSheet.create({
    map: {
        // height: "100%",
        flexGrow: 1,
    },
});

export default function Map() {
    const {
        state: { currentLocation, locations },
    } = useContext(LocationContext);

    return (
        <MapView
            style={styles.map}
            showUserLocation
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
            // region={{
            //     ...currentLocation.coords,
            //     latitudeDelta: 0.01,
            //     longitudeDelta: 0.01,
            // }}
        >
            <MapView.Marker
                coordinate={currentLocation.coords}
                title="Me"
                description="My current position"
                pinColor="rgba(34, 121, 227, 1.0)"
            />
            <Polyline
                coordinates={locations.map((location) => location.coords)}
            />
        </MapView>
    );
}
