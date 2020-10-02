import React, { useContext, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthForm from "../components/AuthForm";
import Spacer from "../components/Spacer";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
    },
    error: {
        color: "red",
        fontSize: 16,
        marginLeft: 15,
        marginTop: 15,
    },
});

export default function LoginScreen({ navigation }) {
    const { state, login, clearErrorMessage } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <AuthForm
                headerText="Login to Tracker"
                errorMessage={state.errorMessage}
                onSubmit={login}
                submitButtonText="Log in"
            />
            <Spacer>
                <Button
                    title="Don't have an account? Sign up instead"
                    type="clear"
                    onPress={() => {
                        clearErrorMessage();
                        navigation.navigate("SignUp");
                    }}
                />
            </Spacer>
        </SafeAreaView>
    );
}
