import { createDrawerNavigator } from "@react-navigation/drawer";
import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-community/async-storage";

const authReducer = (state, action) => {
    switch (action.type) {
        case "add_error":
            return { ...state, errorMessage: action.payload };
        case "login":
            return { errorMessage: "", token: action.payload };
        case "logout":
            return { errorMessage: "", token: null };
        case "clear_error_message":
            return { ...state, errorMessage: "" };
        default:
            return state;
    }
};

const signup = (dispatch) => async ({ username, email, password }) => {
    try {
        const response = await trackerApi.post("/api/auth/signup", {
            username,
            email,
            password,
        });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "login", payload: response.data.token });
    } catch (err) {
        dispatch({
            type: "add_error",
            payload: "Something went wrong with Sign up",
        });
    }
};

const login = (dispatch) => async ({ email, password }) => {
    try {
        const response = await trackerApi.post("/api/auth/login", {
            email,
            password,
        });
        await AsyncStorage.setItem("token", response.data.token);
        dispatch({ type: "login", payload: response.data.token });
    } catch (err) {
        dispatch({
            type: "add_error",
            payload: "Something went wrong with Login",
        });
    }
};

const logout = (dispatch) => async () => {
    try {
        await AsyncStorage.removeItem("token");
        dispatch({ type: "logout" });
    } catch (err) {
        console.log(err);
    }
};

const clearErrorMessage = (dispatch) => () => {
    dispatch({ type: "clear_error_message" });
};

const tryLocalLogin = (dispatch) => async () => {
    try {
        const token = await AsyncStorage.getItem("token");
        if (token) dispatch({ type: "login", payload: token });
    } catch (err) {
        console.log(err);
    }
};

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, login, logout, clearErrorMessage, tryLocalLogin },
    { token: null, errorMessage: "" }
);
