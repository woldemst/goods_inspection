import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SuppliersScreen } from "./src/screens/SuppliersScreen";
import { ReportsScreen } from "./src/screens/ReportsScreen";
import { View, Button } from "react-native";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Button title="Suppliers" onPress={() => navigation.navigate("Suppliers")} />
            <Button title="Reports" onPress={() => navigation.navigate("Reports")} />
        </View>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Suppliers" component={SuppliersScreen} />
                <Stack.Screen name="Reports" component={ReportsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
