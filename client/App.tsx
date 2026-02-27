import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SuppliersScreen } from "./src/screens/SuppliersScreen";

export default function App() {
    return (
        <View style={styles.container}>
            <SuppliersScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
