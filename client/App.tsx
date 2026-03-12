import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SuppliersScreen } from "./src/screens/SuppliersScreen";
import { ReportsScreen } from "./src/screens/ReportsScreen";
import { ReportDetailScreen } from "./src/screens/ReportDetailScreen";
import { CreateReportScreen } from "./src/screens/CreateReportScreen";
import { SupplierDetailScreen } from "./src/screens/SupplierDetailScreen";
import { View, Button } from "react-native";

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View style={{ padding: 16, gap: 12 }}>
      <Button title="Suppliers" onPress={() => navigation.navigate("Suppliers")} />
      <Button title="Reports" onPress={() => navigation.navigate("Reports")} />
      <Button title="Create Report" onPress={() => navigation.navigate("CreateReport")} />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Suppliers" component={SuppliersScreen} />
        <Stack.Screen name="SupplierDetail" component={SupplierDetailScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
        <Stack.Screen name="CreateReport" component={CreateReportScreen} />
        <Stack.Screen name="ReportDetail" component={ReportDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
