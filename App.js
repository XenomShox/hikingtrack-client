import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AccountScreen from "./src/screens/AccountScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";

import {
    Provider as AuthProvider,
    Context as AuthContext,
} from "./src/context/AuthContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as TrackProvider } from "./src/context/TrackContext";

const authStack = createStackNavigator();
const trackStack = createStackNavigator();
const mainBottomTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#fff",
    },
};

// function MyTabBar({ state, descriptors, navigation }) {
//     return (
//         <View style={{ flexDirection: "row", height: 40 }}>
//             {state.routes.map((route, index) => {
//                 const { options } = descriptors[route.key];
//                 const label =
//                     options.tabBarLabel !== undefined
//                         ? options.tabBarLabel
//                         : options.title !== undefined
//                         ? options.title
//                         : route.name;

//                 const isFocused = state.index === index;

//                 const onPress = () => {
//                     const event = navigation.emit({
//                         type: "tabPress",
//                         target: route.key,
//                     });

//                     if (!isFocused && !event.defaultPrevented) {
//                         navigation.navigate(route.name);
//                     }
//                 };

//                 const onLongPress = () => {
//                     navigation.emit({
//                         type: "tabLongPress",
//                         target: route.key,
//                     });
//                 };

//                 return (
//                     <TouchableOpacity
//                         accessibilityRole="button"
//                         accessibilityStates={isFocused ? ["selected"] : []}
//                         accessibilityLabel={options.tabBarAccessibilityLabel}
//                         testID={options.tabBarTestID}
//                         onPress={onPress}
//                         onLongPress={onLongPress}
//                         style={{ flex: 1 }}
//                         key={index}
//                     >
//                         <Text
//                             style={{
//                                 color: isFocused ? "#673ab7" : "#222",
//                                 textAlign: "center",
//                             }}
//                         >
//                             {label}
//                         </Text>
//                     </TouchableOpacity>
//                 );
//             })}
//         </View>
//     );
// }

const trackStackScreen = () => {
    return (
        <trackStack.Navigator initialRouteName="Track List">
            <trackStack.Screen
                name="Track List"
                component={TrackListScreen}
                options={{ headerShown: false }}
            />
            <trackStack.Screen
                name="Track Detail"
                component={TrackDetailScreen}
            />
        </trackStack.Navigator>
    );
};

const App = function () {
    const { state, tryLocalLogin } = useContext(AuthContext);
    console.log;
    useEffect(() => {
        tryLocalLogin();
    }, []);

    return (
        <SafeAreaProvider>
            <NavigationContainer theme={MyTheme}>
                {!state.token ? (
                    <authStack.Navigator
                        initialRouteName="Login"
                        headerMode="none"
                    >
                        <authStack.Screen
                            name="SignUp"
                            component={SignupScreen}
                        />
                        <authStack.Screen
                            name="Login"
                            component={LoginScreen}
                        />
                    </authStack.Navigator>
                ) : (
                    <mainBottomTab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;
                                if (route.name === "Track") {
                                    iconName = "th-list";
                                } else if (route.name === "Track Create") {
                                    iconName = focused ? "plus-circle" : "plus";
                                } else if (route.name === "Account")
                                    iconName = "gear";

                                // You can return any component that you like here!
                                return (
                                    <FontAwesome
                                        name={iconName}
                                        size={size}
                                        color={color}
                                    />
                                );
                            },
                        })}
                        tabBarOptions={{ keyboardHidesTabBar: true }}
                    >
                        <mainBottomTab.Screen
                            name="Track"
                            options={{ title: "Tracks" }}
                            component={trackStackScreen}
                        />
                        <mainBottomTab.Screen
                            name="Track Create"
                            options={{ title: "Add Create" }}
                            component={TrackCreateScreen}
                        />
                        <mainBottomTab.Screen
                            name="Account"
                            component={AccountScreen}
                        />
                    </mainBottomTab.Navigator>
                )}
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default () => {
    return (
        <TrackProvider>
            <LocationProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </LocationProvider>
        </TrackProvider>
    );
};
