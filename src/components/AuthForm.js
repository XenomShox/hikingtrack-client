import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";

import Spacer from "../components/Spacer";

const styles = StyleSheet.create({
    error: {
        color: "red",
        fontSize: 16,
        marginLeft: 15,
        marginTop: 15,
    },
});

export default function AuthForm({
    headerText,
    errorMessage,
    onSubmit,
    submitButtonText,
    isSignUp,
}) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <Spacer>
                <Text h2 style={{ textAlign: "center" }}>
                    {headerText}
                </Text>
            </Spacer>
            {isSignUp ? (
                <Input
                    label="Username"
                    placeholder="Jaime johnson"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    leftIcon={{
                        type: "font-awesome",
                        name: "user-circle",
                        color: "gray",
                        style: { marginRight: 20 },
                    }}
                />
            ) : null}
            <Input
                label="Email"
                placeholder="email@test.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                leftIcon={{
                    type: "Ionicons",
                    name: "mail",
                    color: "grey",
                    style: { marginRight: 20 },
                }}
            />
            <Input
                label="Password"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
                leftIcon={{
                    type: "feather",
                    name: "lock",
                    color: "grey",
                    style: { marginRight: 20 },
                }}
            />
            {errorMessage ? (
                <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <Spacer>
                <Button
                    title={submitButtonText}
                    onPress={() => onSubmit({ username, email, password })}
                />
            </Spacer>
        </>
    );
}
