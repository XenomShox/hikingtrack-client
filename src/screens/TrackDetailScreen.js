import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import MapView, { Polyline, Marker } from "react-native-maps";

import { Context as TrackContext } from "../context/TrackContext";

const styles = StyleSheet.create({
    map: {
        flexGrow: 1,
    },
});

export default function TrackDetailScreen({ navigation, route }) {
    const { state } = useContext(TrackContext);
    const { _id } = route.params;

    const track = state.find((t) => t._id === _id);
    return (
        <>
            <MapView
                initialRegion={{
                    ...track.locations[0].coords,
                    longitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                }}
                style={styles.map}
            >
                <Polyline
                    coordinates={track.locations.map((loc) => loc.coords)}
                />
            </MapView>
            <View
                style={{
                    position: "absolute",
                    backgroundColor: "rgba(180, 180, 180, 0.4)",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    top: 5,
                    left: 20,
                    right: 20,
                    borderRadius: 10,
                }}
            >
                <Text
                    style={{
                        fontSize: 30,
                        textAlign: "center",
                        color: "gray",
                    }}
                >
                    {track.name}
                </Text>
            </View>
        </>
    );
}
