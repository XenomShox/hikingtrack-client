import React, { useEffect, useContext } from "react";
import { StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, ListItem } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";

import Spacer from "../components/Spacer";
import { Context as TrackContext } from "../context/TrackContext";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
    },
});

export default function TrackListScreen({ navigation }) {
    const { state, fetchTracks } = useContext(TrackContext);

    useEffect(() => {
        const event = navigation.addListener("focus", fetchTracks);
        return event;
    }, [navigation]);

    return (
        <SafeAreaView>
            <Spacer>
                <Text style={{ fontSize: 40, textAlign: "center" }}>
                    Track List Screen
                </Text>
            </Spacer>
            <Spacer>
                <FlatList
                    data={state}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("Track Detail", {
                                    _id: item._id,
                                })
                            }
                        >
                            <ListItem>
                                <ListItem.Content>
                                    <ListItem.Title>{item.name}</ListItem.Title>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                        </TouchableOpacity>
                    )}
                />
            </Spacer>
        </SafeAreaView>
    );
}
