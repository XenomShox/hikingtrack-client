import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-elements";
import Spacer from "../components/Spacer";
import { SafeAreaView } from "react-native-safe-area-context";

import { Context as AuthContext } from "../context/AuthContext";

const styles = StyleSheet.create({});

export default function AccountScreen() {
    const { logout } = useContext(AuthContext);
    return (
        <SafeAreaView>
            <Text h2 style={{ textAlign: "center" }}>
                Account Screen
            </Text>
            <Spacer>
                <Button title="Logout" type="clear" onPress={logout} />
            </Spacer>
        </SafeAreaView>
    );
}
