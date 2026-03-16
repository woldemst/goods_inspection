import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SuppliersScreen } from "./src/screens/SuppliersScreen";
import { ReportsScreen } from "./src/screens/ReportsScreen";
import { ReportDetailScreen } from "./src/screens/ReportDetailScreen";
import { CreateReportScreen } from "./src/screens/CreateReportScreen";
import { SupplierDetailScreen } from "./src/screens/SupplierDetailScreen";
import { View, Button, Text } from "react-native";
import { getToken, removeToken } from "./src/api/auth";
import { LoginScreen } from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation, onLogout }: any) {
    return (
        <View style={{ padding: 16, gap: 12 }}>
            <Button title="Suppliers" onPress={() => navigation.navigate("Suppliers")} />
            <Button title="Reports" onPress={() => navigation.navigate("Reports")} />
            <Button title="Create Report" onPress={() => navigation.navigate("CreateReport")} />
            <Button title="Logout" onPress={onLogout} />
        </View>
    );
}

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);

    async function checkAuth() {
        const token = await getToken();
        setIsLoggedIn(!!token);
        setCheckingAuth(false);
    }

    async function onLogout() {
        await removeToken();
        setIsLoggedIn(false);
    }

    useEffect(() => {
        checkAuth();
    }, []);

    if (checkingAuth) {
        return (
            <View style={{ padding: 16 }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!isLoggedIn) {
        return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home">{(props) => <HomeScreen {...props} onLogout={onLogout} />}</Stack.Screen>
                <Stack.Screen name="Suppliers" component={SuppliersScreen} />
                <Stack.Screen name="SupplierDetail" component={SupplierDetailScreen} />
                <Stack.Screen name="Reports" component={ReportsScreen} />
                <Stack.Screen name="CreateReport" component={CreateReportScreen} />
                <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
