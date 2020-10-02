import React, { useContext } from "react";
import useSaveTrack from "../hooks/useSaveTrack";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { Context as LocationContext } from "../context/LocationContext";

export default function TrackForm() {
    const {
        state: { name, recording, locations },
        startRecording,
        stopRecording,
        changeName,
    } = useContext(LocationContext);
    const [saveTrack] = useSaveTrack();

    return (
        <View
            style={{
                // flex: 1,
                position: "absolute",
                bottom: 30,
                left: 30,
                right: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(230, 230, 230, 0.6)",
                paddingVertical: 10,
                borderRadius: 25,
                borderColor: "rgba(120, 120, 120, 0.3)",
                borderWidth: 1,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Input
                    placeholder="start recordin"
                    containerStyle={{ width: "80%" }}
                    value={name}
                    onChangeText={changeName}
                />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: 100,
                }}
            >
                {recording ? (
                    <Button
                        buttonStyle={{
                            backgroundColor: "#eee",
                        }}
                        containerStyle={{
                            borderRadius: 100,
                        }}
                        icon={{
                            type: "foundation",
                            name: "record",
                            size: 15,
                            color: "#ed0202",
                        }}
                        onPress={stopRecording}
                    />
                ) : (
                    <Button
                        containerStyle={{ borderRadius: 100 }}
                        icon={{
                            type: "foundation",
                            name: "record",
                            size: 15,
                            color: "white",
                        }}
                        onPress={startRecording}
                    />
                )}
                {!recording && locations.length ? (
                    <Button
                        buttonStyle={{
                            backgroundColor: "#eee",
                        }}
                        containerStyle={{
                            borderRadius: 100,
                        }}
                        icon={{
                            type: "font-awesome",
                            name: "save",
                            size: 15,
                            color: "#707070",
                        }}
                        onPress={saveTrack}
                    />
                ) : null}
            </View>
        </View>
    );
}
