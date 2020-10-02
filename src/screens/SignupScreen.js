import React, { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

import AuthForm from "../components/AuthForm";
import Spacer from "../components/Spacer";

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flexGrow: 1,
    },
});

export default function SignupScreen({ navigation }) {
    const { state, signup, clearErrorMessage } = useContext(AuthContext);

    return (
        <SafeAreaView style={styles.container}>
            <AuthForm
                headerText="Sign Up for Tracker"
                errorMessage={state.errorMessage}
                onSubmit={signup}
                submitButtonText="Sign Up"
                isSignUp
            />
            <Spacer>
                <Button
                    type="clear"
                    title="Already have an account? log in"
                    onPress={() => {
                        clearErrorMessage();
                        navigation.navigate("Login");
                    }}
                />
            </Spacer>
        </SafeAreaView>
    );
}
