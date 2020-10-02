// import "../_mockLocations";
import React, { useContext, useCallback, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { BottomSheet, Button } from "react-native-elements";
// import { SafeAreaView } from "react-native-safe-area-context";
import useLocation from "../hooks/useLocation";
import { useIsFocused } from "@react-navigation/native";

import { Context as LocationContext } from "../context/LocationContext";
import TrackForm from "../components/TrackForm";

import Map from "../components/Map";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        // width: Dimensions.get("window").width,
        // height: Dimensions.get("window").height,
        // borderColor: "red",
        // borderWidth: 2,
    },
});

export default function TrackCreateScreen() {
    const isFocused = useIsFocused();
    const {
        state: { recording, currentLocation },
        addLocation,
    } = useContext(LocationContext);

    const callback = useCallback(
        (location) => {
            addLocation(location, recording);
        },
        [recording]
    );

    const [err] = useLocation(isFocused || recording, callback);

    if (!currentLocation)
        return (
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                }}
            >
                <ActivityIndicator size="large" color="#999999" />
            </View>
        );

    return (
        <View style={styles.container}>
            <Map />
            <TrackForm />
            {/* {err ? <Text>Please enable location services</Text> : null} */}
        </View>
    );
}
